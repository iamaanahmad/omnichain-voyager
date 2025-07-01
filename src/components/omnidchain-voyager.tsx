'use client';

import { useState } from 'react';
import { NftCard } from './nft-card';
import { ActionPanel } from './action-panel';
import { LogConsole, LogEntry } from './log-console';
import { Header } from './header';

const XP_TO_LEVEL_UP = 100;
const XP_GAIN = 50;

type NftState = {
  name: string;
  level: number;
  xp: number;
  chain: 'Ethereum' | 'Solana';
  imageUrl: string;
};

function formatTimestamp(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function OmniChainVoyager() {
  const [nft, setNft] = useState<NftState>({
    name: 'Cypher Knight',
    level: 1,
    xp: 0,
    chain: 'Ethereum',
    imageUrl: 'https://placehold.co/600x400.png',
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isBridging, setIsBridging] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, { timestamp: formatTimestamp(), message }]);
  };

  const handleBridge = () => {
    setIsBridging(true);
    addLog('Initiating bridge from Ethereum to Solana...');
    setTimeout(() => {
      addLog('LayerZero: Verifying transaction...');
    }, 2000);
    setTimeout(() => {
      addLog('Success! Character arrived on Solana.');
      setNft(prev => ({ ...prev, chain: 'Solana' }));
      setIsBridging(false);
    }, 4000);
  };

  const handleTrain = () => {
    setIsTraining(true);
    addLog('Training initiated on Solana...');
    setTimeout(() => {
      let newXp = nft.xp + XP_GAIN;
      let newLevel = nft.level;
      let logMessage = `Training complete. Gained ${XP_GAIN} XP.`;

      if (newXp >= XP_TO_LEVEL_UP) {
        newLevel += 1;
        newXp -= XP_TO_LEVEL_UP;
        logMessage += ` Leveled up to Level ${newLevel}!`;
      }
      addLog(logMessage);
      setNft(prev => ({ ...prev, xp: newXp, level: newLevel }));
      setIsTraining(false);
    }, 3000);
  };

  const handleReturn = () => {
    setIsReturning(true);
    addLog('Initiating return bridge from Solana to Ethereum...');
    setTimeout(() => {
      addLog('LayerZero: Verifying transaction...');
    }, 2000);
    setTimeout(() => {
      addLog('Success! Character returned to Ethereum with updated stats.');
      setNft(prev => ({ ...prev, chain: 'Ethereum' }));
      setIsReturning(false);
    }, 4000);
  };
  
  return (
    <div className="bg-background min-h-screen text-white">
      <Header />
      <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <NftCard {...nft} />
          <div className="space-y-8">
            <ActionPanel
              currentChain={nft.chain}
              isBridging={isBridging}
              isTraining={isTraining}
              isReturning={isReturning}
              onBridge={handleBridge}
              onTrain={handleTrain}
              onReturn={handleReturn}
            />
            <LogConsole logs={logs} />
          </div>
        </div>
      </main>
    </div>
  );
}
