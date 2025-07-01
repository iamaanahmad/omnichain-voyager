'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef } from 'react';

export type LogEntry = {
  timestamp: string;
  message: string;
};

type LogConsoleProps = {
  logs: LogEntry[];
};

export function LogConsole({ logs }: LogConsoleProps) {
  const endOfLogsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfLogsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <Card className="bg-black/50 border-primary/20 text-white flex flex-col h-full min-h-[300px] shadow-lg shadow-primary/10">
      <CardHeader>
        <CardTitle className="text-lg text-primary">Log Console</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex-1 overflow-y-auto">
        <div className="space-y-2 font-mono text-sm h-full">
            {logs.map((log, index) => (
              <div key={index} className="flex gap-4 animate-in fade-in duration-500">
                <span className="text-gray-500 flex-shrink-0">{log.timestamp}</span>
                <p className="text-gray-300 break-words">{log.message}</p>
              </div>
            ))}
            {logs.length === 0 && (
                <p className="text-gray-500">Awaiting actions...</p>
            )}
            <div ref={endOfLogsRef} />
        </div>
      </CardContent>
    </Card>
  );
}
