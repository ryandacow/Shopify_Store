import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchOceanTraits } from '../lib/fetchOceanTraits';
import { useRouter } from 'next/router';

const traitInfo = {
  Openness: {
    label: "Openness",
    interpretation: "Creative, curious, loves stories or science",
    suggestions: "Storybooks, art kits, science experiment toys"
  },
  Conscientiousness: {
    label: "Conscientiousness",
    interpretation: "Likes routines, task completion, organizing",
    suggestions: "Puzzle books, goal-setting journals, sorting games"
  },
  Extraversion: {
    label: "Extraversion",
    interpretation: "Sociable, energetic, thrives on interaction",
    suggestions: "Group board games, outdoor toys, drama/storytelling kits"
  },
  Agreeable: {
    label: "Agreeableness",
    interpretation: "Empathetic, caring, seeks harmony",
    suggestions: "Books about friendship/empathy, cooperative games"
  },
  Neuroticism: {
    label: "Neuroticism",
    interpretation: "Easily upset or anxious",
    suggestions: "Calming sensory toys, books on emotion regulation, mindfulness kits"
  }
};

export default function PersonalityInput() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const data = await fetchOceanTraits(inputText);
      const topTrait = data.predicted_traits?.[0];
      setResult(traitInfo[topTrait]);

    } catch (error) {
      console.error('Error analyzing text:', error);
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Describe Your Child – KidsTreasures</title>
      </Head>

      <Header />

      <main className="min-h-screen pt-24 px-4 flex flex-col items-center justify-start">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-6 text-stone-800">Describe Your Child</h1>

          <textarea
            rows={6}
            className="w-full border border-gray-300 rounded-lg p-4 shadow-sm bg-white text-stone-800"
            placeholder="E.g., My child is creative, loves asking questions, and enjoys building new things..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !loading && inputText.trim()) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />

          <button
            className="mt-6 bg-stone-800 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition"
            onClick={handleSubmit}
            disabled={loading || inputText.trim() === ''}
          >
            {loading ? 'Analyzing Personality...' : 'Show Insights'}
          </button>

          {loading && (
            <div className="mt-6 text-stone-600 text-sm">
              Warming up... this may take a few seconds on first run.
            </div>
          )}

          {result && (
            <div className="mt-12 bg-white rounded-xl shadow-md p-6 text-left text-stone-800">
              <h2 className="text-xl font-semibold mb-2">Dominant Trait: {result.label}</h2>
              <p className="mb-2"><span className="font-medium">Interpretation:</span> {result.interpretation}</p>
              <p><span className="font-medium">Gift Ideas:</span> {result.suggestions}</p>

              <p className="text-center text-stone-600 mt-6 italic">
                Based on what you shared, we’ve picked out items that match your child’s personality.
              </p>
              <p className="text-center text-stone-700 font-medium">
                Explore handpicked toys and books tailored just for them 🎁
              </p>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => router.push(`/shop?trait=${encodeURIComponent(result.label)}`)}
                  className="bg-stone-800 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition"
                >
                  Continue to Shop
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}