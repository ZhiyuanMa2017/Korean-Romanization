# Korean Romanization Tests

This directory contains comprehensive tests for the Korean Romanization implementation.

## Files

- `koreanRomanizer.test.ts` - Main test suite with comprehensive test cases
- `debug.test.ts` - Debug utility for understanding syllable processing
- `run-tests.ts` - Test runner script that executes all tests

## Running Tests

### Run all tests:
```bash
npx tsx tests/run-tests.ts
```

### Run main test suite only:
```bash
npx tsx tests/koreanRomanizer.test.ts
```

### Run debug session only:
```bash
npx tsx tests/debug.test.ts
```

## Test Coverage

The test suite covers:

- ✅ Basic syllable romanization
- ✅ Liaison rules (resyllabification)
- ✅ ㅎ deletion and aspiration
- ✅ ㄹ pronunciation rules
- ✅ Palatalization
- ✅ Complex word handling
- ✅ Multiple word phrases

## Current Status

- **Passing**: 50+ test cases covering most Korean phonological rules
- **Known Issues**: 3 complex final consonant cases (ㅄ, ㄶ) need refinement
- **Success Rate**: ~95% accuracy for common Korean words

## Test Results Format

```
🧪 Korean Romanization Test Suite
==================================================
✅ 보고 → bo-go
✅ 좋아 → jo-a
❌ 없어 → eot-ppeo (expected: eop-seo)
...
📊 Results: 50/53 tests passed (94.3%)
```
