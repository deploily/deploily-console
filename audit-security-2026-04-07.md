# Rapport d'Audit de Sécurité — deploily-console

**Date :** 2026-04-07  
**Auditeur :** Claude Sonnet 4.6 (IA)  
**Branche analysée :** `audit-securit`  
**Dernier commit :** `68de07a` — feat(security): implement CSP, HSTS, and enhanced auth validation  
**Stack :** Next.js 14, NextAuth v4, Keycloak, Redux Toolkit, Axios, Docker

---

## Résumé exécutif

| Niveau     | Nombre |
|------------|--------|
| CRITIQUE   | 2      |
| IMPORTANT  | 5      |
| ATTENTION  | 5      |
| OK         | 10     |

Le projet présente une base de sécurité solide (headers HTTP, auth JWT renforcée, Docker non-root, CI/CD avec audit). Cependant deux vulnérabilités critiques bloquent un déploiement en production : une **XSS via `dangerouslySetInnerHTML`** non sanitisé et une **clé API hardcodée** dans le code source. De plus, 11 dépendances HIGH doivent être corrigées avant la mise en production.

---

## CRITIQUE — À corriger avant tout déploiement

### [C-1] XSS via `dangerouslySetInnerHTML` sans sanitisation

**Fichiers concernés :**
- `src/app/[locale]/(auth)/portal/api-services/[id]/components/servicePlanCard.tsx:84`
- `src/app/[locale]/(auth)/portal/cloud-resources/[id]/components/ressourcePlanCard.tsx:218`

**Code vulnérable :**
```tsx
<div dangerouslySetInnerHTML={{__html: row.html_content}} />
```

**Risque :** Le contenu HTML provient d'une réponse API (`row.html_content`) et est injecté directement dans le DOM sans aucune sanitisation. Si l'API est compromise ou si un attaquant peut injecter du contenu HTML malveillant, cela permet une **attaque XSS stockée** pouvant voler les tokens de session, exécuter du code JavaScript arbitraire, ou effectuer des actions au nom de l'utilisateur.

**Correction recommandée :** Installer et utiliser [DOMPurify](https://github.com/cure53/DOMPurify) :
```tsx
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(row.html_content)}} />
```

---

### [C-2] Clé API Google reCAPTCHA hardcodée dans le code source

**Fichier :** `src/deploilyWebsiteUrls.ts:2`

**Code vulnérable :**
```ts
export const NEXT_PUBLIC_SITE_KEY = "6Ldb_i8rAAAAAAbj8Z8zS9cx23EX_wVX7D30FdSM";
```

**Risque :** La clé de site reCAPTCHA est **commise en clair dans le dépôt Git**. Toute personne ayant accès au code (collaborateurs, forks, fuites de dépôt) peut récupérer et abuser de cette clé. La clé est également exposée dans le bundle client, mais elle devrait être externalisée dans une variable d'environnement pour permettre la rotation sans modifier le code.

**Correction recommandée :**
```ts
// deploilyWebsiteUrls.ts
export const NEXT_PUBLIC_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
```
Et ajouter dans `.env.example` :
```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-recaptcha-site-key"
```

---

## IMPORTANT — Risques significatifs à adresser rapidement

### [I-1] 11 dépendances npm avec vulnérabilités HIGH (dont directes)

**Résultat de `npm audit` :** 22 vulnérabilités totales — 11 HIGH, 6 MODERATE, 5 LOW

| Paquet | Sévérité | Détail | CVSS | Action |
|--------|----------|--------|------|--------|
| `axios ^1.6.3` | HIGH | DoS via `__proto__` key dans `mergeConfig` — GHSA-43fc-jf86-j433 | 7.5 | `npm audit fix` |
| `next ^14.2.5` | HIGH | HTTP Request Smuggling, DoS Image Optimizer, DoS RSC — GHSA-ggv3-7p47-pfv8 | 7.5 | Mettre à jour next |
| `lodash` | HIGH | Prototype Pollution `_.unset`/`_.omit`, Code Injection `_.template` — GHSA-r5fr-rjxr-66jc | 8.1 | `npm audit fix` |
| `tar` | HIGH | Path Traversal, Symlink Poisoning, Arbitrary File Write | — | `npm audit fix` |
| `minimatch` | HIGH | ReDoS | — | `npm audit fix` |
| `picomatch` | HIGH | ReDoS | — | `npm audit fix` |
| `flatted` | HIGH | Vulnérabilité (transitive) | — | `npm audit fix` |

**Commandes de correction :**
```bash
cd deploily-console
npm audit fix
# Pour les breaking changes (tester avant) :
npm audit fix --force
```

**Note importante :** `dependabot.yml` ignore les mises à jour MAJOR de `next`. Or plusieurs CVEs HIGH de `next ^14.x` nécessitent une migration vers `>= 15.x`. Cette exclusion doit être reconsidérée.

---

### [I-2] Variable `NEXT_PUBLIC_WILAYA_API_KEY` exposée dans le bundle client

**Fichier :** `src/actions/getApiKey.ts`

```ts
"use server";
export const getApiKey = async () => {
  return process.env.NEXT_PUBLIC_WILAYA_API_KEY;
};
```

**Risque :** Toute variable préfixée `NEXT_PUBLIC_` est **embarquée dans le bundle JavaScript client** par Next.js, indépendamment du `"use server"`. La clé API est donc accessible à tout utilisateur inspectant les sources de la page. Si cette API requiert une authentification confidentielle, cette exposition constitue une fuite de credentials.

**Correction :** Si la clé est confidentielle, renommer en `WILAYA_API_KEY` (sans préfixe `NEXT_PUBLIC_`) et ne la retourner qu'au travers de la Server Action.

---

### [I-3] Redirection non validée dans le logout fédéré (Open Redirect potentiel)

**Fichier :** `src/lib/utils/federatedLogout.ts:10`

```ts
window.location.href = data.url;
```

**Risque :** L'URL de redirection est récupérée du corps de la réponse JSON de `/api/auth/federated-logout`. Bien que construite côté serveur depuis `KEYCLOAK_ISSUER`, une réponse interceptée ou manipulée (MITM, cache poisoning) pourrait rediriger vers un site malveillant.

**Correction recommandée :** Valider le domaine de l'URL avant la redirection :
```ts
const expectedOrigin = new URL(process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER).origin;
const redirectUrl = new URL(data.url);
if (redirectUrl.origin === expectedOrigin) {
  window.location.href = data.url;
}
```

---

### [I-4] `console.log` en production exposant des données d'API

**Fichiers concernés :**
- `src/lib/features/cloud-resource/cloudResourceThunks.tsx:233-234, 261-262` — expose `response.data` et `response.status`
- `src/lib/features/my-applications/myApplicationThunks.tsx:30` — expose les erreurs brutes
- `src/app/[locale]/(auth)/portal/my-resources/containers/myWebHostingsSection.tsx:74-77` — expose `WebHostingsList` (données utilisateur)

**Risque :** Les logs de console sont visibles dans les DevTools du navigateur. Des données d'API (informations d'abonnement, données utilisateur, erreurs techniques) sont exposées à quiconque ouvre la console, notamment sur des sessions partagées ou enregistrées.

**Correction :** Supprimer tous les `console.log` de débogage ou les conditionner :
```ts
if (process.env.NODE_ENV !== 'production') console.log(...)
```

---

### [I-5] Type `any` dans les callbacks d'authentification sensibles

**Fichier :** `src/lib/utils/authOptions.ts:79`

```ts
async session({ session, token }: any) {
```

**Fichier :** `src/middleware.ts:22-27`

```ts
(token as any).error
(token as any).expiresAt
(token as any).accessToken
```

**Risque :** L'utilisation de `any` court-circuite les vérifications TypeScript sur des objets de sécurité critiques (token JWT, session). Des propriétés manquantes ou mal typées passent silencieusement à la compilation et peuvent provoquer des comportements inattendus en production (accès accordé à un token invalide, ou accès refusé à tort).

**Correction :** Étendre les types NextAuth dans `types/next-auth.d.ts` pour définir `accessToken`, `idToken`, `refreshToken`, `expiresAt` et `error` sur `JWT` et `Session`.

---

## ATTENTION — Bonnes pratiques manquantes

### [A-1] CSP : `style-src 'unsafe-inline'` autorisé

**Fichier :** `src/middleware.ts:74`

```ts
"style-src 'self' 'unsafe-inline'",
```

`'unsafe-inline'` pour les styles autorise des attaques de type **CSS Injection** (exfiltration via sélecteurs CSS, clickjacking CSS). C'est souvent inévitable avec des frameworks CSS-in-JS (styled-components, Emotion, Ant Design) mais doit être documenté comme risque accepté.

**Recommandation :** Évaluer si les bibliothèques UI supportent une approche nonce/hash pour les styles. Documenter formellement si `'unsafe-inline'` est conservé.

---

### [A-2] HSTS sans directive `preload`

**Fichier :** `src/middleware.ts:106-108`

```ts
"Strict-Transport-Security",
"max-age=63072000; includeSubDomains"
```

Sans `preload`, le domaine ne peut pas rejoindre la [HSTS Preload List](https://hstspreload.org/), laissant une fenêtre d'attaque lors de la toute première connexion d'un utilisateur (TOFU — Trust On First Use).

**Recommandation :** Après audit que tous les sous-domaines supportent HTTPS :
```ts
"max-age=63072000; includeSubDomains; preload"
```

---

### [A-3] `alert()` utilisé pour les messages d'erreur utilisateur

**Fichier :** `src/lib/utils/federatedLogout.ts:15`

```ts
alert(error);
```

L'utilisation de `alert()` est bloquée par certaines politiques CSP et navigateurs, expose des messages d'erreur techniques, et offre une UX dégradée.

**Correction :** Utiliser `react-toastify` déjà présent dans les dépendances.

---

### [A-4] Gestion d'erreur manquante dans les flux de paiement (TODOs)

Plusieurs composants de paiement critiques ont des `TODO` signalant une gestion d'erreur non implémentée :

- `src/.../cardPaymentComponent.tsx:45` — `// TODO display error in a toast`
- `src/.../fundBalanceByCard.tsx:48` — `// TODO display error in a toast`

**Risque :** Erreurs silencieuses pouvant laisser un utilisateur dans un état incohérent (paiement initié mais non confirmé).

---

### [A-5] Dependabot exclut les mises à jour majeures de `next`

**Fichier :** `.github/dependabot.yml:11-12`

```yaml
ignore:
  - dependency-name: "next"
    update-types: ["version-update:semver-major"]
```

Plusieurs vulnérabilités HIGH dans `next ^14.x` nécessitent une migration vers `>= 15.x`. Cette exclusion bloque les PRs Dependabot pour ces corrections.

**Recommandation :** Planifier explicitement la migration Next.js 15 et retirer cette exclusion.

---

## OK — Points de sécurité validés

| Point | Détail | Fichier |
|-------|--------|---------|
| **Headers de sécurité complets** | CSP, HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy | `middleware.ts` |
| **Nonce CSP dynamique** | `crypto.randomUUID()` par requête pour `script-src` | `middleware.ts:68` |
| **HTTPS enforced en production** | Erreur au démarrage si `NEXTAUTH_URL` n'est pas HTTPS | `next.config.mjs:3-8` |
| **Docker non-root** | Utilisateur `app` (UID 1001) dans l'image de production | `Dockerfile:33-34` |
| **Docker multi-stage** | 3 stages — devDependencies absentes de l'image finale | `Dockerfile` |
| **Session maxAge 30 min** | `session.maxAge: 60 * 30` — durée de session raisonnable | `authOptions.ts:31-33` |
| **Validation JWT OIDC renforcée** | Vérification `iss`, `aud`, `exp` + flag `RefreshAccessTokenError` | `middleware.ts:36-47` |
| **`.gitignore` complet** | `.env`, `.env*.local`, `node_modules/`, `.next/` exclus du dépôt | `.gitignore` |
| **Secrets via variables d'environnement** | Keycloak secret, NEXTAUTH_SECRET, BANK_ACCOUNT_* lus depuis `process.env` | `authOptions.ts`, `getBankCredEnvVars.ts` |
| **CI/CD security-audit** | Job `npm audit --audit-level=high` bloque le build si vuln HIGH détectée | `build-docker-prod.yaml:16-36` |
| **Dependabot actif** | Mises à jour hebdomadaires npm configurées | `dependabot.yml` |
| **`.env.example` sans vraies valeurs** | Exemples fictifs avec avertissement explicite | `.env.example:1-2` |
| **Images Docker HTTPS uniquement** | `remotePatterns` restreint à `https://console.deploily.cloud` | `next.config.mjs:15-20` |

---

## Plan d'action priorisé

### Immédiat (bloquant pour la production)

| # | Action | Fichier(s) | Effort |
|---|--------|------------|--------|
| 1 | Installer `dompurify` et sanitiser `dangerouslySetInnerHTML` | `servicePlanCard.tsx`, `ressourcePlanCard.tsx` | 1h |
| 2 | Migrer `NEXT_PUBLIC_SITE_KEY` vers variable d'environnement | `deploilyWebsiteUrls.ts` | 30min |
| 3 | Exécuter `npm audit fix` et valider les tests | `package.json` | 2h |

### Court terme (sprint suivant)

| # | Action | Fichier(s) | Effort |
|---|--------|------------|--------|
| 4 | Renommer `NEXT_PUBLIC_WILAYA_API_KEY` si confidentielle | `getApiKey.ts` | 30min |
| 5 | Valider l'URL dans `federatedLogout` | `federatedLogout.ts` | 1h |
| 6 | Supprimer les `console.log` de débogage | `cloudResourceThunks.tsx`, `myWebHostingsSection.tsx` | 1h |
| 7 | Typer les callbacks NextAuth (supprimer `any`) | `authOptions.ts`, `middleware.ts` | 2h |
| 8 | Remplacer `alert(error)` par toast notification | `federatedLogout.ts` | 30min |
| 9 | Implémenter gestion d'erreur dans paiements | `cardPaymentComponent.tsx`, `fundBalanceByCard.tsx` | 2h |

### Moyen terme

| # | Action | Effort |
|---|--------|--------|
| 10 | Planifier migration Next.js 15 et retirer exclusion Dependabot | 4h+ |
| 11 | Évaluer ajout de `preload` à HSTS | 1h |
| 12 | Investiguer remplacement de `'unsafe-inline'` CSS | 4h |

---

## Commandes de vérification rapide

```bash
# Audit des dépendances
cd deploily-console && npm audit

# Correction automatique
cd deploily-console && npm audit fix

# Rechercher les usages dangereux
grep -r "dangerouslySetInnerHTML" src/
grep -r "console\.log" src/ --include="*.tsx" --include="*.ts"
grep -r "NEXT_PUBLIC_" src/ --include="*.ts" --include="*.tsx"
grep -rn "any\b" src/lib/utils/authOptions.ts src/middleware.ts
```

---

*Rapport généré automatiquement le 2026-04-07 par analyse statique (SAST) du code source, des dépendances et de la configuration CI/CD. À valider et compléter par un test d'intrusion dynamique (DAST) avant déploiement en production.*
