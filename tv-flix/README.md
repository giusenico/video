# TV-Flix - Piattaforma di Streaming

Un'applicazione React moderna per lo streaming di contenuti TV organizzati per categorie, con un'interfaccia ispirata alle principali piattaforme di streaming.

## Funzionalità

- Interfaccia utente moderna e responsiva
- Contenuti organizzati per categorie
- Supporto per streaming HLS
- Sistema di autenticazione
- Modalità picture-in-picture
- Compatibilità con dispositivi mobile

## Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

## Configurazione dell'Autenticazione

L'applicazione utilizza un sistema di autenticazione basato su variabili d'ambiente per maggiore sicurezza. Per configurare le credenziali:

1. Crea un file `.env` nella root del progetto (è già incluso nel `.gitignore`)
2. Aggiungi le seguenti variabili:

```
VITE_AUTH_USERNAME=tuousername
VITE_AUTH_PASSWORD=tuapassword
```

**Nota importante:** Il file `.env` non deve essere incluso nel repository Git per motivi di sicurezza. Utilizza invece il file `.env.example` come riferimento.

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
