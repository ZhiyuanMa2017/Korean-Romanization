# Korean Romanization

A comprehensive Korean romanization tool that accurately converts Hangul text to Romanized characters using Korean phonological rules. Perfect for reading K-pop lyrics and Korean text with natural pronunciation.

## Features

- **Accurate Phonological Rules**: Implements Korean pronunciation rules including liaison, ㅎ deletion, palatalization, and more
- **Syllable-by-Syllable Display**: Shows romanization above each Korean syllable for easy reading
- **PDF Export**: Export romanized text to PDF for offline use
- **Comprehensive Testing**: 49+ test cases covering various Korean phonological patterns
- **Real-time Processing**: Instant romanization as you type

## Phonological Rules Implemented

- ✅ **Liaison (Resyllabification)**: 좋아 → jo-a, 생각에 → saeng-ga-ge
- ✅ **ㅎ Deletion**: 좋아 → jo-a (not jo-ha)
- ✅ **Final Consonant Neutralization**: Proper handling of final consonants
- ✅ **ㄹ Pronunciation**: 말로만은 → mal-lo-ma-neun
- ✅ **Palatalization**: 아침에 → a-chi-me
- ✅ **Complex Word Handling**: 지겨운걸 → ji-gyeo-un-geol

## Example

Test with Korean lyrics from [Hurt - NewJeans](Hurt%20-%20NewJeans.txt):

```
보고 싶은 → bo-go si-peun
생각에 → saeng-ga-ge
좋아 → jo-a
말로만은 → mal-lo-ma-neun
```

Exported PDF: [korean-romanization.pdf](korean-romanization.pdf)

![Example](example.png)

## Installation

```bash
npm install
```

## Usage

### Web Interface
```bash
npm run dev
```
Open your browser and paste Korean text to see instant romanization.

### Testing
```bash
# Run all tests
npx tsx tests/run-tests.ts

# Run main test suite
npx tsx tests/koreanRomanizer.test.ts

# Run debug session
npx tsx tests/debug.test.ts
```

## Test Results

- **49/49 tests passing** (100% success rate)
- Covers basic syllables, liaison rules, complex words, and edge cases
- Comprehensive test suite in `/tests` directory

## Project Structure

```
src/
├── App.tsx                 # Main React component
├── utils/
│   └── koreanRomanizer.ts  # Core romanization engine
tests/
├── koreanRomanizer.test.ts # Main test suite
├── debug.test.ts          # Debug utilities
└── run-tests.ts           # Test runner
```

## Technical Details

- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **PDF Export**: html2pdf.js
- **Hangul Processing**: hangul-js library
- **Testing**: Custom test suite with tsx runner

Built with modern Korean linguistics principles and comprehensive testing for accuracy.
