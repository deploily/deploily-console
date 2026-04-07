# Audit cybersécurité — deploily-console — 2026-04-07

## Contexte et périmètre
- Référentiel audité: c:\PythonProjects\transformatek\deploily-console
- Méthode: audit statique (SAST), inspection config, CI/CD, conteneurs, secrets.
- Politique de gating: threshold=high, fail_on=[high,critical].

## Résumé du stack
- Next.js 14 (app router) + TypeScript, Redux Toolkit, Ant Design/MUI, i18n via next-international, next-auth (OIDC Keycloak).
- AuthN/AuthZ: NextAuth avec Keycloak; middleware protège /portal.
- Endpoints internes: /api/auth/[...nextauth], /api/auth/federated-logout.
- Appels externes via axios vers NEXT_PUBLIC_BASE_URL avec Authorization: Bearer.
- CI/CD: GitHub Actions (build/push images GHCR), déploiement K8s (kubectl runners).
- Conteneurs: Docker multi-étapes, exécution non‑root, Next standalone.
- IaC: non présent (pas de Terraform/K8s manifests dans le repo).

## Statut du gate
- État: FAIL
- Raison: au moins une vulnérabilité de sévérité « High » détectée (CSP désactivée dans middleware).

## Findings détaillés
### High
- Content-Security-Policy désactivée/commentée; aucun header CSP appliqué, augmentant le risque XSS et injection de ressources non autorisées. Voir [middleware.ts:L33-L51](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/middleware.ts#L33-L51) et absence de set() [middleware.ts:L73-L76](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/middleware.ts#L73-L76).

### Medium
- Autorisation minimale (authorized: token != null) sans vérification de claims/roles/scopes. Voir [middleware.ts:L18-L21](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/middleware.ts#L18-L21).
- HSTS sans includeSubDomains ni preload; durcissement incomplet. Voir [middleware.ts:L80](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/middleware.ts#L80).
- NEXTAUTH_URL peut être http en exemple; forcer https en prod pour logout fédéré et cookies. Voir [federated-logout route.ts:L8-L9](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/app/api/auth/federated-logout/route.ts#L8-L9), [env.example:L7](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/.env.example#L7).

### Low
- X-XSS-Protection obsolète et mal formée (double espace); à supprimer. Voir [middleware.ts:L81-L82](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/middleware.ts#L81-L82).
- Vérifier que NEXT_PUBLIC_BASE_URL ne révèle aucune information sensible côté client. Voir [axios-instance.ts:L5-L7](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/app/api/axios-instance.ts#L5-L7).
- .env.example contient des placeholders de secrets (bonnes pratiques: ne jamais committer de valeurs réelles). Voir [env.example:L4-L8](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/.env.example#L4-L8).
- Exposition d’accessToken via session côté client dans certains thunks: usage standard mais à encadrer (durcir CSP, validation des domaines connect-src). Voir [nextCloudThunks.tsx:L14-L23](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/lib/features/next-cloud/nextCloudThunks.tsx#L14-L23).
- Gitignore sous-projet: ajouter .env si le sous-projet est utilisé standalone (root ignore le .env globalement). Voir [root .gitignore:L75-L81](file:///c:/PythonProjects/transformatek/deploily-console/.gitignore#L75-L81) et [sub .gitignore:L28-L36](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/.gitignore#L28-L36).

## Bonnes pratiques & durcissements manquants
- Headers sécurité: activer CSP stricte; durcir HSTS (includeSubDomains, éventuellement preload); supprimer X-XSS-Protection; ajouter Permissions-Policy (désactiver camera, geolocation, microphone, etc.).
- AuthZ fine-grained: vérifier aud/iss/exp/scopes/roles pour /portal; éventuellement règles spécifiques par vue.
- Cookies/Session NextAuth: secure=true en prod, httpOnly, sameSite=lax/strict; cohérence domaine/https.
- Rate limiting et logs: limiter requêtes sur endpoints internes; journaliser auth sans fuite d’infos sensibles.
- Supply chain: Dependabot (npm), maintenir pin SHA des actions; signature d’images (cosign) et policy d’admission.
- Conteneur: optionnellement HEALTHCHECK si non présent; garder USER non-root.

## Plan d’action priorisé
### P0 (immédiat — High/Critical)
- Activer CSP et la poser systématiquement via middleware; restreindre script-src, style-src, connect-src; utiliser nonce/sha256 et le header set() existant ([middleware.ts](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/middleware.ts#L73-L76)).
- Supprimer X-XSS-Protection; s’appuyer sur CSP et échappement côté client.
- Durcir authorized(): refuser si claims OIDC requis manquants; contrôler roles/scopes pour /portal.
- Forcer https pour NEXTAUTH_URL en prod; valider domaine; bloquer démarrage si non https.
- HSTS: ajouter includeSubDomains; évaluer preload après validation DNS/HTTPS.

### P1 (court terme)
- Ajouter Permissions-Policy minimale; limiter features non utilisées.
- Revue cookies NextAuth: secure/httpOnly/sameSite; aligner options.
- Mettre en place rate limiting basique sur API internes; centraliser logs auth.
- Ajouter Dependabot (npm) et revue régulière npm audit; maintenir pin des actions GitHub par SHA.
- Conteneur: ajouter HEALTHCHECK si pertinent (ex: /api/health).

### P2 (moyen terme)
- AuthZ par ressource (RBAC): composants sensibles protégés par claims/roles.
- Supply chain avancée: signature d’images (cosign) et policy Gatekeeper/OPA en cluster.
- Surveillance CSP (report-to / reporting endpoint) pour affiner la politique.

## Modifications techniques proposées (fichiers ciblés)
- [middleware.ts](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/middleware.ts): décommenter/implémenter CSP; retirer X-XSS-Protection; durcir HSTS; ajouter Permissions-Policy; conserver x-nonce et set() des headers.
- [authOptions.ts](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/lib/utils/authOptions.ts): ajouter vérifications des claims/scopes côté authorized() ou via callbacks; s’assurer cookies sécurisés en prod.
- [federated-logout route.ts](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/app/api/auth/federated-logout/route.ts): refuser post_logout_redirect_uri non https en prod.
- [.env.example](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/.env.example): commentaires explicites sur valeurs fictives; exiger variables définies en prod; ne pas committer d’originaux.
- [.github/workflows/*](file:///c:/PythonProjects/transformatek/deploily-console/.github/workflows/build-docker-prod.yaml): vérifier/pinner actions par SHA; ajouter job npm audit et Dependabot.
- [Dockerfile](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/Dockerfile): optionnel HEALTHCHECK.

## Vérifications attendues
- Tests manuels: pages /portal chargent avec CSP sans violations; aucun script inline non autorisé; endpoints auth fonctionnels.
- Sécurité: headers présents (CSP, HSTS avec includeSubDomains, Permissions-Policy); suppression X-XSS-Protection.
- CI: rapport npm audit; Dependabot actif; images construites signables; runners sécurisés.

## Proposition de Pull Request
- Titre: Durcissement sécurité: CSP, HSTS, Permissions-Policy, AuthZ et hygiène CI
- Description (résumé):
  - Active CSP stricte et retire X-XSS-Protection.
  - Durcit HSTS (includeSubDomains) et force NEXTAUTH_URL https en prod.
  - Renforce authorized() par vérification de claims/scopes.
  - Ajoute Permissions-Policy, recommandations CI (Dependabot, pin actions).
  - Optionnel: HEALTHCHECK conteneur.
- Checklist:
  - [ ] CSP active, testée, aucune violation critique.
  - [ ] HSTS includeSubDomains, revue preload planifiée.
  - [ ] X-XSS-Protection supprimé.
  - [ ] Permissions-Policy ajoutée et restrictive.
  - [ ] authorized() vérifie claims/scopes pertinents.
  - [ ] NEXTAUTH_URL https et cookies NextAuth sécurisés.
  - [ ] npm audit exécuté en CI, Dependabot activé.
  - [ ] Actions GitHub pin par SHA vérifiées.
  - [ ] HEALTHCHECK ajouté si pertinent.

## Références
- Middleware/headers: [middleware.ts](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/middleware.ts#L13-L25), [middleware.ts:L73-L82](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/middleware.ts#L73-L82)
- NextAuth/Keycloak: [authOptions.ts](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/lib/utils/authOptions.ts#L1-L94)
- Logout fédéré: [route.ts](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/src/app/api/auth/federated-logout/route.ts#L1-L22)
- CI/CD: [build-docker-prod.yaml](file:///c:/PythonProjects/transformatek/deploily-console/.github/workflows/build-docker-prod.yaml), [build-docker-dev.yaml](file:///c:/PythonProjects/transformatek/deploily-console/.github/workflows/build-docker-dev.yaml)
- Conteneur: [Dockerfile](file:///c:/PythonProjects/transformatek/deploily-console/deploily-console/Dockerfile)
