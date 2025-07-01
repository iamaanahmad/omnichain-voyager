'use client';

import { useState } from 'react';
import { NftCard } from './nft-card';
import { ActionPanel } from './action-panel';
import { LogConsole, LogEntry } from './log-console';
import { Header } from './header';
import { Input } from './ui/input';
import { Button } from './ui/button';

const XP_TO_LEVEL_UP = 100;
const XP_GAIN = 50;

const initialImageUrl = 'https://placehold.co/600x400.png';
const upgradedImageUrl = 'https://placehold.co/600x400/9f7aea/white.png';

type NftState = {
  name: string;
  level: number;
  xp: number;
  chain: 'Ethereum' | 'Solana';
  imageUrl: string;
  str: number;
  def: number;
  agi: number;
  skillPoints: number;
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
    name: '',
    level: 1,
    xp: 0,
    chain: 'Ethereum',
    imageUrl: initialImageUrl,
    str: 1,
    def: 1,
    agi: 1,
    skillPoints: 0,
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isBridging, setIsBridging] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [isNaming, setIsNaming] = useState(true);
  const [inputName, setInputName] = useState('');

  const addLog = (message: string) => {
    setLogs(prev => [...prev, { timestamp: formatTimestamp(), message }]);
  };

  const handleNameSubmit = () => {
    const trimmedName = inputName.trim();
    if (trimmedName) {
      setNft(prev => ({ ...prev, name: trimmedName }));
      setIsNaming(false);
      addLog(`Voyager '${trimmedName}' created. Welcome!`);
    }
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
    addLog('Quest Started: Defeating the Gravity Slime...');
    setTimeout(() => {
      let newXp = nft.xp + XP_GAIN;
      let newLevel = nft.level;
      let newImageUrl = nft.imageUrl;
      let leveledUp = false;
      let skillPointsGained = 0;

      if (newXp >= XP_TO_LEVEL_UP) {
        newLevel += 1;
        newXp -= XP_TO_LEVEL_UP;
        newImageUrl = upgradedImageUrl;
        leveledUp = true;
        skillPointsGained = 1;
      }
      
      addLog(`✅ Quest Complete! Gained ${XP_GAIN} XP.`);
      if (leveledUp) {
        addLog(`Leveled up to Level ${newLevel}! Character appearance has been upgraded.`);
        addLog(`You have gained 1 Skill Point!`);
      }

      setNft(prev => ({ 
        ...prev, 
        xp: newXp, 
        level: newLevel, 
        imageUrl: newImageUrl,
        skillPoints: prev.skillPoints + skillPointsGained,
      }));
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
  
  const handleSpendSkillPoint = (stat: 'str' | 'def' | 'agi') => {
    if (nft.skillPoints > 0) {
      const statName = { str: 'Strength', def: 'Defense', agi: 'Agility' }[stat];
      addLog(`Skill point spent. ${statName} increased by 1!`);
      setNft(prev => ({
        ...prev,
        [stat]: prev[stat] + 1,
        skillPoints: prev.skillPoints - 1,
      }));
    }
  };

  if (isNaming) {
    return (
      <div className="bg-background min-h-screen text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl font-bold text-primary mb-4 animate-pulse">Name Your Voyager</h1>
          <p className="text-gray-400 mb-8">Every great journey starts with a name. Give your character a unique identity.</p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g., Cypher Knight"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
              className="text-lg h-12"
              autoFocus
            />
            <Button onClick={handleNameSubmit} disabled={!inputName.trim()} className="text-lg h-12">
              Begin
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
              skillPoints={nft.skillPoints}
              onBridge={handleBridge}
              onTrain={handleTrain}
              onReturn={handleReturn}
              onSpendSkillPoint={handleSpendSkillPoint}
            />
            <LogConsole logs={logs} />
          </div>
        </div>
      </main>
    </div>
  );
}
