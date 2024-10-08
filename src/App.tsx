import React, { useState } from 'react';
import * as Hangul from 'hangul-js';
import html2pdf from 'html2pdf.js';

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [markedText, setMarkedText] = useState<JSX.Element[]>([]);

  const markRomanization = () => {
    const paragraphs = text.split('\n');
    const markedParagraphs = paragraphs.map((paragraph, pIndex) => {
      const words = paragraph.split(/(\s+)/);
      const markedWords = words.map((word, index) => {
        const cleanWord = word.trim().replace(/[.,!?]$/, '');
        if (Hangul.isHangul(cleanWord)) {
          const syllables = cleanWord.split('');
          return (
            <span key={`${pIndex}-${index}`} className="inline-block text-center mr-1 relative">
              {syllables.map((syllable, syllableIndex) => (
                <span key={syllableIndex} className="inline-block text-center mr-1 relative">
                  <span className="block text-xs text-blue-800">{romanize(syllable)}</span>
                  <span className="block">{syllable}</span>
                </span>
              ))}
            </span>
          );
        }
        return <span key={`${pIndex}-${index}`} className="mr-1">{word}</span>;
      });
      return <p key={pIndex} className="mb-4 leading-loose">{markedWords}</p>;
    });
    setMarkedText(markedParagraphs);
  };

  const exportToPDF = () => {
    const input = document.getElementById('marked-text');
    if (input) {
      const opt = {
        margin: [10, 10, 10, 10], // Top, right, bottom, left margins
        filename: 'korean-romanization.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().from(input).set(opt).save();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Korean Romanization Marker</h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here (Korean and English)..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
          onClick={markRomanization}
        >
          Romanize Korean
        </button>
        <div id="marked-text" className="mt-6 p-4 border border-gray-300 rounded min-h-[100px] text-lg">
          {markedText}
        </div>
        {markedText.length > 0 && (
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center"
            onClick={exportToPDF}
          >
            Export to PDF
          </button>
        )}
      </div>
    </div>
  );
};

function romanize(text: string): string {
  const romanization: { [key: string]: string } = {
    'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt',
    'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp', 'ㅅ': 's',
    'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'j', 'ㅉ': 'jj', 'ㅊ': 'ch',
    'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h',
    'ㅏ': 'a', 'ㅐ': 'ae', 'ㅑ': 'ya', 'ㅒ': 'yae', 'ㅓ': 'eo',
    'ㅔ': 'e', 'ㅕ': 'yeo', 'ㅖ': 'ye', 'ㅗ': 'o', 'ㅘ': 'wa',
    'ㅙ': 'wae', 'ㅚ': 'oe', 'ㅛ': 'yo', 'ㅜ': 'u', 'ㅝ': 'wo',
    'ㅞ': 'we', 'ㅟ': 'wi', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅢ': 'ui',
    'ㅣ': 'i'
  };

  return Hangul.disassemble(text)
    .map((char: string) => romanization[char] || '')
    .join('');
}

export default App;
