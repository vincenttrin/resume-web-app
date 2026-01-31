import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { lettersToMorse } from './morseCode';
import { VOCABULARY } from './vocabulary';

const NONLETTER = /[^a-z]/gmu;

class Backpointer {
  startIndex: number;
  word: string;
  totalWeight: number;

  constructor(startIndex: number, word: string, totalWeight: number) {
    this.startIndex = startIndex;
    this.word = word;
    this.totalWeight = totalWeight;
  }
}

function extractLetters(text: string): string {
  return text.toLowerCase().replaceAll(NONLETTER, '');
}

function chooseBackpointer(morse: string, backpointers: Backpointer[]): Backpointer {
  const currentIndex = backpointers.length;
  let best = new Backpointer(currentIndex, '', 0);

  for (let i = 0; i < currentIndex; ++i) {
    const substring = morse.substring(i, currentIndex);
    if (VOCABULARY.has(substring)) {
      const candidate = new Backpointer(
        i,
        VOCABULARY.get(substring)!,
        backpointers[i].totalWeight + substring.length
      );
      if (candidate.totalWeight > best.totalWeight) {
        best = candidate;
      }
    }
  }
  return best;
}

function findMessage(morse: string): string {
  const backpointers: Backpointer[] = [new Backpointer(0, '', 0)];

  while (backpointers.length <= morse.length) {
    backpointers.push(chooseBackpointer(morse, backpointers));
  }

  let maxTotalWeight = -Infinity;
  let maxTotalWeightIndex = -1;

  backpointers.forEach((item, index) => {
    if (item.totalWeight > maxTotalWeight) {
      maxTotalWeight = item.totalWeight;
      maxTotalWeightIndex = index;
    }
  });

  if (maxTotalWeight === 0) {
    return '';
  }

  const candidate: string[] = [];
  let currentIndex = maxTotalWeightIndex;
  let subtractIndex = currentIndex - backpointers[currentIndex].startIndex;

  while (maxTotalWeight >= 0) {
    if (backpointers[currentIndex].word.length > 0) {
      candidate.push(backpointers[currentIndex].word);
    }
    maxTotalWeight -= subtractIndex;
    subtractIndex = currentIndex - backpointers[currentIndex].startIndex;
    currentIndex = backpointers[currentIndex].startIndex;
  }

  return candidate.reverse().join(' ').trim();
}

interface MorseState {
  carrierText: string;
  morsifiedCarrier: string;
  hiddenMessage: string;
  morsifiedHiddenMessage: string;
}

const morseSlice = createSlice({
  name: 'morse',
  initialState: {
    carrierText: '',
    morsifiedCarrier: '',
    hiddenMessage: '',
    morsifiedHiddenMessage: '',
  } as MorseState,
  reducers: {
    setCarrierText: (state, action: PayloadAction<{ text: string }>) => {
      const { text } = action.payload;
      state.carrierText = text;
      state.morsifiedCarrier = lettersToMorse(extractLetters(text));
      state.hiddenMessage = findMessage(state.morsifiedCarrier);
      state.morsifiedHiddenMessage = lettersToMorse(extractLetters(state.hiddenMessage));
    },
  },
});

export default morseSlice;

export const { setCarrierText } = morseSlice.actions;

export function selectCarrierText(state: { morse: MorseState }): string {
  return state.morse.carrierText;
}

export function selectMorsifiedCarrier(state: { morse: MorseState }): string {
  return state.morse.morsifiedCarrier;
}

export function selectHiddenMessage(state: { morse: MorseState }): string {
  return state.morse.hiddenMessage;
}

export function selectMorsifiedHiddenMessage(state: { morse: MorseState }): string {
  return state.morse.morsifiedHiddenMessage;
}
