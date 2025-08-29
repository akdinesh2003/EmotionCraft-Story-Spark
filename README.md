# EmotionCraft Story Spark ✨

Welcome to **EmotionCraft Story Spark**, a creative tool designed to ignite your imagination! This application leverages the power of AI to generate unique and compelling story starters based on your creative choices. Select a mood, genre, character archetype, and setting, and let our AI craft the perfect opening for your next masterpiece.

## 🚀 Features

- **AI-Powered Story Generation**: Get unique story starters complete with a compelling title.
- **Deep Customization**: Choose from a variety of options to guide the AI:
  - **Mood**: Eerie, Hopeful, Melancholy, Joyful, Tense
  - **Genre**: Sci-Fi, Fantasy, Horror, Romance, Thriller
  - **Character Archetype**: Reluctant Hero, Cunning Villain, Tragic Hero, Wise Mentor, Innocent
  - **Setting**: Dystopian City, Enchanted Forest, Space Station, Haunted Mansion, Desert Island
- **Sleek & Modern UI**: A beautiful, intuitive, and dark-themed interface built with Next.js and ShadCN UI.
- **Export Your Creations**: Save your generated stories as a Markdown file.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini models
- **UI**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## 🔑 Getting Your API Key

This project uses Google's Generative AI models through Genkit. To run the application, you need a Google AI API key.

1.  Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to generate your free API key.
2.  Create a new file named `.env` in the root directory of this project.
3.  Inside the `.env` file, add your API key like this:

    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

    Replace `YOUR_API_KEY_HERE` with the key you obtained from Google AI Studio.

## 🏃‍♀️ Running the Project Locally

Follow these steps to get the project up and running on your local machine.

### 1. Install Dependencies

First, install the necessary npm packages:

```bash
npm install
```

### 2. Run the Development Servers

You need to run two separate processes in parallel: the Next.js web application and the Genkit AI flow server.

**Terminal 1: Start the Next.js App**

This command starts the web interface.

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

**Terminal 2: Start the Genkit AI Server**

This command starts the server that handles the AI generation logic.

```bash
npm run genkit:watch
```

This server runs in watch mode, so it will automatically restart if you make changes to the AI flow files.

### 3. Start Creating!

With both servers running, open your browser to [http://localhost:9002](http://localhost:9002). You can now select your desired options and start generating story starters!

### Author

AK DINESH   https://github.com/akdinesh2003
