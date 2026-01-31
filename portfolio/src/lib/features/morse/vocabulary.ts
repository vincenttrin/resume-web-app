import { lettersToMorse } from './morseCode';

// Common English words for vocabulary - a subset for the demo
const WORDS = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it',
  'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this',
  'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
  'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so',
  'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when',
  'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people',
  'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than',
  'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back',
  'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even',
  'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is',
  'hello', 'world', 'code', 'morse', 'hidden', 'message', 'secret', 'decode', 'encode',
  'signal', 'radio', 'beep', 'dash', 'dot', 'short', 'long', 'pause', 'letter', 'word',
  'text', 'find', 'search', 'discover', 'reveal', 'puzzle', 'solve', 'clue', 'hint',
  'help', 'test', 'demo', 'example', 'sample', 'try', 'again', 'start', 'stop', 'end',
];

export const VOCABULARY = new Map<string, string>(
  WORDS.map((word) => [lettersToMorse(word), word])
);
