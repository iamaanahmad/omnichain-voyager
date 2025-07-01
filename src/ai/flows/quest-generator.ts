'use server';
/**
 * @fileOverview A quest generator for OmniChain Voyager.
 *
 * - generateQuest - Generates a new quest for a voyager.
 * - GenerateQuestInput - The input type for the generateQuest function.
 * - GenerateQuestOutput - The return type for the generateQuest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuestInputSchema = z.object({
  name: z.string().describe('The name of the character.'),
  level: z.number().describe('The current level of the character.'),
});
export type GenerateQuestInput = z.infer<typeof GenerateQuestInputSchema>;

const GenerateQuestOutputSchema = z.object({
  quest: z.string().describe('A short, creative quest description for a character in a futuristic blockchain game. Should be one sentence. e.g., "Defeat the rogue AI in the Solana data-caves."'),
});
export type GenerateQuestOutput = z.infer<typeof GenerateQuestOutputSchema>;

export async function generateQuest(input: GenerateQuestInput): Promise<GenerateQuestOutput> {
  return generateQuestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestPrompt',
  input: {schema: GenerateQuestInputSchema},
  output: {schema: GenerateQuestOutputSchema},
  prompt: `You are a quest designer for a futuristic sci-fi game called OmniChain Voyager.
  
  A character named '{{name}}' who is level {{level}} needs a new quest.
  
  Generate a short, creative quest description that fits the theme of bridging between blockchains like Ethereum and Solana. The quest should be a single, compelling sentence. The quest should sound more challenging as the level increases.
  
  Examples:
  - "Recover the lost data packet from the Ethereum ghost-chain."
  - "Hunt the Null-pointer beast in the wilds of Solana."
  - "Escort a sentient NFT through the LayerZero bridge anomaly."`,
});

const generateQuestFlow = ai.defineFlow(
  {
    name: 'generateQuestFlow',
    inputSchema: GenerateQuestInputSchema,
    outputSchema: GenerateQuestOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
