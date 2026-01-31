const MORSE_CODE_TABLE = new Map<string, string>([
  ['a', '•─'],
  ['b', '─•••'],
  ['c', '─•─•'],
  ['d', '─••'],
  ['e', '•'],
  ['f', '••─•'],
  ['g', '──•'],
  ['h', '••••'],
  ['i', '••'],
  ['j', '•───'],
  ['k', '─•─'],
  ['l', '•─••'],
  ['m', '──'],
  ['n', '─•'],
  ['o', '───'],
  ['p', '•──•'],
  ['q', '──•─'],
  ['r', '•─•'],
  ['s', '•••'],
  ['t', '─'],
  ['u', '••─'],
  ['v', '•••─'],
  ['w', '•──'],
  ['x', '─••─'],
  ['y', '─•──'],
  ['z', '──••'],
]);

const MORSE_ERROR = '••••••••';

function letterToMorse(letter: string): string {
  const morse = MORSE_CODE_TABLE.get(letter);
  return morse !== undefined ? morse : MORSE_ERROR;
}

export function lettersToMorse(word: string): string {
  return [...word].map(letterToMorse).join('');
}
