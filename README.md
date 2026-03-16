<div align="center">

# 🎁 DevWrapped

**Your GitHub Year in Review - Wrapped with Style**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-latest-3ecf8e?style=flat&logo=supabase)](https://supabase.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?style=flat&logo=framer)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Groq AI](https://img.shields.io/badge/Groq-AI-f55036?style=flat)](https://groq.com/)

*Experience your GitHub activity like never before - beautiful animations, AI-powered insights, and shareable year-in-review*

[🚀 Try Demo](https://dev-wrapped.vercel.app) • [🐛 Report Bug](https://github.com/akshadjaiswal/dev-wrapped/issues)

</div>

---

## 🤔 Why This Exists

Every year, Spotify Wrapped makes us excited to share our music journey. But what about our code journey? **DevWrapped** brings that same excitement to developers by transforming your GitHub activity into a stunning, animated year-in-review experience.

- 🆓 **Completely Free** - No paywalls, no premium tiers
- 🔓 **No Login Required** - Just enter a GitHub username or paste your GitHub profile URL
- 🎨 **Beautiful Design** - 14 animated slides with 5 unique themes
- 🤖 **AI-Powered** - Groq generates personalized developer personalities
- 📊 **Accurate Data** - Uses GitHub GraphQL API for precise statistics
- ♿ **Accessible** - Keyboard navigation, focus rings, screen reader labels, reduced motion support
- 🌙 **Dark Mode First** - Designed for developers who code at night
- 📱 **Share Ready** - Perfect for social media, portfolios, and README badges

---

## ✨ Features

### 📊 **Comprehensive GitHub Analytics**
- 🔥 **Total Commits** - Accurate count from GitHub GraphQL API (Jan 1 - Dec 31)
- 📦 **Top Repository** - Your most committed project with language & stars
- 🌟 **Stars Earned** - Total stars across all your repositories
- 🍴 **Forks Created** - Track how others are using your code
- 📝 **Issues & PRs** - Contributions to open source discussions
- 💬 **Code Reviews** - Your impact on team collaboration

### 🎭 **AI-Generated Personality**
Groq AI analyzes your coding patterns to generate:
- 🏷️ **Developer Archetype** - "Code Wizard", "Bug Hunter", "Open Source Champion"
- 📜 **Personality Summary** - Unique description of your coding style
- 🎯 **Coding Philosophy** - What drives your development approach

### 🎨 **5 Stunning Themes**
- 🌌 **Cosmic** - Purple gradients with star particles
- 🌊 **Ocean** - Blue waves with bubble effects
- 🔥 **Sunset** - Warm oranges and reds
- 🌲 **Forest** - Earthy greens with floating leaves
- 🌃 **Midnight** - Deep blues with glowing dots

### 🎬 **14 Interactive Slides**
1. Welcome & Username
2. Total Commits Counter
3. Top Repository Showcase
4. Stars & Forks
5. Issues & PRs
6. Code Reviews
7. Contribution Graph
8. Most Active Day
9. Coding Streak
10. Languages Breakdown
11. Activity Timeline
12. AI Personality Reveal
13. Year Highlights
14. Share & Download

### 🎉 **Particle Animations**
- ❄️ Snowflakes, bubbles, leaves, embers - theme-matched particles
- 🎆 Confetti celebrations on milestone slides
- ✨ Smooth Framer Motion transitions between slides

---

## 🛠️ Tech Stack

| Technology | Purpose | Why We Chose It |
|-----------|---------|----------------|
| **Next.js 16** | React Framework | App router, server components, API routes |
| **TypeScript** | Type Safety | Catch bugs early, better DX |
| **Supabase** | Database & Auth | 24-hour caching, RLS policies |
| **GitHub GraphQL** | Data Source | Accurate full-year commit data |
| **Groq AI** | Personality Gen | Fast LLM inference (Llama 3.1) |
| **Framer Motion** | Animations | Smooth slide transitions |
| **Tailwind CSS** | Styling | Utility-first, responsive design |
| **Zustand** | State Management | Lightweight, simple API |
| **React Confetti** | Celebrations | Fun visual effects |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- GitHub Personal Access Token ([create one](https://github.com/settings/tokens))
- Supabase Account ([free tier](https://supabase.com))
- Groq API Key ([get one](https://console.groq.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/akshadjaiswal/dev-wrapped.git
cd dev-wrapped/app

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### Environment Variables

```env
# GitHub API (create token: https://github.com/settings/tokens)
# Required scopes: repo, read:user
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx

# Supabase (from https://app.supabase.com/project/_/settings/api)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx... # Public - safe to expose
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...    # SECRET - server only!

# Groq AI (from https://console.groq.com/keys)
GROQ_API_KEY=gsk_xxxxxxxxxxxxx
```

### Run Development Server

```bash
npm run dev
# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
app/
├── app/                      # Next.js App Router
│   ├── api/                 # API Routes
│   │   └── analyze/[username]/  # GitHub data fetching
│   ├── generate/[username]/ # Wrap generation page
│   └── layout.tsx           # Root layout
├── components/
│   ├── ui/                  # Reusable UI (Button, Input)
│   ├── wrap/                # Wrap-specific components
│   │   ├── SlideContainer.tsx   # Navigation logic
│   │   ├── slides/             # 14 individual slides
│   │   ├── ThemeProvider.tsx   # Theme system
│   │   └── particles/          # Animation components
│   └── WrapDisplay.tsx      # Main wrap orchestrator
├── lib/
│   ├── services/
│   │   ├── github.ts           # REST API integration
│   │   ├── github-graphql.ts   # GraphQL queries
│   │   └── groq.ts             # AI personality generation
│   ├── utils/
│   │   ├── calculations.ts     # Stats processing
│   │   └── supabase.ts         # Database client
│   └── types/                  # TypeScript definitions
├── my_docs/                 # Comprehensive documentation
│   ├── claude.md           # AI assistant quick start
│   ├── ARCHITECTURE.md     # System design
│   ├── DATA-FLOW.md        # Pipeline documentation
│   └── ...                 # 6 more reference docs
└── public/                 # Static assets
```

---

## 🗺️ Roadmap

- [ ] **Comparison Mode** - Compare two users side-by-side
- [ ] **Team Wraps** - Generate wraps for entire organizations
- [ ] **Historical Data** - View wraps from previous years
- [ ] **Custom Date Ranges** - Generate wraps for any time period
- [ ] **More Themes** - Retro, Neon, Minimalist, Glassmorphism
- [ ] **Export Options** - PDF, Video, High-res images
- [ ] **Embeddable Widgets** - Add DevWrapped badge to your README
- [ ] **Multi-platform** - GitLab, Bitbucket support

---

## 🤝 Contributing

Contributions are welcome! Please check out our [issues](https://github.com/akshadjaiswal/dev-wrapped/issues) or submit a PR.

### Development Workflow

```bash
# 1. Create a feature branch
git checkout -b feature/amazing-feature

# 2. Make your changes
# See my_docs/ARCHITECTURE.md for code structure

# 3. Test locally
npm run dev
npm run build  # Ensure production build works

# 4. Submit PR
# Include screenshots for UI changes
```

---

## 👨‍💻 Author

**Akshad Jaiswal**

- 🐙 GitHub: [@akshadjaiswal](https://github.com/akshadjaiswal)
- 🐦 Twitter: [@akshad_999](https://twitter.com/akshad_999)
- 💼 LinkedIn: [Akshad Jaiswal](https://linkedin.com/in/akshadsantoshjaiswal)

---

## 🙏 Acknowledgments

- [GitHub GraphQL API](https://docs.github.com/en/graphql) - Accurate contribution data
- [Groq](https://groq.com) - Lightning-fast AI inference
- [Supabase](https://supabase.com) - Excellent developer experience
- [Framer Motion](https://www.framer.com/motion/) - Smooth animations
- [Next.js](https://nextjs.org) - Amazing React framework

---

<div align="center">

**Made with ❤️ by developers, for developers**

⭐ **Star this repo** if DevWrapped made you smile!

[🚀 Try DevWrapped](https://dev-wrapped.vercel.app) •[🐛 Report Issue](https://github.com/akshadjaiswal/dev-wrapped/issues)

</div>
