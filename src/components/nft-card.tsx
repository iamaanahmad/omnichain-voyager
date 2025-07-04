import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { EthereumIcon } from './icons/ethereum';
import { SolanaIcon } from './icons/solana';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type NftCardProps = {
  name: string;
  level: number;
  xp: number;
  chain: 'Ethereum' | 'Solana';
  imageUrl: string;
  str: number;
  def: number;
  agi: number;
  justLeveledUp?: boolean;
};

const ChainDisplay = ({ chain }: { chain: 'Ethereum' | 'Solana' }) => (
  <div className="flex items-center gap-2 bg-gray-900/50 py-1 px-3 rounded-full border border-primary/20">
    {chain === 'Ethereum' ? <EthereumIcon className="w-5 h-5 text-gray-400" /> : <SolanaIcon className="w-5 h-5 text-accent" />}
    <span className="text-md font-semibold">{chain}</span>
  </div>
);

export function NftCard({ name, level, xp, chain, imageUrl, str, def, agi, justLeveledUp }: NftCardProps) {
  const xpToNextLevel = 100;
  return (
    <Card className="bg-gray-800/50 border-primary/20 text-white w-full overflow-hidden shadow-lg shadow-primary/10">
      <CardHeader className="p-0">
        <div className="relative h-64 w-full">
          <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" className="bg-gray-900" data-ai-hint={level > 1 ? "upgraded character" : "futuristic character"} />
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-3xl font-bold">{name}</CardTitle>
                <CardDescription className={cn("text-accent", justLeveledUp && "animate-level-up")}>Level {level}</CardDescription>
            </div>
            <ChainDisplay chain={chain} />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Experience</span>
            <span>{xp} / {xpToNextLevel} XP</span>
          </div>
          <Progress value={(xp / xpToNextLevel) * 100} className="h-4 bg-muted [&>div]:bg-accent" />
        </div>

        <Separator className="my-4 bg-primary/20" />

        <div className="grid grid-cols-3 gap-4 text-center">
            <div>
                <p className="text-sm text-gray-400 font-bold tracking-widest">STR</p>
                <p className="text-2xl font-bold text-primary">{str}</p>
            </div>
            <div>
                <p className="text-sm text-gray-400 font-bold tracking-widest">DEF</p>
                <p className="text-2xl font-bold text-primary">{def}</p>
            </div>
            <div>
                <p className="text-sm text-gray-400 font-bold tracking-widest">AGI</p>
                <p className="text-2xl font-bold text-primary">{agi}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
