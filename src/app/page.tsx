"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import { useSEO } from "@/hooks/useSEO";

async function fetchWords(language: string): Promise<string[]> {
  let fileName = "/word-list.json"; // default Turkish
  if (language === "az") {
    fileName = "/word-list-az.json";
  } else if (language === "es") {
    fileName = "/word-list-es.json";
  }
  const res = await fetch(fileName);
  return res.json();
}

const WORDS_PER_ROW = 6;
const ROWS_ON_SCREEN = 3;
const TEST_DURATION = 60;

export default function Home() {
  const { language, t } = useLanguage();
  useSEO(); // Update SEO meta tags when language changes
  const [wordList, setWordList] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>([]); // infinite word stream
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState<boolean[]>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load word list on mount and when language changes
  useEffect(() => {
    fetchWords(language).then((list) => {
      setWordList(list);
      setWords(
        Array.from(
          { length: 36 },
          () => list[Math.floor(Math.random() * list.length)]
        )
      );
      setCorrect([]);
      setCurrentWordIndex(0);
      setInput("");
      setStarted(false);
      setFinished(false);
      setTimeLeft(TEST_DURATION);
      setWpm(0);
      setCpm(0);
    });
    return () => {
      if (timerId) clearInterval(timerId);
    };
    // eslint-disable-next-line
  }, [language]);

  // Start timer on first input
  useEffect(() => {
    if (started && !finished && !timerId) {
      const id = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setFinished(true);
            clearInterval(id);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      setTimerId(id);
    }
    // eslint-disable-next-line
  }, [started, finished]);

  // Focus input on start
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [started, finished]);

  // Infinite word stream: add more words if needed
  useEffect(() => {
    if (words.length - currentWordIndex < 18 && wordList.length > 0) {
      setWords((prev) => [
        ...prev,
        ...Array.from(
          { length: 18 },
          () => wordList[Math.floor(Math.random() * wordList.length)]
        ),
      ]);
    }
  }, [currentWordIndex, words, wordList]);

  // Handle input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (!started && !finished) setStarted(true);
    if (val.endsWith(" ")) {
      // Check correctness
      const isCorrect = val.trim() === words[currentWordIndex];
      setCorrect((prev) => [...prev, isCorrect]);
      setCurrentWordIndex((idx) => idx + 1);
      setInput("");
    } else {
      setInput(val);
    }
  }

  // Calculate stats on finish
  useEffect(() => {
    if (finished) {
      if (timerId) clearInterval(timerId);
      const correctCount = correct.filter(Boolean).length;
      const charsTyped = correct.reduce(
        (acc, ok, i) => acc + (ok ? words[i].length : 0),
        0
      );
      setWpm(Math.round((correctCount / TEST_DURATION) * 60));
      setCpm(Math.round((charsTyped / TEST_DURATION) * 60));
    }
    // eslint-disable-next-line
  }, [finished]);

  // Restart test
  function restart() {
    if (timerId) clearInterval(timerId);
    if (wordList.length > 0) {
      setWords(
        Array.from(
          { length: 36 },
          () => wordList[Math.floor(Math.random() * wordList.length)]
        )
      );
    }
    setCorrect([]);
    setCurrentWordIndex(0);
    setInput("");
    setStarted(false);
    setFinished(false);
    setTimeLeft(TEST_DURATION);
    setWpm(0);
    setCpm(0);
    setTimerId(null);
    if (inputRef.current) inputRef.current.focus();
  }

  // Calculate which rows to show
  const currentRow = Math.floor(currentWordIndex / WORDS_PER_ROW);
  const firstRowToShow = Math.max(0, currentRow - 1);
  const lastRowToShow = firstRowToShow + ROWS_ON_SCREEN;
  const visibleRows = [];
  for (let row = firstRowToShow; row < lastRowToShow; row++) {
    visibleRows.push(
      words.slice(row * WORDS_PER_ROW, (row + 1) * WORDS_PER_ROW)
    );
  }

  // Render
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Üst Bilgilendirme */}
      <div className="max-w-2xl w-full mb-8 text-center">
        <LanguageSelector />
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          {t.title}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          {t.subtitle}
        </p>
        {/* Son Skorun */}
        <div className="mt-4 mb-2 text-base text-gray-600 dark:text-gray-400">
          <b>{t.lastScore}</b>
          <br />
          {/* Son skorun state ile tutulabilir, örnek placeholder: */}
          <span id="recent-score">{t.noTestYet}</span>
        </div>
      </div>
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-100 dark:text-white">
          {t.title}
        </h1>
        <div className="flex justify-between items-center mb-3 text-lg text-gray-200 dark:text-gray-300">
          <div>
            <span className="font-semibold">{t.cpm}:</span> {cpm} &nbsp;
            <span className="font-semibold">{t.wpm}:</span> {wpm}
          </div>
          <div>
            <span className="font-semibold">{t.timeLeft}:</span> {timeLeft}
          </div>
          <button
            onClick={restart}
            className="text-blue-400 hover:underline font-semibold"
          >
            {t.restart}
          </button>
        </div>
        <div className="border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-900 dark:bg-gray-800 shadow p-8 min-h-[200px] max-w-3xl w-full flex flex-col items-center justify-center mb-4 transition-all">
          {visibleRows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex flex-row flex-nowrap justify-center w-full mb-2 last:mb-0 overflow-hidden"
            >
              {row.map((word, i) => {
                const globalIdx = (firstRowToShow + rowIdx) * WORDS_PER_ROW + i;
                const isCurrent = globalIdx === currentWordIndex;
                const isTyped = globalIdx < currentWordIndex;
                const isCorrect = isTyped ? correct[globalIdx] : null;
                return (
                  <span
                    key={globalIdx}
                    className={
                      "inline-flex items-center justify-center px-6 py-2 rounded-lg text-2xl font-mono transition-all select-none m-1 " +
                      (isCurrent
                        ? "bg-green-500 text-white font-bold shadow"
                        : "bg-transparent") +
                      (isTyped
                        ? isCorrect
                          ? " text-green-400"
                          : " text-red-400 line-through"
                        : !isCurrent
                        ? " text-gray-200"
                        : "")
                    }
                    style={{
                      textAlign: "center",
                      boxSizing: "border-box",
                      minWidth: 0,
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
        <input
          ref={inputRef}
          type="text"
          className="w-full p-4 text-2xl border-2 border-blue-400 dark:border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white mb-2 font-mono"
          placeholder={t.placeholder}
          value={input}
          onChange={handleInput}
          disabled={finished}
          autoFocus
        />
        {finished && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center mt-4">
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
              {t.testCompleted}
            </h2>
            <div className="mb-2">
              {t.cpm}: <span className="font-semibold">{cpm}</span>
            </div>
            <div className="mb-2">
              {t.wpm}: <span className="font-semibold">{wpm}</span>
            </div>
            <div className="mb-2">
              {t.correctWords}:{" "}
              <span className="font-semibold">
                {correct.filter(Boolean).length}
              </span>
            </div>
            <div className="mb-2">
              {t.totalWords}:{" "}
              <span className="font-semibold">{correct.length}</span>
            </div>
            <button
              onClick={restart}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {t.restart}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=Yazma%20Hızı%20Testi%20sonucum:%20DKHS%3A%20${cpm}%2C%20DKS%3A%20${wpm}%20%7C%20https%3A%2F%2Fyazmahizi.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 ml-2 inline-block bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {t.shareResult}
            </a>
          </div>
        )}
      </div>
      {/* Alt Bilgilendirme ve SSS */}
      <div className="max-w-2xl w-full mt-10 mb-4 p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow text-gray-800 dark:text-gray-200 text-base">
        <h2 className="text-xl font-bold mb-3">{t.whyThisTest}</h2>
        <p className="mb-4">{t.whyThisTestContent}</p>
        <h2 className="text-xl font-bold mb-3">{t.turkishSpecific}</h2>
        <p className="mb-4">{t.turkishSpecificContent}</p>
        <h2 className="text-xl font-bold mb-3">{t.ourGoal}</h2>
        <p className="mb-4">{t.ourGoalContent}</p>
        <h2 className="text-xl font-bold mb-3">{t.feedback}</h2>
        <p className="mb-4">{t.feedbackContent}</p>
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center flex flex-col items-center gap-1">
          <span>{t.footer}</span>
          <span>{t.author}</span>
          <a
            href="https://github.com/Solarkadakiadam/yazma-hizi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:underline text-gray-600 dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" />
            </svg>
            solarkadakiadam
          </a>
        </div>
      </div>
    </div>
  );
}
