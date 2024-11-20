import { createSlice } from '@reduxjs/toolkit';

import { lettersToMorse } from './morseCode.js';
import { VOCABULARY } from './vocabulary.js';

const NONLETTER = /[^a-z]/umg;

class Backpointer {
  constructor(startIndex, word, totalWeight) {
    this.startIndex = startIndex;
    this.word = word;
    this.totalWeight = totalWeight;
  }
}

function extractLetters(text) {
  return text.toLowerCase().replaceAll(NONLETTER, '');
}

function chooseBackpointer(morse, backpointers){
  const currentIndex = backpointers.length;
  let best = new Backpointer(
    currentIndex,
    '',
    0,
  );
  for (let i = 0; i < currentIndex; ++i){
    const substring = morse.substring(i, currentIndex);
    if (VOCABULARY.has(substring)){
      const candidate = new Backpointer(
        i,
        VOCABULARY.get(substring),
        backpointers[i].totalWeight + substring.length,
      );
      if (candidate.totalWeight > best.totalWeight) {
        best = candidate;
      }
    }
  }
  return best;
}

function findMessage(morse) {
  const backpointers = [new Backpointer(undefined, 0, 0)];
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
  if (maxTotalWeight === 0){
    return '';
  }
  const candidate = [];
  let currentIndex = maxTotalWeightIndex;
  let subtactIndex = currentIndex - backpointers[currentIndex].startIndex;
  while (maxTotalWeight >= 0) {
    if (backpointers[currentIndex].word.length > 0 && backpointers[currentIndex].word !== 0){
      candidate.push(backpointers[currentIndex].word);
    }
    maxTotalWeight -= subtactIndex;
    subtactIndex = currentIndex - backpointers[currentIndex].startIndex;
    currentIndex = backpointers[currentIndex].startIndex;
  }
  return candidate.reverse().join(' ').trim();
}

const morseSlice = createSlice({
  name: 'morse',
  initialState: {
    carrierText: '',
    morsifiedCarrier: '',
    hiddenMessage: '',
    morsifiedHiddenMessage: '',
  },
  reducers: {
    setCarrierText: (state, action) => {
      const {
        text,
      } = action.payload;
      state.carrierText = text;
      state.morsifiedCarrier = lettersToMorse(extractLetters(text));
      state.hiddenMessage = findMessage(state.morsifiedCarrier);
      state.morsifiedHiddenMessage = lettersToMorse(extractLetters(state.hiddenMessage));
    },
  },
});
export default morseSlice;

export const {
  setCarrierText,
} = morseSlice.actions;

export function selectCarrierText(state) {
  return state.morse.carrierText;
}

export function selectMorsifiedCarrier(state) {
  return state.morse.morsifiedCarrier;
}

export function selectHiddenMessage(state) {
  return state.morse.hiddenMessage;
}

export function selectMorsifiedHiddenMessage(state) {
  return state.morse.morsifiedHiddenMessage;
}

export const internals = {
  findMessage,
};
