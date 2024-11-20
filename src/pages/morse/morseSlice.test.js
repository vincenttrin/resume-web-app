import { internals } from './morseSlice.js';

import { lettersToMorse } from './morseCode.js';

describe('the findMessage function', () => {
  test('finds no words in an empty string', () => {
    // Relevant words: [none]
    expect(internals.findMessage(
      lettersToMorse(''),
    )).toBe(
      '',
    );
  });
  test('finds a single word in that same single word', () => {
    // Relevant words: ore (───•─••)
    expect(internals.findMessage(
      lettersToMorse('ore'),
    )).toBe(
      'ore',
    );
  });
  test('finds a single word despite earlier letters', () => {
    // Relevant words: ore (───•─••)
    expect(internals.findMessage(
      lettersToMorse('yore'),
    )).toBe(
      'ore',
    );
  });
  test('finds a single word despite later letters', () => {
    // Relevant words: ore (───•─••), tenet (─•─••─)
    expect(internals.findMessage(
      lettersToMorse('orec'),
    )).toBe(
      'ore',
    );
  });
  test('finds a single word despite surrounding dots and dashes', () => {
    // Relevant words: iota (••────•─), ore (───•─••)
    expect(internals.findMessage(
      lettersToMorse('xore'),
    )).toBe(
      'iota',
    );
  });
  test('finds two words in their concatenation', () => {
    // Relevant words: ahoy (•─••••────•──), edit (•─••••─), edit (•─••••─),
    // eider (•••─••••─•), elite (••─••••─•), idea (••─••••─), idea (••─••••─),
    // invest (••─••••─••••─), iota (••────•─), ire (•••─••), ire (•••─••),
    // isle (••••••─•••), reuse (•─••••─••••), selfie (•••••─••••─••••)
    expect(internals.findMessage(
      lettersToMorse('isleahoy'),
    )).toBe(
      'isle ahoy',
    );
  });
  test('finds no message hidden in random string #0', () => {
    // Relevant words: [none]
    expect(internals.findMessage(
      lettersToMorse('rtey'),
    )).toBe(
      '',
    );
  });
  test('finds a 1-word message hidden in random string #1', () => {
    // Relevant words: attar (•───•─•─•), ego (•──•───)
    expect(internals.findMessage(
      lettersToMorse('nqgc'),
    )).toBe(
      'attar',
    );
  });
  test('finds a 1-word message hidden in random string #2', () => {
    // Relevant words: diode (─••••────•••), ode (────•••)
    expect(internals.findMessage(
      lettersToMorse('bwzh'),
    )).toBe(
      'diode',
    );
  });
  test('finds a 1-word message hidden in random string #3', () => {
    // Relevant words: eave (••─•••─•), ire (•••─••), isle (••••••─•••),
    // islet (••••••─•••─)
    expect(internals.findMessage(
      lettersToMorse('birf'),
    )).toBe(
      'islet',
    );
  });
  test('finds a 1-word message hidden in random string #4', () => {
    expect(internals.findMessage(
      lettersToMorse('bptcggyr'),
    )).toBe(
      'segment',
    );
  });
  test('finds a 2-word message hidden in random string #5', () => {
    expect(internals.findMessage(
      lettersToMorse('qathklol'),
    )).toBe(
      'awe vendor',
    );
  });
  test('finds a 2-word message hidden in random string #6', () => {
    expect(internals.findMessage(
      lettersToMorse('nxdafbqh'),
    )).toBe(
      'canine tenuki',
    );
  });
  test('finds a 2-word message hidden in random string #7', () => {
    expect(internals.findMessage(
      lettersToMorse('axcvmxta'),
    )).toBe(
      'mitten sonata',
    );
  });
  test('finds a 3-word message hidden in random string #8', () => {
    expect(internals.findMessage(
      lettersToMorse('pmxjmdst'),
    )).toBe(
      'ego item obit',
    );
  });
  test('finds a 2-word message hidden in random string #9', () => {
    expect(internals.findMessage(
      lettersToMorse('ahfwvdtnwgbcyquu'),
    )).toBe(
      'wigeon detector',
    );
  });
  test('finds a 3-word message hidden in random string #10', () => {
    expect(internals.findMessage(
      lettersToMorse('qhnohijloaznqkuo'),
    )).toBe(
      'edit ageism tenet',
    );
  });
  test('finds a 3-word message hidden in random string #11', () => {
    expect(internals.findMessage(
      lettersToMorse('utxpdzaaqovronvo'),
    )).toBe(
      'yeti zeta goner',
    );
  });
  test('finds a 4-word message hidden in random string #12', () => {
    expect(internals.findMessage(
      lettersToMorse('bgjahrelzbumgjpo'),
    )).toBe(
      'ewe emcee fidget summit',
    );
  });
  test('finds a 4-word message hidden in random string #13', () => {
    expect(internals.findMessage(
      lettersToMorse('hosshqosvahzqvsb'),
    )).toBe(
      'ambient settee menu ire',
    );
  });
  test('finds a 3-word message hidden in random string #14', () => {
    expect(internals.findMessage(
      lettersToMorse('duqhplbsbcsepzpgoeuriqsclroecgus'),
    )).toBe(
      'methane tibia schema',
    );
  });
  test('finds a 3-word message hidden in random string #15', () => {
    expect(internals.findMessage(
      lettersToMorse('vakwfflauqdfewbkktahtyvvzywcudle'),
    )).toBe(
      'miner reload fugue',
    );
  });
  test('finds a 4-word message hidden in random string #16', () => {
    expect(internals.findMessage(
      lettersToMorse('niyslozmabdfbtuqugogrdxsfbmznkaf'),
    )).toBe(
      'item slogan miler dragnet',
    );
  });
  test('finds a 4-word message hidden in random string #17', () => {
    expect(internals.findMessage(
      lettersToMorse('kdsdvyyvddyaecidoujwbbytnraxxmhz'),
    )).toBe(
      'knitter award raga amaze',
    );
  });
  test('finds a 6-word message hidden in random string #18', () => {
    expect(internals.findMessage(
      lettersToMorse('vhwnwetylofpfiunjfezbbawoudobkvl'),
    )).toBe(
      'tepee tsunami tuna ire intonation indent',
    );
  });
  test('finds a 4-word message hidden in random string #19', () => {
    expect(internals.findMessage(
      lettersToMorse('mzfiluaxdtxpbcyvosciwzxrbzzekgjgzaozlqlnirgeqfbjhmngbzkimaceofex'),
    )).toBe(
      'moire marlin gannet ethos',
    );
  });
  test('finds a 4-word message hidden in random string #20', () => {
    expect(internals.findMessage(
      lettersToMorse('kcbxcwmgivkeekyrahfxqllbkiisqikamvexmvwyuqlxvgljrjkzxkicqeighbor'),
    )).toBe(
      'remote signet aye tidier',
    );
  });
  test('finds a 7-word message hidden in random string #21', () => {
    expect(internals.findMessage(
      lettersToMorse('gvtrzftuygnhnhrwlltivyjzicyofryxdudofzgfkcfwzakxheduxiebylrlgqjh'),
    )).toBe(
      'adze kettle donut preview idle tannin remake',
    );
  });
  test('finds a 8-word message hidden in random string #22', () => {
    expect(internals.findMessage(
      lettersToMorse('gwkbeznweevtwtqnzbvzaijgswxepxyuprawnlfhetcuocdubgoimzivekyrtgtv'),
    )).toBe(
      'reuse ewe demo are ewe image ode event',
    );
  });
  test('finds a 9-word message hidden in random string #23', () => {
    expect(internals.findMessage(
      lettersToMorse('xrphmypcwpebijujqgpktxlarxlymhlmqfbntsmqfbacetbhzbkaeujyzzkphdmr'),
    )).toBe(
      'amulet are tenet ambition tureen bonnet edit tenet despair',
    );
  });
});
