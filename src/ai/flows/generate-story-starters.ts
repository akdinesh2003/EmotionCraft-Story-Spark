'use server';
/**
 * @fileOverview Story starter generation flow.
 *
 * - generateStoryStarters - A function that generates multiple story starters based on the selected mood, genre, and character archetype.
 * - GenerateStoryStartersInput - The input type for the generateStoryStarters function.
 * - GenerateStoryStartersOutput - The return type for the generateStoryStarters function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoodSchema = z.enum(['eerie', 'hopeful', 'melancholy', 'joyful', 'tense']);
export type Mood = z.infer<typeof MoodSchema>;

const GenreSchema = z.enum(['sci-fi', 'fantasy', 'horror', 'romance', 'thriller']);
export type Genre = z.infer<typeof GenreSchema>;

const CharacterArchetypeSchema = z.enum([
  'reluctant hero',
  'cunning villain',
  'tragic hero',
  'wise mentor',
  'innocent',
]);
export type CharacterArchetype = z.infer<typeof CharacterArchetypeSchema>;

const GenerateStoryStartersInputSchema = z.object({
  mood: MoodSchema.describe('The mood of the story.'),
  genre: GenreSchema.describe('The genre of the story.'),
  characterArchetype: CharacterArchetypeSchema.describe('The character archetype in the story.'),
  numberOfStarters: z
    .number()
    .min(1)
    .max(5)
    .default(3)
    .describe('The number of story starters to generate.'),
});
export type GenerateStoryStartersInput = z.infer<typeof GenerateStoryStartersInputSchema>;

const GenerateStoryStartersOutputSchema = z.object({
  storyStarters: z.array(z.string()).describe('An array of generated story starters.'),
});
export type GenerateStoryStartersOutput = z.infer<typeof GenerateStoryStartersOutputSchema>;

export async function generateStoryStarters(
  input: GenerateStoryStartersInput
): Promise<GenerateStoryStartersOutput> {
  return generateStoryStartersFlow(input);
}

const storyStarterPrompt = ai.definePrompt({
  name: 'storyStarterPrompt',
  input: {schema: GenerateStoryStartersInputSchema},
  output: {schema: GenerateStoryStartersOutputSchema},
  prompt: `You are a creative story writer. Given the following mood, genre, and character archetype, generate a compelling story starter.

Mood: {{mood}}
Genre: {{genre}}
Character Archetype: {{characterArchetype}}

Each story starter should be unique and engaging. Return {{numberOfStarters}} story starters. Return it as JSON array of strings.
`,
});

const generateStoryStartersFlow = ai.defineFlow(
  {
    name: 'generateStoryStartersFlow',
    inputSchema: GenerateStoryStartersInputSchema,
    outputSchema: GenerateStoryStartersOutputSchema,
  },
  async input => {
    const numberOfStarters = input.numberOfStarters;
    const storyStarters: string[] = [];
    for (let i = 0; i < numberOfStarters; i++) {
      const {output} = await storyStarterPrompt(input);
      if (output?.storyStarters && output.storyStarters.length > 0) {
        storyStarters.push(output.storyStarters[0]);
      }
    }
    return {storyStarters};
  }
);
