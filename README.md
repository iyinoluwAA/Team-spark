# EmotiChat AI - Your AI Companion for Emotional Wellness & Healing

## Video demo of EmotiChat AI
https://youtu.be/obLh5EK1nqw?si=o3Iefi--lRcTwDap

## EmotiChat Website Url
emotichat-ai.vercel.app/

EmotiChat is an AI-driven emotional wellness and healing platform designed to help individuals recognize, reflect, and heal from deep-rooted emotional wounds through personalized conversations. Simply talk or chat with an empathetic AI that listens to your pains and understands you based on your emotional state, helping you remain calm and grounded amidst life's challenges.

## Problem Statement

### Hackathon Challenge: Problem Statement 1 – Peace with Oneself

Emotional distress from unresolved trauma often manifests as repeated patterns that undermine individual well-being and erode community cohesion. Despite growing awareness of trauma's impact, there is a lack of accessible, holistic, and personalized tools that can proactively identify emotional wounds and guide users through healing journeys.

## Our Solution

EmotiChat AI is an AI-driven emotional wellness platform that helps individuals recognize, process, and heal from deep-rooted emotional wounds through a personalized, voice-responsive assistant. The solution empowers users to remain calm and grounded amidst life's challenges by offering:

-   Real-time emotion analysis through voice and text
-   Personalized responses based on emotional state
-   Therapeutic interventions including music therapy and breathing exercises
-   Supportive, non-judgmental conversations

## Features

### Core Features

-   **Voice & Text Chatbot with Emotion Analysis**

    -   Natural conversation with an empathetic AI assistant
    -   Real-time emotion detection from voice inputs
    -   Personalized responses based on emotional state
    -   Visual feedback on detected emotions

-   **Music & Sound Therapy**

    -   Curated audio experiences based on emotional state
    -   Mood-lifting melodies for emotional balance

-   **Guided Breathing & Meditation**

    -   Interactive breathing exercises

-   **Inspirational Quotes**

    -   Personalized mood-lifting affirmations based on emotional state

## How it Works

1. **Emotion Detection**: Our AI analyzes your voice tone and text inputs to identify your emotional state, detecting nuances like anxiety, sadness, anger, and joy.

2. **Personalized Conversation**: Based on your emotional state, EmotiChat engages in supportive conversation designed to help you process your feelings and gain perspective.

3. **Therapeutic Recommendations**: The system offers specific therapeutic interventions matched to your emotional needs, such as calming music for anxiety or energizing content for low mood.

4. **Continuous Learning**: With each interaction, EmotiChat becomes more attuned to your personal emotional patterns and more effective at providing personalized support.

## Tech Stack

### Frontend

-   **Framework**: [Next.js 14](https://nextjs.org),
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
-   **Voice AI Emotion Analysis**: [Hume AI](https://hume.ai/)
-   **LLM (Text to Speech):** [Claude 3.7 Sonnet](https://anthropic.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/),
-   **Validation**: [Zod](https://zod.dev/)

### Backend (In Development)

-   **Language**: Python
-   **Database**: Supabase (PostgreSQL)
-   **API Communication**: gRPC for performance and scalability

## Installation

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Frontend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/iyinoluwAA/Team-spark.git
    cd Team-spark
    ```

2. Install dependencies:

    ```bash
    cd Frontend
    npm install
    ```

3. Set up environment variables:

    ```bash
    cp .env.example .env.local
    ```

    Then edit `.env.local` and add your API keys:
    -NEXT_PUBLIC_APP_URL - Your application URL

    - `HUME_API_KEY` - Your Hume AI API key
    - `HUME_SECRET_KEY` - Your Hume AI secret key
    - `NEXT_PUBLIC_HUME_CONFIG_ID` - Your Hume config ID

4. Start the development server:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Setup (For Phase 2)

1. Navigate to the backend directory:

    ```bash
    cd Backend
    ```

2. Install Python dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Set up environment variables

## Roadmap

-   [ ] Implement Full music therapy integration (phase 1)
-   [ ] Complete breathing & meditation features (phase 1)
-   [ ] User Authentication session persistence fpr personalization (phase 1)
-   [ ] Integration and deployment with SingularityNET marketplace (phase 2)

## Contributing

We welcome contributions to EmotiChat AI! To contribute:

1. Create a new branch
2. Make your changes
3. Submit a pull request

## Team

-   Samuel Danso - Frontend Lead, AI Integration
-   Emmanuel - Backend Developer
-   Musonda - Backend Developer
-   AJ - Project Manager, Fullstack Developer

## Acknowledgements

This project was developed for the SingularityNet AI for Peace Hackathon We would like to thank the organizers for the opportunity to create technology that promotes inner peace and emotional wellness.

## Disclaimer

EmotiChat AI is not a replacement for professional mental health services. If you are experiencing severe emotional distress, please contact a mental health professional or crisis helpline.
