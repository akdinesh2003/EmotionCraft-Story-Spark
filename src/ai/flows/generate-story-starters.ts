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

const SettingSchema = z.enum(['dystopian city', 'enchanted forest', 'space station', 'haunted mansion', 'desert island']);
export type Setting = z.infer<typeof SettingSchema>;

const GenerateStoryStartersInputSchema = z.object({
  mood: MoodSchema.describe('The mood of the story.'),
  genre: GenreSchema.describe('The genre of the story.'),
  characterArchetype: CharacterArchetypeSchema.describe('The character archetype in the story.'),
  setting: SettingSchema.describe('The setting of the story.'),
  numberOfStarters: z
    .number()
    .min(1)
    .max(5)
    .default(3)
    .describe('The number of story starters to generate.'),
});
export type GenerateStoryStartersInput = z.infer<typeof GenerateStoryStartersInputSchema>;

const StoryStarterSchema = z.object({
  title: z.string().describe('A compelling title for the story starter.'),
  story: z.string().describe('The generated story starter paragraph.'),
});
export type StoryStarter = z.infer<typeof StoryStarterSchema>;

const GenerateStoryStartersOutputSchema = z.object({
  storyStarters: z.array(StoryStarterSchema).describe('An array of generated story starters, each with a title and story.'),
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
  prompt: `You are a creative story writer. Given the following mood, genre, character archetype, and setting, generate a compelling story starter. For each story starter, also generate a compelling title.

Mood: {{mood}}
Genre: {{genre}}
Character Archetype: {{characterArchetype}}
Setting: {{setting}}

Each story starter should be unique and engaging. Return {{numberOfStarters}} story starters. Return it as a JSON array of objects, where each object has a "title" and a "story".
`,
});

const generateStoryStartersFlow = ai.defineFlow(
  {
    name: 'generateStoryStartersFlow',
    inputSchema: GenerateStoryStartersInputSchema,
    outputSchema: GenerateStoryStartersOutputSchema,
  },
  async input => {
    const {output} = await storyStarterPrompt(input);
    return output || {storyStarters: []};
  }
);
