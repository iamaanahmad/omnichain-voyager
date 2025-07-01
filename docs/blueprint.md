# **App Name**: OmniChain Voyager

## Core Features:

- NFT Display: Display a character NFT with details like name, level, XP, and current chain (Ethereum or Solana).
- Bridge Simulation: Simulate bridging the NFT from Ethereum to Solana via LayerZero with loading and log updates.
- Training Simulation: Simulate training the character on Solana to increase XP and level, updating the NFT state.
- Return Simulation: Simulate returning the character to Ethereum, reflecting the updated stats.
- Log Display: Display a log console with status updates, creating a simulated blockchain interaction feel. Add timestamps to each log entry.
- Simulate wallet connection: Simulate a connected wallet displaying its shortened public address

## Style Guidelines:

- Primary color: Electric purple (#8A2BE2) for buttons, borders, and highlights, reflecting the futuristic theme.
- Background color: Dark gray (#1a202c) to create a dark, futuristic theme.
- Accent color: Desaturated purple (#9f7aea) for less important visual elements.
- Font: 'Inter' (sans-serif) for a clean and modern UI. Note: currently only Google Fonts are supported.
- Use a centered layout with a maximum width (max-w-4xl) for responsiveness.
- Use simple icons from Lucide React where applicable. Wallet: Wallet icon. Bridge Action: ArrowRightLeft icon. Train Action: Sword or Dumbbell icon. Chain Location: Simple logos for Ethereum and Solana.
- Subtle animations for loading states and transitions between actions. Use Framer Motion or simple Tailwind CSS animations for: A spinner icon that rotates during loading states. A "pulse" animation on the main call-to-action button. A fade-in effect for the log entries as they appear.