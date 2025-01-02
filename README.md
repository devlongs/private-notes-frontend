## Private Notes Frontend

## Description
The Private Notes Frontend is a Next.js application designed to interact with the Private Notes Backend on the Calimero Network via JSON-RPC Client. It provides a user-friendly interface for managing notes.

## Features
- Add new notes with a unique ID and content.
- View the list of all stored notes.
- Delete notes with a single click.

### Getting Started
1. Clone the Repository:
```bash
git clone <repo-url>
cd private-notes-frontend
```

2. CInstall Dependencies:
```bash
git clone https://github.com/devlongs/private-notes-frontend.git
npm install
```

3. Update Configuration: Edit pages/index.js:
```bash
const NODE_URL = "http://127.0.0.1:2428/jsonrpc";
const CONTEXT_ID = "<CONTEXT_ID>";
const APP_ID = "<APP_ID>";
```

4. Run the Development Server:
```bash
npm run dev
```

### Dependencies
- Next.js
- Calimero P2P SDK
