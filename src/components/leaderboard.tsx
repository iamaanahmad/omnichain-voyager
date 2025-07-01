import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type LeaderboardProps = {
  voyagerName: string;
  voyagerLevel: number;
};

const topVoyagers = [
  { name: 'Shadow Striker', level: 15 },
  { name: 'Nova Warden', level: 12 },
];

export function Leaderboard({ voyagerName, voyagerLevel }: LeaderboardProps) {
  return (
    <Card className="bg-black/50 border-primary/20 text-white shadow-lg shadow-primary/10">
      <CardHeader>
        <CardTitle className="text-lg text-primary">Top Voyagers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {topVoyagers.map((voyager, index) => (
          <div key={voyager.name} className="flex justify-between items-center text-sm p-2">
            <p className="font-semibold">
              <span className="inline-block w-6 text-left">{index + 1}.</span>
              {voyager.name}
            </p>
            <p className="text-gray-400">Level {voyager.level}</p>
          </div>
        ))}
         <div className="flex justify-between items-center text-sm p-2 rounded-md bg-primary/20">
            <p className="font-semibold">
              <span className="inline-block w-6 text-left">3.</span>
              {voyagerName}
            </p>
            <p className="text-gray-400">Level {voyagerLevel}</p>
          </div>
      </CardContent>
    </Card>
  );
}
