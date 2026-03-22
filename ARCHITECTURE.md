# AGORA Technical Architecture 🏗️

> **Principle**: 100% Free and Open Source Software (FOSS). No dependencies on Big Tech.

**Status**: Design Phase
**Last Updated**: March 19, 2026

---

## Overview

AGORA is built on a **hybrid architecture** with two components:

```
┌─────────────────────────────────────────────────────────────┐
│              DECENTRALIZED NETWORK                          │
│                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│   │  Node A  │◄──►│  Node B  │◄──►│  Node C  │   ...       │
│   │ (volunteer)│  │(association)│  │(activist) │            │
│   └──────────┘    └──────────┘    └──────────┘             │
│        │               │               │                    │
│        └───────────────┼───────────────┘                    │
│                        │                                    │
│              Synchronizes votes via P2P                     │
└────────────────────────┼────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              PUBLIC WEB PORTAL                              │
│                                                             │
│   • Aggregates data from the network                        │
│   • Displays "The Gap" - visualizations                    │
│   • Easy voting for regular users                           │
│   • Information about the project                           │
│   • Hosted on Codeberg Pages / own server                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Architecture Principles

### 1. Decentralization
- **No central server** owns the data
- Anyone can run a node
- The network continues to function even if nodes disappear

### 2. Censorship Resistance
- Data is replicated across many nodes
- Can be accessed via Tor/I2P
- No single actor can shut down the system

### 3. FOSS-First
All components must be free software:
- ✅ GPL, AGPL, MIT, Apache 2.0, MPL
- ❌ Proprietary software
- ❌ "Open core" with proprietary add-ons

### 4. Big Tech-Free
We intentionally avoid:
- ❌ Google (Firebase, Analytics, Cloud, reCAPTCHA)
- ❌ Microsoft (Azure, GitHub Actions)
- ❌ Amazon (AWS)
- ❌ Cloudflare
- ❌ Projects linked to the Thiel/Musk sphere

---

## Technical Components

### Frontend (Web Portal)

| Component | Current | Planned |
|-----------|-----------|----------|
| Framework | Vanilla HTML/CSS/JS | SolidJS or Svelte |
| Hosting | Codeberg Pages | Own server + P2P mirror |
| Build System | None | Vite |
| CSS | Vanilla | UnoCSS or Pico.css |

**Why not React?**
React is owned by Meta. We prefer community-driven alternatives like SolidJS or Svelte.

### Backend (Decentralized)

| Component | Planned Alternative | Why |
|-----------|---------------------|--------|
| P2P Protocol | **Gun.js** or **OrbitDB** | Simpler than Holochain, actively maintained |
| File Storage | **IPFS** via Kubo | Established, large network |
| Identity | **DID/Verifiable Credentials** | Standardized, decentralized |
| Database | **PouchDB** (local) + sync | Works offline |

### Alternatives for Zero-Knowledge Proofs

| Solution | Status | Complexity |
|---------|--------|-------------|
| Semaphore | Established | Medium |
| MACI | Proven for voting | High |
| zkSNARKs (Circom) | Flexible | High |

**MVP Approach**: Start without ZK, add later.

---

## Node Architecture

### What does a node do?

```
┌────────────────────────────────────────┐
│              AGORA NODE                │
├────────────────────────────────────────┤
│  📥 Receives votes from users          │
│  🔄 Synchronizes with other nodes      │
│  ✅ Validates vote legitimacy          │
│  💾 Stores vote history locally        │
│  📊 Provides data via API              │
└────────────────────────────────────────┘
```

### Who can run a node?

- **Individuals** on their own computer/server
- **Associations** (democracy organizations, NGOs)
- **Universities** and research institutions
- **Activist groups**
- **Media organizations**

### Requirements for running a node

**Minimum (light node):**
- Linux/BSD server or Raspberry Pi
- 1 GB RAM
- 10 GB storage
- Internet connection

**Recommended (full node):**
- 4 GB RAM
- 100 GB SSD
- Static IP or domain
- Tor hidden service (optional)

---

## Voting Flow

```
1. User opens AGORA (web or app)
         │
         ▼
2. Selects question and votes
         │
         ▼
3. Vote is cryptographically signed
   (proves legitimacy without revealing identity)
         │
         ▼
4. Vote is sent to the nearest node
         │
         ▼
5. The node validates and spreads it to the network
         │
         ▼
6. All nodes update their local copy
         │
         ▼
7. The web portal displays updated aggregation
```

---

## Identity and Anti-Manipulation

### The Problem
How do we prevent someone from voting multiple times without requiring central identification?

### Planned Solutions

**Phase 1 (MVP)**: Simple rate-limiting
- IP-based restriction
- Browser fingerprinting (ethical usage)
- "Good enough" for demonstration

**Phase 2**: Pseudonymous identity
- Create anonymous identity linked to device
- One vote per question per identity
- No connection to real-world person

**Phase 3**: Zero-knowledge proofs
- Prove "I am a unique person" without revealing who
- Integration with existing systems (BankID via proxy?)
- Alternative: Web of Trust

---

## FOSS Alternatives We Use

### Hosting & Infrastructure
| Need | Big Tech | Our Choice |
|-------|----------|----------|
| Code Hosting | GitHub | **Codeberg** (Forgejo) |
| CI/CD | GitHub Actions | **Woodpecker CI** |
| Web Hosting | Vercel/Netlify | **Codeberg Pages** / own |
| DNS | Cloudflare | **Njalla** or **1984.is** |
| Email | Gmail | **Proton** or **Mailbox.org** |

### Communication
| Need | Big Tech | Our Choice |
|-------|----------|----------|
| Chat (internal) | Slack/Discord | **Matrix** (Element) |
| Chat (users) | WhatsApp | **Signal** |
| Video Meetings | Zoom/Meet | **Jitsi Meet** |
| Forum | Reddit | **Lemmy** or **Discourse** |

### Development Tools
| Need | Big Tech | Our Choice |
|-------|----------|----------|
| Analytics | Google Analytics | **Plausible** / **Umami** |
| Error Tracking | Sentry (Microsoft) | **GlitchTip** (self-hosted) |
| CDN | Cloudflare | **BunnyCDN** or none |

---

## Data Model

### Vote
```json
{
  "id": "uuid-v4",
  "question_id": "uuid-v4",
  "choice": "yes|no|abstain",
  "voter_proof": "zk-snark-proof-or-hash",
  "timestamp": "ISO-8601",
  "node_received": "node-id",
  "signature": "ed25519-signature"
}
```

### Question
```json
{
  "id": "uuid-v4",
  "title": "Should Sweden restore wetlands?",
  "description": "Full description...",
  "source_url": "link to parliamentary vote",
  "parliament_vote": {
    "yes": 120,
    "no": 229,
    "abstain": 0,
    "date": "2026-03-15"
  },
  "countries": ["SE"],
  "created_at": "ISO-8601",
  "status": "active|closed"
}
```

---

## Security Model

### Threats We Protect Against

| Threat | Countermeasure |
|-----|-----------|
| DDoS | Distributed network, Tor |
| Censorship | P2P, no central points |
| Vote Manipulation | Cryptographic proofs |
| Data Breach | No sensitive data stored |
| State Surveillance | No identity data, Tor support |

### What we DO NOT store
- ❌ Names or social security numbers
- ❌ IP addresses (after validation)
- ❌ Device information
- ❌ Anything that can link a vote to a person

---

## Development Phases

### Phase 0: Now (MVP)
```
Vanilla HTML/CSS/JS → GitHub/Codeberg Pages
No backend, demo only
```

### Phase 1: Working Prototype
```
SolidJS frontend → Own server
PouchDB local → Simple sync
Manual data entry
```

### Phase 2: Decentralized Beta
```
Gun.js/OrbitDB P2P sync
Multiple nodes
IPFS for static resources
```

### Phase 3: Full Decentralization
```
Zero-knowledge voting
Tor hidden service
Fully censorship-resistant
```

---

## How You Can Contribute

### Backend Developers
- Gun.js/OrbitDB integration
- P2P synchronization
- API design

### Cryptography Experts
- Zero-knowledge implementation
- Vote verification
- Security audit

### DevOps
- Node packaging (Docker, Nix)
- Tor hidden service setup
- Automated deployment

### Security Testers
- Penetration testing
- Threat modeling
- Vulnerability scanning

---

## Resources

### Inspiration
- [Vocdoni](https://vocdoni.io/) - Decentralized voting
- [Snapshot](https://snapshot.org/) - DAO voting
- [Secure Scuttlebutt](https://scuttlebutt.nz/) - P2P social
- [Briar](https://briarproject.org/) - P2P messenger

### Technical Documentation
- [Gun.js docs](https://gun.eco/docs/)
- [IPFS docs](https://docs.ipfs.tech/)
- [OrbitDB](https://orbitdb.org/)
- [Semaphore](https://semaphore.appliedzkp.org/)

---

## Questions?

Open an issue with the tag `[ARCHITECTURE]` or discuss in the Matrix channel.

---

**"Decentralization is not a goal in itself – it is a tool to make the system impossible to silence."**
