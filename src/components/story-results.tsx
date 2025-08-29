'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StoryResultsProps {
  stories: string[];
}

export function StoryResults({ stories }: StoryResultsProps) {
  const handleExport = () => {
    const markdownContent = stories
      .map((story, index) => `## Story Starter ${index + 1}\n\n${story}`)
      .join('\n\n---\n\n');

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'emotioncraft-story-starters.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <h2 className="font-headline text-3xl font-bold text-foreground">Your Story Starters</h2>
        <Button onClick={handleExport} variant="outline" className="shadow-sm transition-transform hover:scale-105">
          <Download className="mr-2 h-4 w-4" />
          Export to Markdown
        </Button>
      </div>
      <div className="grid animate-in fade-in-50 duration-500 gap-8 md:grid-cols-1">
        {stories.map((story, index) => (
          <Card key={index} className="transform-gpu transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Story #{index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-card-foreground">{story}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
