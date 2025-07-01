'use client';

import { Button } from '@/components/ui/button';
import { ArrowRightLeft, Sword, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActionPanelProps = {
  currentChain: 'Ethereum' | 'Solana';
  isBridging: boolean;
  isTraining: boolean;
  isReturning: boolean;
  onBridge: () => void;
  onTrain: () => void;
  onReturn: () => void;
};

export function ActionPanel({
  currentChain,
  isBridging,
  isTraining,
  isReturning,
  onBridge,
  onTrain,
  onReturn,
}: ActionPanelProps) {
  const isEthereum = currentChain === 'Ethereum';
  const isLoading = isBridging || isTraining || isReturning;

  return (
    <div className="p-6 bg-gray-800/50 border border-primary/20 rounded-lg flex flex-col sm:flex-row gap-4 justify-around shadow-lg shadow-primary/10">
      <Button
        onClick={onBridge}
        disabled={isLoading || !isEthereum}
        className={cn(
          'w-full sm:w-auto flex-1 transition-all duration-300',
          isEthereum && !isLoading && 'animate-pulse-slow shadow-primary/50 shadow-lg'
        )}
      >
        {isBridging ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <ArrowRightLeft className="mr-2 h-4 w-4" />
        )}
        Bridge to Solana
      </Button>
      <Button
        onClick={onTrain}
        disabled={isLoading || isEthereum}
        variant="secondary"
        className={cn(
          'w-full sm:w-auto flex-1 transition-all duration-300',
          !isEthereum && !isLoading && 'animate-pulse-slow shadow-accent/50 shadow-lg'
        )}
      >
        {isTraining ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sword className="mr-2 h-4 w-4" />
        )}
        Train on Solana
      </Button>
      <Button
        onClick={onReturn}
        disabled={isLoading || isEthereum}
        className="w-full sm:w-auto flex-1 transition-all duration-300"
      >
        {isReturning ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <ArrowRightLeft className="mr-2 h-4 w-4" />
        )}
        Return to Ethereum
      </Button>
    </div>
  );
}
