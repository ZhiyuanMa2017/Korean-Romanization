#!/usr/bin/env node
/**
 * Korean Romanization Test Runner
 * Run all tests and generate a comprehensive report
 */

import { runTests as runMainTests } from './koreanRomanizer.test';
import { runDebugTests } from './debug.test';

console.log('🚀 Korean Romanization Test Suite');
console.log('=' .repeat(60));
console.log('');

// Run main test suite
runMainTests();

console.log('\n' + '='.repeat(60));
console.log('🐛 Debug Session');
console.log('=' .repeat(60));

// Run debug tests
runDebugTests();

console.log('✨ Test session completed!');
