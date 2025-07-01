import { Wallet } from 'lucide-react';

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b border-primary/20 bg-background/30 backdrop-blur-sm sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-white">OmniChain Voyager</h1>
      <div className="flex items-center gap-2 text-sm text-gray-300 bg-gray-800/50 px-3 py-2 rounded-lg border border-primary/20">
        <Wallet className="w-5 h-5 text-primary" />
        <span>0x12...aBcd</span>
      </div>
    </header>
  );
}
