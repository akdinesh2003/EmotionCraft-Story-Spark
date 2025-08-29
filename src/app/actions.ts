
'use server';

import {
  generateStoryStarters,
  type GenerateStoryStartersInput,
  type Mood,
  type Genre,
  type CharacterArchetype,
} from '@/ai/flows/generate-story-starters';

// This is a type guard to check if a string is a valid Mood
function isMood(value: string): value is Mood {
  return ['eerie', 'hopeful', 'melancholy', 'joyful', 'tense'].includes(value);
}

// This is a type guard to check if a string is a valid Genre
function isGenre(value: string): value is Genre {
    return ['sci-fi', 'fantasy', 'horror', 'romance', 'thriller'].includes(value);
}

// This is a type guard to check if a string is a valid CharacterArchetype
function isCharacterArchetype(value: string): value is CharacterArchetype {
    return ['reluctant hero', 'cunning villain', 'tragic hero', 'wise mentor', 'innocent'].includes(value);
}


export async function generateStoriesAction(input: {
  mood: string;
  genre: string;
  characterArchetype: string;
}) {
  if (!isMood(input.mood) || !isGenre(input.genre) || !isCharacterArchetype(input.characterArchetype)) {
      return { success: false, error: 'Invalid input provided.' };
  }

  const validatedInput: GenerateStoryStartersInput = {
    mood: input.mood,
    genre: input.genre,
    characterArchetype: input.characterArchetype,
    numberOfStarters: 3,
  };

  try {
    const result = await generateStoryStarters(validatedInput);
    if (!result || !result.storyStarters || result.storyStarters.length === 0) {
      return { success: false, error: 'The AI could not generate stories. Please try different options.' };
    }
    return { success: true, stories: result.storyStarters };
  } catch (error) {
    console.error('Error generating story starters:', error);
    return { success: false, error: 'Failed to generate story starters. Please try again later.' };
  }
}
