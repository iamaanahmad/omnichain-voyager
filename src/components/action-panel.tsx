'use client';

import { Button } from '@/components/ui/button';
import { ArrowRightLeft, Sword, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActionPanelProps = {
  currentChain: 'Ethereum' | 'Solana';
  isBridging: boolean;
  isTraining: boolean;
  isReturning: boolean;
  skillPoints: number;
  onBridge: () => void;
  onTrain: () => void;
  onReturn: () => void;
  onSpendSkillPoint: (stat: 'str' | 'def' | 'agi') => void;
};

export function ActionPanel({
  currentChain,
  isBridging,
  isTraining,
  isReturning,
  skillPoints,
  onBridge,
  onTrain,
  onReturn,
  onSpendSkillPoint,
}: ActionPanelProps) {
  const isEthereum = currentChain === 'Ethereum';
  const isLoading = isBridging || isTraining || isReturning;

  return (
    <div className="p-6 bg-gray-800/50 border border-primary/20 rounded-lg flex flex-col gap-4 shadow-lg shadow-primary/10">
      {skillPoints > 0 && (
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/30 text-center animate-in fade-in duration-500">
          <p className="font-bold text-lg text-primary mb-2 animate-pulse">You have {skillPoints} Skill Point(s)!</p>
          <p className="text-sm text-gray-300 mb-4">Spend it to upgrade your Voyager.</p>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="secondary" onClick={() => onSpendSkillPoint('str')} disabled={isLoading}>+1 STR</Button>
            <Button variant="secondary" onClick={() => onSpendSkillPoint('def')} disabled={isLoading}>+1 DEF</Button>
            <Button variant="secondary" onClick={() => onSpendSkillPoint('agi')} disabled={isLoading}>+1 AGI</Button>
          </div>
        </div>
      )}

      {isEthereum ? (
        <Button
          onClick={onBridge}
          disabled={isLoading}
          className={cn(
            'w-full transition-all duration-300',
            !isLoading && 'animate-pulse-slow shadow-primary/50 shadow-lg'
          )}
        >
          {isBridging ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Bridge to Solana
            </>
          )}
        </Button>
      ) : (
        <div className="flex flex-col gap-4">
            <div className="text-center">
                <p className="text-lg font-semibold text-accent">Current Quest</p>
                <p className="text-gray-400">Defeat the Gravity Slime on Solana.</p>
            </div>
            <Button
                onClick={onTrain}
                disabled={isLoading}
                variant="secondary"
                className={cn(
                'w-full transition-all duration-300',
                !isLoading && 'animate-pulse-slow shadow-accent/50 shadow-lg'
                )}
            >
                {isTraining ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                </>
                ) : (
                <>
                    <Sword className="mr-2 h-4 w-4" />
                    Begin Quest (+50 XP)
                </>
                )}
            </Button>
            <Button
                onClick={onReturn}
                disabled={isLoading}
                className="w-full transition-all duration-300"
            >
                {isReturning ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                </>
                ) : (
                <>
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    Return to Ethereum
                </>
                )}
            </Button>
        </div>
      )}
    </div>
  );
}
