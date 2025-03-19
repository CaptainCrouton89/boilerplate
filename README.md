# DevBounty - Next.js Boilerplate Template

A modern, responsive boilerplate for creating code-focused freelance platforms using Next.js, Shadcn UI, and Tailwind CSS.

## Features

- 🚀 Built with Next.js App Router
- 🎨 Beautifully styled with Tailwind CSS
- 🧩 Component-based architecture with Shadcn UI
- 🔒 Authentication with Supabase
- 🌓 Dark mode support
- ✨ Smooth animations with Framer Motion and GSAP
- 📱 Fully responsive design
- 🧠 TypeScript for type safety

## Getting Started

First, install the dependencies:

```bash
# Recommended
pnpm install
# or
npm install
# or
yarn install
```

Then, run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js application routes and layouts
- `components/` - Reusable UI components
  - `animations/` - Animation components using Framer Motion and GSAP
  - `ui/` - Shadcn UI components
- `lib/` - Utility functions and shared types
- `public/` - Static assets
- `utils/` - Helper functions
- `supabase/` - Supabase client configurations

## Customization

### Styling

This template uses Tailwind CSS for styling. You can customize the theme in your tailwind configuration or directly in the components.

### Components

All UI components are built with Shadcn and can be customized. To add more components:

```bash
pnpm dlx shadcn@latest add button
```

### Authentication

This template uses Supabase for authentication. Configure your Supabase credentials in the `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Deployment

Deploy this template to Vercel, Netlify, or any other hosting provider that supports Next.js applications.

```bash
pnpm build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/)
- [Supabase](https://supabase.com/)
- [Lucide Icons](https://lucide.dev/)
