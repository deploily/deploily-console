# Plan d’action sécurité — deploily-console — 2026-04-07

## Objectif
- Corriger les findings critiques/majeurs de l’audit et durcir la surface d’attaque (headers, authZ, cookies, CI/CD, conteneur).

## Périmètre
- Frontend Next.js 14 (app router), middleware, NextAuth/Keycloak, CI GitHub Actions, Dockerfile.

## P0 (immédiat — High/Critical)
- Activer CSP stricte dans `src/middleware.ts` :
  - Générer un nonce (`x-nonce`) et appliquer `Content-Security-Policy` avec `script-src 'self' 'nonce-{nonce}'` (ou hashes), `style-src 'self'` (éviter `unsafe-inline`), `connect-src` limité aux domaines nécessaires, `img-src 'self' data: https:`, `frame-ancestors 'none'`, `base-uri 'self'`.
  - Poser systématiquement le header via `response.headers.set("Content-Security-Policy", ...)`.
- Supprimer `X-XSS-Protection` et s’appuyer sur CSP et échappement côté client.
- Durcir `authorized()` :
  - Vérifier `exp` non expiré, `iss`/`aud` conformes, et présence de `roles/scopes` exigés pour `/portal`.
  - Refuser si claims requis manquants; prévoir logs sans données sensibles.
- Forcer `NEXTAUTH_URL` en `https` en prod :
  - Ajouter contrôle runtime: si non-https en `NODE_ENV=production`, lever erreur démarrage.
  - Dans `api/auth/federated-logout`, refuser `post_logout_redirect_uri` non https en prod.
- HSTS :
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains` ; évaluer `preload` après validation.

Livrables P0
- `src/middleware.ts` : CSP, HSTS durci, suppression X-XSS-Protection, Permissions-Policy minimal (voir P1).
- `src/lib/utils/authOptions.ts` : vérifs claims/scopes (ou callbacks NextAuth).
- `src/app/api/auth/federated-logout/route.ts` : contrôle redirect https en prod.
- `.env.example` : commenter explicitement que toutes valeurs sont fictives; aucune valeur réelle ne doit être commitée.

Critères d’acceptation P0
- Réponses HTTP incluent CSP (sans violations critiques observées), HSTS avec `includeSubDomains`.
- Middleware refuse accès si claims/scopes invalides; `/portal` protégé au-delà de `token != null`.
- En prod, démarrage bloque si `NEXTAUTH_URL` non https.

## P1 (court terme)
- Permissions-Policy :
  - Ajouter `Permissions-Policy` pour désactiver features non utilisées (ex.: `camera=(), microphone=(), geolocation=(), autoplay=(), payment=()`).
- Cookies/Session NextAuth :
  - `secure=true` en prod, `httpOnly`, `sameSite=lax/strict`; cohérence domaine.
- Rate limiting et logs :
  - Limiter requêtes sur endpoints internes (si exposés); centraliser logs auth sans fuite d’infos.
- CI/CD (supply chain) :
  - Activer Dependabot (npm) via `.github/dependabot.yml`.
  - Ajouter job `npm audit` sur branches actives; maintenir pin des actions GitHub par SHA.
- Conteneur :
  - Ajouter `HEALTHCHECK` (ex. `CMD curl -f http://localhost:3000/api/health || exit 1`) si endpoint de santé disponible.

Critères d’acceptation P1
- Headers incluent `Permissions-Policy` restrictive.
- Cookies NextAuth conformes (secure/httpOnly/sameSite).
- Pipeline CI produit rapport `npm audit` et Dependabot actif; actions pin par SHA.
- Image Docker avec `HEALTHCHECK` (si supporté par l’application).

## P2 (moyen terme)
- AuthZ par ressource (RBAC) :
  - Règles par vue/transaction sensible basées sur `roles/scopes`.
- Signature d’images et policy d’admission :
  - Signer images avec `cosign`; appliquer policy d’admission (Gatekeeper/OPA) en cluster.
- CSP reporting :
  - Activer `report-to`/`report-uri` vers endpoint de collecte; affiner la politique au fil des rapports.

Critères d’acceptation P2
- RBAC opérationnel pour composants sensibles.
- Images signées et contrôlées à l’admission.
- Flux de reports CSP exploités sans faux positifs majeurs.

## Workflow d’exécution (branche `audit-securit`)
- Commits atomiques :
  - `feat(security): enable strict CSP and HSTS includeSubDomains`
  - `refactor(authz): enforce OIDC claims and scopes for /portal`
  - `chore(security): remove X-XSS-Protection and add Permissions-Policy`
  - `chore(ci): add npm audit job and enable Dependabot`
  - `chore(docker): add HEALTHCHECK (if applicable)`
- Tests et validation :
  - Vérifier headers via navigateur/inspections; s’assurer aucune violation CSP bloquante.
  - Tests manuels d’accès /portal avec rôles/scopes différents.
  - Exécuter `npm audit` et corriger vulnérabilités prioritaires.
- Ouverture du Pull Request :
  - Titre: « Durcissement sécurité: CSP, HSTS, Permissions-Policy, AuthZ et hygiène CI »
  - Description: récapitulatif des changements et impacts.
  - Checklist: reprendre celle du rapport d’audit.

## Notes de mise en prod
- Valider `preload` HSTS uniquement après audit DNS/HTTPS sur l’ensemble du domaine.
- Éviter `unsafe-inline/unsafe-eval`; préférer nonce/hashes pour scripts tiers strictement nécessaires.
