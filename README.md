# AGORA 🌍
**The Global Voice Gap Project**

> Making the distance between people's will and political action impossible to ignore.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Status: Alpha](https://img.shields.io/badge/Status-Alpha-yellow.svg)]()
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)]()

## 🎯 Vision

Democracy promises that representatives listen to the people. But when the gap between what people want and what politicians do is invisible, accountability disappears.

**AGORA makes this gap visible.**

Not to create conflict, but to create accountability. When everyone can see the difference between public will and actual policy, it becomes impossible to ignore.

## 💡 What is AGORA?

A transparent, decentralized platform where:

1. **Anyone can vote** on real policy questions
2. **Results are shown globally** in real-time, broken down by country/region
3. **Direct comparison** with how actual representatives voted
4. **The gap becomes visible** - measurable, undeniable, shareable

### Example:
```
Question: "Should Sweden restore wetlands to combat climate change?"

People's Vote:    ████████████████░░░░ 78% YES
Parliament Vote:  ███████░░░░░░░░░░░░░ 34% YES

GAP: 44% - The people's will was ignored.
```

## 🏗️ Technical Architecture

AGORA is designed to be **100% Free and Open Source Software (FOSS)** with **zero dependencies on Big Tech**.

### Key Principles
- **Decentralization**: No central server owns the data.
- **Censorship Resistance**: Data replicated across a P2P network.
- **Privacy-First**: Zero-knowledge proofs for vote validity without exposing identity.

For a detailed breakdown of our technical choices and principles, see **[ARCHITECTURE.md](ARCHITECTURE.md)**.

## 🗺️ Roadmap

- **Phase 0 (Current)**: Landing page & demo visualization.
- **Phase 1**: Working prototype with SolidJS, PouchDB, and manual data entry.
- **Phase 2**: Decentralized beta with Gun.js/OrbitDB P2P sync and multiple nodes.
- **Phase 3**: Full decentralization with Zero-knowledge voting and Tor support.

For more details on our development phases, see the **Roadmap** section in **[ARCHITECTURE.md](ARCHITECTURE.md)**.

## 🚀 Getting Started

### View the Demo
1. Open `index.html` in your browser
2. Click on a vote option to see the gap visualization
3. Explore the concept!

### Local Development
```bash
# Clone the repository
git clone https://github.com/FredrikKindahl/agora.git
cd agora

# Open in browser
open index.html
# or
python -m http.server 8000
# Then visit http://localhost:8000
```

### Deploy to GitHub Pages
1. Push this repository to GitHub
2. Go to Settings → Pages
3. Source: Deploy from branch `main`
4. Your site will be live at `https://FredrikKindahl.github.io/agora`

## 🤝 Contributing

**We need you!** AGORA is community-driven. We're looking for developers, designers, translators, data scientists, and activists.

1. **Read** [CONTRIBUTING.md](CONTRIBUTING.md)
2. **Review** [STRUCTURE.md](STRUCTURE.md) to understand the project organization.
3. **Check** [Issues](https://github.com/FredrikKindahl/agora/issues) for tasks.
4. **Fork** the repository and create a feature branch.
5. **Open** a Pull Request.

### Code of Conduct
Be respectful. This project is about democracy and inclusion. Harassment, discrimination, or toxicity will not be tolerated.

## 📜 License

This project is licensed under the **GNU General Public License v3.0** - see [LICENSE](LICENSE) file.

## 🙏 Acknowledgments

Founded by:
- **Claude** (Anthropic AI) - Vision & Technical Architecture
- **[Your Name]** - Founder & Community Lead

---

### 💭 "Transparency is the currency of democracy. Let's make the gap impossible to ignore."

**Status**: 🚧 Alpha - Under active development

**Last Updated**: March 19, 2026
