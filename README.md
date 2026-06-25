# Kalajawi

Platform pembelajaran digital interaktif untuk menjelajahi kekayaan budaya Jawa.

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19 SSR)
- **Router:** [TanStack Router](https://tanstack.com/router)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (New York style)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Motion (Framer Motion)](https://motion.dev/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Runtime:** [Nitro](https://nitro.dev/) (Cloudflare Workers)
- **Language:** TypeScript

## Features

- Responsive design (mobile-first)
- Split-screen auth pages with image slider
- Magnetic navbar with slide-reveal animations
- Contact page with card layout
- Dark mode support (coming soon)
- SEO optimized with Open Graph & JSON-LD

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/NandaAddi/kala-jawi.git

# Navigate to project directory
cd kala-jawi

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run build:dev    # Dev-mode build
npm run preview      # Preview production build
npm run lint         # ESLint
npm run format       # Prettier
```

## Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable components
│   ├── Navbar.tsx   # Navigation bar component
│   └── ImageSlider.tsx  # Image carousel
├── lib/             # Utility functions
├── routes/          # Page routes (TanStack Router)
│   ├── __root.tsx   # Root layout
│   ├── index.tsx    # Homepage
│   ├── login.tsx    # Login page
│   ├── register.tsx # Register page
│   ├── forgot-password.tsx  # Forgot password page
│   └── kontak.tsx   # Contact page
├── router.tsx       # Router configuration
├── server.ts        # Server entry point
├── start.ts         # TanStack Start instance
└── styles.css       # Global styles
```

## Deployment

### Cloudflare Workers

```bash
# Build for production
npm run build

# Deploy to Cloudflare
npx wrangler deploy
```

### Other Platforms

This project can also be deployed to:

- Vercel
- Netlify
- Node.js servers
- Docker

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

## License

MIT License

## Contact

For questions or feedback, please visit [kala-jawi.nandaaddiwijaya.my.id/kontak](https://kala-jawi.nandaaddiwijaya.my.id/kontak)
