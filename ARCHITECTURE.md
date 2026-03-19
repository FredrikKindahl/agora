# AGORA Technical Architecture 🏗️

> **Princip**: 100% fri och öppen programvara (FOSS). Inga beroenden av Big Tech.

**Status**: Design-fas  
**Senast uppdaterad**: 19 mars 2026

---

## Översikt

AGORA bygger på en **hybrid arkitektur** med två komponenter:

```
┌─────────────────────────────────────────────────────────────┐
│              DECENTRALISERAT NÄTVERK                        │
│                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│   │  Nod A   │◄──►│  Nod B   │◄──►│  Nod C   │   ...       │
│   │ (volontär)│    │ (förening)│   │(aktivist)│             │
│   └──────────┘    └──────────┘    └──────────┘             │
│        │               │               │                    │
│        └───────────────┼───────────────┘                    │
│                        │                                    │
│              Synkroniserar röster via P2P                   │
└────────────────────────┼────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              PUBLIK WEBBPORTAL                              │
│                                                             │
│   • Sammanställer data från nätverket                       │
│   • Visar "Gapet" - visualiseringar                         │
│   • Enkel röstning för vanliga användare                    │
│   • Information om projektet                                │
│   • Hostad på Codeberg Pages / egen server                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Arkitekturprinciper

### 1. Decentralisering
- **Ingen central server** äger data
- Vem som helst kan köra en nod
- Nätverket fortsätter fungera även om noder försvinner

### 2. Censurresistens
- Data replikeras över många noder
- Kan nås via Tor/I2P
- Ingen enskild aktör kan stänga ner systemet

### 3. FOSS-först
Alla komponenter måste vara fri programvara:
- ✅ GPL, AGPL, MIT, Apache 2.0, MPL
- ❌ Proprietär programvara
- ❌ "Open core" med proprietära tillägg

### 4. Big Tech-fri
Vi undviker medvetet:
- ❌ Google (Firebase, Analytics, Cloud, reCAPTCHA)
- ❌ Microsoft (Azure, GitHub Actions)
- ❌ Amazon (AWS)
- ❌ Cloudflare
- ❌ Projekt kopplade till Thiel/Musk-sfären

---

## Tekniska komponenter

### Frontend (Webbportal)

| Komponent | Nuvarande | Planerat |
|-----------|-----------|----------|
| Ramverk | Vanilla HTML/CSS/JS | SolidJS eller Svelte |
| Hosting | Codeberg Pages | Egen server + P2P-mirror |
| Byggsystem | Ingen | Vite |
| CSS | Vanilla | UnoCSS eller Pico.css |

**Varför inte React?**
React ägs av Meta. Vi föredrar community-drivna alternativ som SolidJS eller Svelte.

### Backend (Decentraliserat)

| Komponent | Planerat alternativ | Varför |
|-----------|---------------------|--------|
| P2P-protokoll | **Gun.js** eller **OrbitDB** | Enklare än Holochain, aktivt underhållen |
| Fillagring | **IPFS** via Kubo | Etablerat, stort nätverk |
| Identitet | **DID/Verifiable Credentials** | Standardiserat, decentraliserat |
| Databas | **PouchDB** (lokal) + synk | Fungerar offline |

### Alternativ för Zero-Knowledge Proofs

| Lösning | Status | Komplexitet |
|---------|--------|-------------|
| Semaphore | Etablerat | Medel |
| MACI | Beprövat för röstning | Hög |
| zkSNARKs (Circom) | Flexibelt | Hög |

**MVP-approach**: Börja utan ZK, lägg till senare.

---

## Nodarkitektur

### Vad gör en nod?

```
┌────────────────────────────────────────┐
│              AGORA NOD                 │
├────────────────────────────────────────┤
│  📥 Tar emot röster från användare     │
│  🔄 Synkroniserar med andra noder      │
│  ✅ Validerar rösters giltighet        │
│  💾 Lagrar rösthistorik lokalt         │
│  📊 Tillhandahåller data via API       │
└────────────────────────────────────────┘
```

### Vem kan köra en nod?

- **Privatpersoner** på sin egen dator/server
- **Föreningar** (demokrati-organisationer, NGO:er)
- **Universitet** och forskningsinstitutioner
- **Aktivistgrupper**
- **Medieorganisationer**

### Krav för att köra nod

**Minimum (lätt nod):**
- Linux/BSD-server eller Raspberry Pi
- 1 GB RAM
- 10 GB lagring
- Internetanslutning

**Rekommenderat (full nod):**
- 4 GB RAM
- 100 GB SSD
- Statisk IP eller domän
- Tor hidden service (valfritt)

---

## Röstningsflöde

```
1. Användare öppnar AGORA (webb eller app)
         │
         ▼
2. Väljer fråga och röstar
         │
         ▼
3. Röst signeras kryptografiskt
   (bevisar giltighet utan att avslöja identitet)
         │
         ▼
4. Röst skickas till närmaste nod
         │
         ▼
5. Noden validerar och sprider till nätverket
         │
         ▼
6. Alla noder uppdaterar sin lokala kopia
         │
         ▼
7. Webbportalen visar uppdaterad sammanställning
```

---

## Identitet och anti-manipulation

### Problemet
Hur förhindrar vi att någon röstar flera gånger utan att kräva central identifiering?

### Planerade lösningar

**Fas 1 (MVP)**: Enkel rate-limiting
- IP-baserad begränsning
- Browser fingerprinting (etiskt användande)
- "Good enough" för demonstration

**Fas 2**: Pseudonym identitet
- Skapa anonym identitet kopplad till enhet
- En röst per fråga per identitet
- Ingen koppling till verklig person

**Fas 3**: Zero-knowledge bevis
- Bevisa "jag är unik person" utan att avslöja vem
- Integration med existerande system (BankID via proxy?)
- Alternativ: Web of Trust

---

## FOSS-alternativ vi använder

### Hosting & infrastruktur
| Behov | Big Tech | Vårt val |
|-------|----------|----------|
| Kodhosting | GitHub | **Codeberg** (Forgejo) |
| CI/CD | GitHub Actions | **Woodpecker CI** |
| Webbhotell | Vercel/Netlify | **Codeberg Pages** / egen |
| DNS | Cloudflare | **Njalla** eller **1984.is** |
| E-post | Gmail | **Proton** eller **Mailbox.org** |

### Kommunikation
| Behov | Big Tech | Vårt val |
|-------|----------|----------|
| Chat (intern) | Slack/Discord | **Matrix** (Element) |
| Chat (användare) | WhatsApp | **Signal** |
| Videomöten | Zoom/Meet | **Jitsi Meet** |
| Forum | Reddit | **Lemmy** eller **Discourse** |

### Utvecklingsverktyg
| Behov | Big Tech | Vårt val |
|-------|----------|----------|
| Analytics | Google Analytics | **Plausible** / **Umami** |
| Error tracking | Sentry (Microsoft) | **GlitchTip** (self-hosted) |
| CDN | Cloudflare | **BunnyCDN** eller ingen |

---

## Datamodell

### Röst (Vote)
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

### Fråga (Question)
```json
{
  "id": "uuid-v4",
  "title": "Ska Sverige återställa våtmarker?",
  "description": "Fullständig beskrivning...",
  "source_url": "länk till riksdagsomröstning",
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

## Säkerhetsmodell

### Hot vi skyddar mot

| Hot | Motåtgärd |
|-----|-----------|
| DDoS | Distribuerat nätverk, Tor |
| Censur | P2P, inga centrala punkter |
| Röstmanipulation | Kryptografiska bevis |
| Dataintrång | Ingen känslig data lagras |
| Statlig övervakning | Ingen identitetsdata, Tor-stöd |

### Vad vi INTE lagrar
- ❌ Namn eller personnummer
- ❌ IP-adresser (efter validering)
- ❌ Enhetsinformation
- ❌ Något som kan koppla röst till person

---

## Utvecklingsfaser

### Fas 0: Nu (MVP)
```
Vanilla HTML/CSS/JS → GitHub/Codeberg Pages
Ingen backend, endast demo
```

### Fas 1: Fungerande prototyp
```
SolidJS frontend → Egen server
PouchDB lokal → Enkel synk
Manuell datainmatning
```

### Fas 2: Decentraliserad beta
```
Gun.js/OrbitDB P2P-synk
Flera noder
IPFS för statiska resurser
```

### Fas 3: Full decentralisering
```
Zero-knowledge röstning
Tor hidden service
Fullständigt censurresistent
```

---

## Hur du kan bidra

### Backend-utvecklare
- Gun.js/OrbitDB-integration
- P2P-synkronisering
- API-design

### Kryptografi-experter
- Zero-knowledge implementation
- Röstverifiering
- Säkerhetsaudit

### DevOps
- Nod-paketering (Docker, Nix)
- Tor hidden service setup
- Automatiserad deployment

### Säkerhetstestar
- Penetrationstestning
- Hotmodellering
- Sårbarhetssökning

---

## Resurser

### Inspiration
- [Vocdoni](https://vocdoni.io/) - Decentraliserad röstning
- [Snapshot](https://snapshot.org/) - DAO-röstning
- [Secure Scuttlebutt](https://scuttlebutt.nz/) - P2P social
- [Briar](https://briarproject.org/) - P2P messenger

### Teknisk dokumentation
- [Gun.js docs](https://gun.eco/docs/)
- [IPFS docs](https://docs.ipfs.tech/)
- [OrbitDB](https://orbitdb.org/)
- [Semaphore](https://semaphore.appliedzkp.org/)

---

## Frågor?

Öppna en issue med taggen `[ARCHITECTURE]` eller diskutera i Matrix-kanalen.

---

**"Decentralisering är inte ett mål i sig – det är ett verktyg för att göra systemet omöjligt att tysta."**
