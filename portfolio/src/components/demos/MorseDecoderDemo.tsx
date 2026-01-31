'use client';

import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import {
  setCarrierText,
  selectCarrierText,
  selectMorsifiedCarrier,
  selectHiddenMessage,
  selectMorsifiedHiddenMessage,
} from '@/lib/features/morse/morseSlice';

export default function MorseDecoderDemo() {
  const carrierText = useAppSelector(selectCarrierText);
  const morsifiedCarrier = useAppSelector(selectMorsifiedCarrier);
  const hiddenMessage = useAppSelector(selectHiddenMessage);
  const morsifiedHiddenMessage = useAppSelector(selectMorsifiedHiddenMessage);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCarrierText({ text: event.target.value }));
  };

  // Example texts that contain hidden messages
  const examples = [
    { label: 'Try: "Hello World"', text: 'Hello World' },
    { label: 'Try: "The code is secret"', text: 'The code is secret' },
    { label: 'Try: "Find the hidden message"', text: 'Find the hidden message' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lion-blue-900 to-lion-blue-800 text-white">
      {/* Header */}
      <header className="p-4 border-b border-lion-blue-700">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/#portfolio"
            className="flex items-center gap-2 text-lion-gold hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </Link>
          <h1 className="text-xl font-bold">Morse Code Decoder</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-lion-gold mb-2">Hidden Message Finder</h2>
          <p className="text-lion-blue-200">
            Enter text to see its morse code representation and discover hidden messages!
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-lion-blue-800/50 rounded-xl p-6 mb-6">
          <label className="block mb-2">
            <span className="text-lion-gold font-semibold">Carrier Text:</span>
            <input
              type="text"
              value={carrierText}
              onChange={handleChange}
              placeholder="Type something here..."
              className="mt-2 w-full px-4 py-3 bg-lion-blue-700 border border-lion-blue-600 rounded-lg text-white placeholder-lion-blue-400 focus:outline-none focus:ring-2 focus:ring-lion-gold"
            />
          </label>

          {/* Quick Examples */}
          <div className="mt-4 flex flex-wrap gap-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => dispatch(setCarrierText({ text: example.text }))}
                className="px-3 py-1 bg-lion-blue-600 hover:bg-lion-blue-500 rounded-full text-sm transition-colors"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        {/* Morsified Carrier */}
        <div className="bg-lion-blue-800/50 rounded-xl p-6 mb-6">
          <label className="block">
            <span className="text-lion-gold font-semibold">Morse Code (Pause-Free):</span>
            <div className="mt-2 w-full px-4 py-3 bg-lion-blue-900 border border-lion-blue-600 rounded-lg min-h-[60px] font-mono text-lg tracking-widest break-all">
              {morsifiedCarrier || <span className="text-lion-blue-500 italic">Enter text above...</span>}
            </div>
          </label>
        </div>

        {/* Hidden Message */}
        <div className="bg-gradient-to-r from-lion-gold/20 to-yellow-500/20 rounded-xl p-6 mb-6 border border-lion-gold/30">
          <label className="block">
            <span className="text-lion-gold font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Discovered Hidden Message:
            </span>
            <div className="mt-2 w-full px-4 py-3 bg-lion-blue-900 border border-lion-gold/50 rounded-lg min-h-[60px] text-xl font-semibold text-lion-gold">
              {hiddenMessage || <span className="text-lion-blue-500 italic font-normal text-base">No hidden message found yet...</span>}
            </div>
          </label>
        </div>

        {/* Morsified Hidden Message */}
        <div className="bg-lion-blue-800/50 rounded-xl p-6 mb-8">
          <label className="block">
            <span className="text-lion-gold font-semibold">Hidden Message in Morse:</span>
            <div className="mt-2 w-full px-4 py-3 bg-lion-blue-900 border border-lion-blue-600 rounded-lg min-h-[60px] font-mono text-lg tracking-widest break-all">
              {morsifiedHiddenMessage || <span className="text-lion-blue-500 italic">—</span>}
            </div>
          </label>
        </div>

        {/* How It Works */}
        <div className="bg-lion-blue-800/50 rounded-xl p-6">
          <h3 className="text-lion-gold font-bold text-lg mb-4">How It Works</h3>
          <div className="space-y-4 text-lion-blue-100">
            <p>
              This tool converts text into morse code (dots and dashes), then uses dynamic programming 
              to find words hidden within the continuous morse pattern.
            </p>
            <div className="bg-lion-blue-900/50 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">The Algorithm:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Convert each letter to its morse code equivalent</li>
                <li>Concatenate all morse codes without pauses</li>
                <li>Use dynamic programming to find the best word segmentation</li>
                <li>Match substrings against a vocabulary of English words</li>
              </ol>
            </div>
            <div className="flex gap-4 justify-center text-center">
              <div className="bg-lion-blue-700 rounded-lg p-3">
                <div className="text-2xl font-mono">•</div>
                <div className="text-xs text-lion-blue-300">Dot (Dit)</div>
              </div>
              <div className="bg-lion-blue-700 rounded-lg p-3">
                <div className="text-2xl font-mono">─</div>
                <div className="text-xs text-lion-blue-300">Dash (Dah)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-8 text-center text-lion-blue-300 text-sm">
          <p>Built with React, Redux Toolkit, and Dynamic Programming</p>
        </div>
      </main>
    </div>
  );
}
