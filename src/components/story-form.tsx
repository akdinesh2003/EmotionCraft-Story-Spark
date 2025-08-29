'use client';

import { useState, useTransition, type ComponentType } from 'react';
import {
  Baby,
  BookOpen,
  Castle,
  Frown,
  Ghost,
  Heart,
  Loader2,
  Rocket,
  Shield,
  Skull,
  Smile,
  Sparkles,
  Sunrise,
  Swords,
  Zap,
  Building2,
  Trees,
  Orbit,
  Home,
  Palmtree,
} from 'lucide-react';

import { type Mood, type Genre, type CharacterArchetype, type Setting, type StoryStarter } from '@/ai/flows/generate-story-starters';
import { generateStoriesAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { StoryResults } from './story-results';

const moods: { name: Mood; icon: ComponentType<{ className?: string }> }[] = [
  { name: 'eerie', icon: Ghost },
  { name: 'hopeful', icon: Sunrise },
  { name: 'melancholy', icon: Frown },
  { name: 'joyful', icon: Smile },
  { name: 'tense', icon: Zap },
];

const genres: { name: Genre; icon: ComponentType<{ className?: string }> }[] = [
  { name: 'sci-fi', icon: Rocket },
  { name: 'fantasy', icon: Castle },
  { name: 'horror', icon: Ghost },
  { name: 'romance', icon: Heart },
  { name: 'thriller', icon: Zap },
];

const archetypes: { name: CharacterArchetype; icon: ComponentType<{ className?: string }> }[] = [
  { name: 'reluctant hero', icon: Shield },
  { name: 'cunning villain', icon: Skull },
  { name: 'tragic hero', icon: Swords },
  { name: 'wise mentor', icon: BookOpen },
  { name: 'innocent', icon: Baby },
];

const settings: { name: Setting; icon: ComponentType<{ className?: string }> }[] = [
  { name: 'dystopian city', icon: Building2 },
  { name: 'enchanted forest', icon: Trees },
  { name: 'space station', icon: Orbit },
  { name: 'haunted mansion', icon: Home },
  { name: 'desert island', icon: Palmtree },
];

interface SelectionGroupProps<T extends string> {
  title: string;
  options: { name: T; icon: ComponentType<{ className?: string }> }[];
  selectedValue: T | null;
  onSelect: (value: T) => void;
}

function SelectionGroup<T extends string>({ title, options, selectedValue, onSelect }: SelectionGroupProps<T>) {
  return (
    <div className="space-y-6">
      <h2 className="text-center font-headline text-3xl font-bold text-foreground">{title}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {options.map(({ name, icon: Icon }) => {
          const isSelected = selectedValue === name;
          return (
            <button
              key={name}
              onClick={() => onSelect(name)}
              className={cn(
                'group flex flex-col items-center justify-center gap-3 rounded-xl border-2 bg-card p-4 text-center shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                isSelected ? 'border-accent shadow-lg shadow-accent/20' : 'border-border'
              )}
              aria-pressed={isSelected}
            >
              <Icon
                className={cn(
                  'h-10 w-10 transition-colors group-hover:text-accent',
                  isSelected ? 'text-accent' : 'text-muted-foreground'
                )}
              />
              <span className="font-semibold capitalize text-card-foreground">{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function StoryForm() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [genre, setGenre] = useState<Genre | null>(null);
  const [characterArchetype, setCharacterArchetype] = useState<CharacterArchetype | null>(null);
  const [setting, setSetting] = useState<Setting | null>(null);
  const [stories, setStories] = useState<StoryStarter[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!mood || !genre || !characterArchetype || !setting) {
      toast({
        variant: 'destructive',
        title: 'Incomplete Selection',
        description: 'Please select a mood, genre, character archetype, and setting.',
      });
      return;
    }

    startTransition(async () => {
      setStories([]);
      const result = await generateStoriesAction({ mood, genre, characterArchetype, setting });
      if (result.success && result.stories) {
        setStories(result.stories);
      } else {
        toast({
          variant: 'destructive',
          title: 'Oh no! Something went wrong.',
          description: result.error,
        });
      }
    });
  };

  const isButtonDisabled = !mood || !genre || !characterArchetype || !setting;

  return (
    <div className="mt-16 space-y-16">
      <div className="space-y-12">
        <SelectionGroup title="1. Choose a Mood" options={moods} selectedValue={mood} onSelect={setMood} />
        <SelectionGroup title="2. Pick a Genre" options={genres} selectedValue={genre} onSelect={setGenre} />
        <SelectionGroup title="3. Choose a Setting" options={settings} selectedValue={setting} onSelect={setSetting} />
        <SelectionGroup
          title="4. Select an Archetype"
          options={archetypes}
          selectedValue={characterArchetype}
          onSelect={setCharacterArchetype}
        />
      </div>

      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={isButtonDisabled || isPending}
          size="lg"
          className="rounded-full px-12 py-8 text-xl font-bold shadow-lg transition-transform duration-200 hover:scale-105 disabled:bg-muted"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Crafting...
            </>
          ) : (
            <>
              <Sparkles className="mr-3 h-6 w-6" />
              Generate Story Starters
            </>
          )}
        </Button>
      </div>

      <div className="min-h-[20rem]">
        {isPending && (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="p-6">
                  <Skeleton className="mb-4 h-6 w-1/2" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        {!isPending && stories.length > 0 && <StoryResults stories={stories} />}
      </div>
    </div>
  );
}
