/**
 * Korean Romanization Module
 * Implements pronunciation-based romanization following Revised Romanization of Korean
 * with phonological rules for accurate pronunciation reading
 */

export interface Syllable {
  initial: string;    // 초성
  medial: string;     // 중성
  final: string;      // 종성
  original: string;   // Original character
}

// Basic romanization mappings
const INITIAL_CONSONANTS: { [key: string]: string } = {
  'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt',
  'ㄹ': 'l', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp', 'ㅅ': 's',
  'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'j', 'ㅉ': 'jj', 'ㅊ': 'ch',
  'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h'
};

const MEDIAL_VOWELS: { [key: string]: string } = {
  'ㅏ': 'a', 'ㅐ': 'ae', 'ㅑ': 'ya', 'ㅒ': 'yae', 'ㅓ': 'eo',
  'ㅔ': 'e', 'ㅕ': 'yeo', 'ㅖ': 'ye', 'ㅗ': 'o', 'ㅘ': 'wa',
  'ㅙ': 'wae', 'ㅚ': 'oe', 'ㅛ': 'yo', 'ㅜ': 'u', 'ㅝ': 'wo',
  'ㅞ': 'we', 'ㅟ': 'wi', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅢ': 'ui',
  'ㅣ': 'i'
};

const FINAL_CONSONANTS: { [key: string]: string } = {
  'ㄱ': 'k', 'ㄲ': 'k', 'ㄳ': 'k', 'ㄴ': 'n', 'ㄵ': 'n', 'ㄶ': 'n',
  'ㄷ': 't', 'ㄹ': 'l', 'ㄺ': 'k', 'ㄻ': 'm', 'ㄼ': 'l', 'ㄽ': 'l', 'ㄾ': 'l', 'ㄿ': 'p', 'ㅀ': 'l',
  'ㅁ': 'm', 'ㅂ': 'p', 'ㅄ': 'p', 'ㅅ': 't', 'ㅆ': 't', 'ㅇ': 'ng',
  'ㅈ': 't', 'ㅊ': 't', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 't'
};

// Special handling for complex final consonants
const COMPLEX_FINAL_CONSONANTS: { [key: string]: string[] } = {
  'ㅄ': ['ㅂ', 'ㅅ'], // 없어 → ㅂ carries over, ㅅ stays as final
  'ㄶ': ['ㄴ', 'ㅎ'], // 않을래 → ㄴ carries over, ㅎ aspirates next consonant
  'ㄵ': ['ㄴ', 'ㅈ'], // 
  'ㄺ': ['ㄹ', 'ㄱ'], // 
  'ㄻ': ['ㄹ', 'ㅁ'], // 
  'ㄼ': ['ㄹ', 'ㅂ'], // 
  'ㄽ': ['ㄹ', 'ㅅ'], // 
  'ㄾ': ['ㄹ', 'ㅌ'], // 
  'ㄿ': ['ㄹ', 'ㅍ'], // 
  'ㅀ': ['ㄹ', 'ㅎ']  // 
};

/**
 * Decompose a Hangul syllable into its components
 */
export function decomposeSyllable(char: string): Syllable | null {
  if (!char || char.length !== 1) return null;
  
  const code = char.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7AF) return null; // Not Hangul
  
  const base = code - 0xAC00;
  const initialIndex = Math.floor(base / 588);
  const medialIndex = Math.floor((base % 588) / 28);
  const finalIndex = base % 28;
  
  const initialChars = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const medialChars = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
  const finalChars = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  
  return {
    initial: initialChars[initialIndex],
    medial: medialChars[medialIndex],
    final: finalChars[finalIndex],
    original: char
  };
}

/**
 * Apply phonological rules between syllables
 */
export function applyPhonologicalRules(syllables: Syllable[]): Syllable[] {
  if (syllables.length <= 1) return syllables;
  
  const result = [...syllables];
  
  for (let i = 0; i < result.length - 1; i++) {
    const current = result[i];
    const next = result[i + 1];
    
    // 1. ㅎ Deletion and Aspiration - highest priority
    if (current.final === 'ㅎ') {
      if (next.initial === 'ㅇ') {
        // ㅎ + ㅇ (vowel) → delete ㅎ
        current.final = '';
      } else if (next.initial && next.initial !== 'ㅇ') {
        // ㅎ + consonant → aspirate the consonant
        if (next.initial === 'ㄱ') next.initial = 'ㅋ';
        else if (next.initial === 'ㄷ') next.initial = 'ㅌ';
        else if (next.initial === 'ㅂ') next.initial = 'ㅍ';
        else if (next.initial === 'ㅈ') next.initial = 'ㅊ';
        current.final = '';
      }
    }
    
    // Handle aspiration from complex final consonants
    if (current.final && next.initial && next.initial !== 'ㅇ') {
      if (current.final === 'ㅎ') {
        // Aspirate the next consonant
        if (next.initial === 'ㄱ') next.initial = 'ㅋ';
        else if (next.initial === 'ㄷ') next.initial = 'ㅌ';
        else if (next.initial === 'ㅂ') next.initial = 'ㅍ';
        else if (next.initial === 'ㅈ') next.initial = 'ㅊ';
        current.final = '';
      }
    }
    
    // 2. Liaison (Resyllabification) - after ㅎ rules
    if (current.final && next.initial === 'ㅇ' && current.final !== 'ㅇ') {
      // Handle complex final consonants
      if (COMPLEX_FINAL_CONSONANTS[current.final]) {
        const [firstConsonant, secondConsonant] = COMPLEX_FINAL_CONSONANTS[current.final];
        next.initial = firstConsonant;
        current.final = secondConsonant;
      } else {
        // Simple final consonant
        next.initial = current.final;
        current.final = '';
      }
    }
    
    // 3. Nasalization
    if (current.final && (next.initial === 'ㄴ' || next.initial === 'ㅁ')) {
      if (current.final === 'ㄱ') current.final = 'ㅇ';
      else if (current.final === 'ㄷ') current.final = 'ㄴ';
      else if (current.final === 'ㅂ') current.final = 'ㅁ';
    }
    
    // 4. Lateralization
    if (current.final === 'ㄴ' && next.initial === 'ㄹ') {
      // ㄴ + ㄹ → ㄹ + ㄹ
      current.final = 'ㄹ';
      next.initial = 'ㄹ';
    } else if (current.final === 'ㄹ' && next.initial === 'ㄴ') {
      // ㄹ + ㄴ → ㄹ + ㄹ  
      current.final = 'ㄹ';
      next.initial = 'ㄹ';
    }
    
    // 5. Palatalization
    if ((current.final === 'ㄷ' || current.final === 'ㅌ') && 
        next.medial === 'ㅣ') {
      if (current.final === 'ㄷ') current.final = 'ㅈ';
      else if (current.final === 'ㅌ') current.final = 'ㅊ';
    }
    
    // 6. Tensification (경음화)
    if (current.final && ['ㄱ', 'ㄷ', 'ㅂ', 'ㅅ', 'ㅈ'].includes(current.final) &&
        ['ㄱ', 'ㄷ', 'ㅂ', 'ㅅ', 'ㅈ'].includes(next.initial)) {
      // Make the next consonant tense
      if (next.initial === 'ㄱ') next.initial = 'ㄲ';
      else if (next.initial === 'ㄷ') next.initial = 'ㄸ';
      else if (next.initial === 'ㅂ') next.initial = 'ㅃ';
      else if (next.initial === 'ㅅ') next.initial = 'ㅆ';
      else if (next.initial === 'ㅈ') next.initial = 'ㅉ';
    }
  }
  
  return result;
}

/**
 * Romanize a single syllable
 */
export function romanizeSyllable(syllable: Syllable): string {
  let result = '';
  
  // Initial consonant
  if (syllable.initial && syllable.initial !== 'ㅇ') {
    result += INITIAL_CONSONANTS[syllable.initial] || '';
  }
  
  // Medial vowel
  result += MEDIAL_VOWELS[syllable.medial] || '';
  
  // Final consonant
  if (syllable.final) {
    result += FINAL_CONSONANTS[syllable.final] || '';
  }
  
  return result;
}

/**
 * Romanize a word with phonological rules applied
 */
export function romanizeWord(word: string): string {
  if (!word) return '';
  
  // Decompose each character into syllables
  const syllables: Syllable[] = [];
  for (const char of word) {
    const syllable = decomposeSyllable(char);
    if (syllable) {
      syllables.push(syllable);
    }
  }
  
  if (syllables.length === 0) return word; // Not Korean text
  
  // Apply phonological rules
  const processedSyllables = applyPhonologicalRules(syllables);
  
  // Romanize each syllable
  const romanizedSyllables = processedSyllables.map(romanizeSyllable);
  
  // Join with hyphens for syllable separation
  return romanizedSyllables.join('-');
}

/**
 * Main entry point for romanization
 * Handles both Korean and non-Korean text
 */
export function romanize(text: string): string {
  if (!text) return '';
  
  // Split by spaces to handle word boundaries
  const words = text.split(/(\s+)/);
  
  return words.map(word => {
    // Check if word contains Korean characters
    if (/[\uAC00-\uD7AF]/.test(word)) {
      return romanizeWord(word);
    }
    return word; // Return non-Korean text as-is
  }).join('');
}
