# Project Structure 📁

This document explains the organization of the AGORA repository.

## Current Structure (MVP)

```
agora/
├── index.html              # Main landing page with demo
├── README.md               # Project overview & getting started
├── CONTRIBUTING.md         # How to contribute
├── CONTRIBUTORS.md         # Recognition of all contributors
├── LICENSE                 # GPL v3 license
├── .gitignore             # Git ignore rules
└── docs/                   # Documentation (future)
    ├── ROADMAP.md         # Detailed roadmap
    ├── ARCHITECTURE.md    # Technical architecture
    └── API.md             # API documentation (future)
```

## Future Structure (As Project Grows)

```
agora/
├── frontend/
│   ├── web/               # Web application
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   └── mobile/            # React Native mobile apps
│       ├── ios/
│       └── android/
├── backend/
│   ├── api/               # REST API
│   ├── scraper/           # Parliamentary vote scrapers
│   ├── verification/      # Vote verification system
│   └── database/          # Database schemas
├── infrastructure/
│   ├── docker/            # Container configurations
│   ├── deployment/        # Deployment scripts
│   └── monitoring/        # Monitoring & logging
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
- **web/**: Main web application (React/TypeScript)
- **mobile/**: iOS & Android apps (React Native)

### `/backend`
Server-side code:
- **api/**: REST API for frontend communication
- **scraper/**: Tools to fetch parliamentary voting data
- **verification/**: Systems to ensure vote integrity
- **database/**: Schemas and migrations

### `/infrastructure`
Deployment & operations:
- **docker/**: Containerization
- **deployment/**: CI/CD, hosting configurations
- **monitoring/**: Logs, metrics, alerts

### `/docs`
All documentation:
- **user-guides/**: How to use AGORA
- **developer-guides/**: How to contribute
- **translations/**: Docs in multiple languages

### `/tests`
Automated testing:
- **unit/**: Component-level tests
- **integration/**: API & service tests
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
