import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const performDraw = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedNumber(null);
    setShowConfetti(false);

    // Numbers with higher chance
    const specialNumbers = [59, 60, 49, 66, 41, 43, 25, 10, 47, 50, 67, 54, 62];

    // Simulate spinning through numbers
    let iterations = 0;
    const maxIterations = 40;
    const spinInterval = setInterval(() => {
      let randomNumber;
      
      // 60% chance to pick from special numbers
      if (Math.random() < 0.6) {
        randomNumber = specialNumbers[Math.floor(Math.random() * specialNumbers.length)];
      } else {
        // 40% chance to pick any number from 1-100
        randomNumber = Math.floor(Math.random() * 100) + 1;
      }
      
      setSelectedNumber(randomNumber);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }, 80);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
        />
      )}

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="text-6xl">✨</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
            Sorteio
          </h1>
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Festa de 15 Anos
          </h2>
          <p className="text-2xl font-semibold text-rose-600 mb-2">Lara</p>
          <p className="text-lg text-gray-600">
            Descubra o número sorteado
          </p>
        </div>

        {/* Main Display Card */}
        <Card className="bg-white/80 backdrop-blur-xl shadow-2xl p-12 mb-8 border border-white/50">
          {/* Result Display */}
          <div className="min-h-64 flex items-center justify-center mb-12">
            {selectedNumber ? (
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <p className="text-sm font-semibold text-rose-500 uppercase tracking-widest mb-6">
                  Número Sorteado
                </p>
                <p className="text-9xl md:text-10xl font-bold text-transparent bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text mb-8">
                  {selectedNumber}
                </p>
                <div className="flex justify-center gap-3">
                  <span className="text-5xl">✨</span>
                  <span className="text-5xl">🎀</span>
                  <span className="text-5xl">✨</span>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-2xl text-gray-400 font-light">
                  Clique no botão para começar o sorteio
                </p>
              </div>
            )}
          </div>

          {/* Draw Button */}
          <div className="flex justify-center mb-8">
            <Button
              onClick={performDraw}
              disabled={isSpinning}
              className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg transform transition hover:scale-105 disabled:scale-100 disabled:opacity-70"
            >
              {isSpinning ? "SORTEANDO..." : "SORTEAR NÚMERO"}
            </Button>
          </div>

          {/* Quick stats */}
          <div className="text-center text-sm text-gray-600">
            <p>Números disponíveis: <span className="font-semibold text-rose-600">1 a 100</span></p>
          </div>
        </Card>

        {/* Numbers Grid */}
        <Card className="bg-white/80 backdrop-blur-xl shadow-2xl p-8 border border-white/50">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Números (1 a 100)
          </h3>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className={`p-3 rounded-lg font-semibold text-center text-sm transition-all duration-300 ${
                  selectedNumber === num
                    ? "bg-gradient-to-br from-rose-500 to-pink-500 text-white scale-110 shadow-lg"
                    : "bg-gradient-to-br from-rose-50 to-pink-50 text-gray-800 border border-rose-200"
                }`}
              >
                {num}
              </div>
            ))}
          </div>
        </Card>

        {/* Footer decoration */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Que a sorte esteja com você! 🍀
          </p>
        </div>
      </div>
    </div>
  );
}
