import { StoryForm } from '@/components/story-form';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          EmotionCraft <span className="text-primary">Story Spark</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Ignite your imagination. Select a mood, genre, and character, and let our AI craft the perfect story starter for you.
        </p>
      </div>
      <StoryForm />
    </main>
  );
}
