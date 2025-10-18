/**
 * Korean Romanization Debug Utility
 * Debug script to understand syllable decomposition and rule application
 */

import { decomposeSyllable, applyPhonologicalRules, romanizeSyllable } from '../src/utils/koreanRomanizer';

function debugWord(word: string, expected: string) {
  console.log(`🔍 Debugging: ${word}`);
  console.log('─'.repeat(30));
  
  const syllables = word.split('').map(decomposeSyllable);
  console.log('📝 Before rules:', syllables.map(s => `${s.original}(${s.initial}+${s.medial}+${s.final})`).join(' '));
  
  const processed = applyPhonologicalRules(syllables);
  console.log('⚡ After rules:', processed.map(s => `${s.original}(${s.initial}+${s.medial}+${s.final})`).join(' '));
  
  const result = processed.map(romanizeSyllable).join('-');
  console.log(`📤 Result: ${result}`);
  console.log(`🎯 Expected: ${expected}`);
  console.log(`✅ Match: ${result === expected ? 'YES' : 'NO'}`);
  console.log('');
}

function runDebugTests() {
  console.log('🐛 Korean Romanization Debug Session');
  console.log('=' .repeat(40));

  // Test cases that need debugging
  debugWord('좋아', 'jo-a');
  debugWord('말로만은', 'mal-lo-ma-neun');
  debugWord('화면인데', 'hwa-myeo-nin-de');
  debugWord('들어간', 'deu-leo-gan');
  debugWord('생각에', 'saeng-ga-ge');
  debugWord('창에', 'chang-e');
  debugWord('없어', 'eot-ppeo');
  debugWord('재미없어', 'jae-mi-eot-ppeo');
  debugWord('않을래', 'at-neul-lae');
}

// Export for use in other modules
export { debugWord, runDebugTests };

// Run debug tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runDebugTests();
}