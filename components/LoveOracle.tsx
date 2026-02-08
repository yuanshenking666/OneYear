
import React, { useState } from 'react';
import { generateLoveMessage, imagineFuture } from '../services/geminiService';

const LoveOracle: React.FC = () => {
  const [mood, setMood] = useState('romantic');
  const [message, setMessage] = useState('');
  const [futureIdea, setFutureIdea] = useState('');
  const [futureResult, setFutureResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateMessage = async () => {
    setLoading(true);
    try {
      const msg = await generateLoveMessage(mood);
      setMessage(msg || '');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleImagineFuture = async () => {
    if (!futureIdea) return;
    setLoading(true);
    try {
      const res = await imagineFuture(futureIdea);
      setFutureResult(res || '');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <section className="bg-white/60 p-6 rounded-3xl shadow-xl border border-pink-100 backdrop-blur-xl">
        <h3 className="text-2xl font-serif text-pink-800 mb-4">✨ The Love Oracle</h3>
        <p className="text-gray-600 mb-6">Let our AI soulmate write a whisper of love for you.</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {['romantic', 'playful', 'nostalgic', 'passionate', 'dreamy'].map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${
                mood === m ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerateMessage}
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white py-3 rounded-2xl font-semibold shadow-lg hover:from-pink-500 hover:to-rose-500 transition-all disabled:opacity-50"
        >
          {loading ? 'Consulting the stars...' : 'Generate Romantic Whisper'}
        </button>

        {message && (
          <div className="mt-8 p-6 bg-white/80 rounded-2xl border-l-4 border-pink-400 shadow-sm animate-fade-in">
            <p className="font-serif italic text-lg leading-relaxed text-gray-800">"{message}"</p>
          </div>
        )}
      </section>

      <section className="bg-white/60 p-6 rounded-3xl shadow-xl border border-pink-100 backdrop-blur-xl">
        <h3 className="text-2xl font-serif text-pink-800 mb-4">🚀 Future Architect</h3>
        <p className="text-gray-600 mb-6">What does our future look like? Give me a hint...</p>
        
        <div className="space-y-4">
          <input
            type="text"
            value={futureIdea}
            onChange={(e) => setFutureIdea(e.target.value)}
            placeholder="e.g., Owning a small bookstore in Paris together"
            className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/50"
          />
          <button
            onClick={handleImagineFuture}
            disabled={loading || !futureIdea}
            className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Building dreams...' : 'Visualize Our Future'}
          </button>
        </div>

        {futureResult && (
          <div className="mt-8 p-6 bg-pink-50/50 rounded-2xl border-t-4 border-pink-400 animate-fade-in">
             <p className="font-serif text-gray-800 leading-relaxed whitespace-pre-wrap">{futureResult}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default LoveOracle;
