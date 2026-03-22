# Project Structure 📁

This document explains the organization of the AGORA repository.

## Current Structure (MVP)

```
agora/
├── index.html              # Main landing page with demo
├── README.md               # Project overview & getting started
├── ARCHITECTURE.md         # Technical architecture & principles
├── STRUCTURE.md            # Repository organization (this file)
├── CONTRIBUTING.md         # How to contribute
├── CONTRIBUTORS.md         # Recognition of all contributors
├── LICENSE                 # GPL v3 license
├── .gitignore             # Git ignore rules
└── docs/                   # Documentation (future)
    ├── ROADMAP.md         # Detailed roadmap
    └── API.md             # API documentation (future)
```

## Future Structure (As Project Grows)

```
agora/
├── frontend/
│   ├── web/               # Web application (SolidJS or Svelte)
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   └── mobile/            # Mobile apps (React Native)
│       ├── ios/
│       └── android/
├── backend/
│   ├── p2p/               # Decentralized node logic (Gun.js/OrbitDB)
│   ├── scraper/           # Parliamentary vote scrapers
│   ├── identity/          # DID/Verifiable Credentials & ZK Proofs
│   └── database/          # Local storage (PouchDB) & schemas
├── infrastructure/
│   ├── docker/            # Node packaging (Docker, Nix)
│   ├── deployment/        # Tor hidden service & deployment scripts
│   └── monitoring/        # Plausible/Umami analytics & GlitchTip
├── docs/
│   ├── user-guides/       # User documentation
│   ├── developer-guides/  # Developer documentation
│   └── translations/      # Translated documentation
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── scripts/
    ├── setup/             # Setup & installation
    └── data/              # Data processing utilities
```

## Key Directories (Future)

### `/frontend`
All user-facing applications:
- **web/**: Main web application (SolidJS or Svelte + Vite)
- **mobile/**: iOS & Android apps (React Native)

### `/backend`
Core decentralized logic:
- **p2p/**: P2P synchronization using Gun.js or OrbitDB
- **scraper/**: Tools to fetch parliamentary voting data
- **identity/**: Systems for vote integrity (ZK proofs, DIDs)
- **database/**: PouchDB for offline-first local storage

### `/infrastructure`
Deployment & operations:
- **docker/**: Containerization and Nix expressions
- **deployment/**: Tor hidden service, Codeberg Pages, CI/CD (Woodpecker)
- **monitoring/**: Privacy-respecting analytics (Plausible) & error tracking

### `/docs`
All documentation:
- **user-guides/**: How to use AGORA
- **developer-guides/**: How to contribute
- **translations/**: Docs in multiple languages

### `/tests`
Automated testing:
- **unit/**: Component-level tests
- **integration/**: P2P & service tests
- **e2e/**: Full user flow tests

### `/scripts`
Utility scripts:
- **setup/**: Installation & configuration
- **data/**: Data processing & migration

## File Naming Conventions

- **Code files**: `lowercase-with-dashes.js`
- **Components**: `PascalCase.jsx`
- **Docs**: `UPPERCASE.md` for root-level, `lowercase.md` for nested
- **Config**: `lowercase.config.js`

## Branch Strategy

- `main`: Production-ready code
- `develop`: Active development
- `feature/[name]`: New features
- `fix/[name]`: Bug fixes
- `docs/[name]`: Documentation updates

## What Goes Where?

### Root Level
- Essential files (README, LICENSE, CONTRIBUTING)
- Landing page (for GitHub Pages)
- Configuration files

### Source Code
- Goes in `/frontend` or `/backend` directories
- Keep organized by feature/function

### Documentation
- User-facing: `/docs/user-guides`
- Developer-facing: `/docs/developer-guides`
- Root-level docs: High-level overview only

### Assets
- Images: `/frontend/web/public/images`
- Fonts: `/frontend/web/public/fonts`
- Icons: `/frontend/web/public/icons`

## Best Practices

1. **Keep it organized**: One feature per directory
2. **Consistent naming**: Follow conventions above
3. **Document everything**: README in each major directory
4. **Test your code**: Tests live alongside source
5. **Small commits**: Atomic changes, clear messages

## Questions?

If you're unsure where something should go:
1. Check existing similar files
2. Ask in GitHub Discussions
3. Propose in your PR and discuss

---

**This structure will evolve as the project grows.**  
Suggestions for improvements are always welcome!
