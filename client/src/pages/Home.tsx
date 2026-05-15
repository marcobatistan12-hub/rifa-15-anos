import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

// Lista de nomes dos convidados
const GUEST_NAMES = [
  "Ana",
  "Bruno",
  "Carla",
  "Diego",
  "Eduarda",
  "Felipe",
  "Gabriela",
  "Henrique",
  "Isabela",
  "João",
  "Kamila",
  "Leonardo",
  "Mariana",
  "Nicolas",
  "Olivia",
  "Pedro",
  "Quincy",
  "Rafael",
  "Sofia",
  "Tomás",
];

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [rotation, setRotation] = useState(0);

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
    setIsSpinning(true);
    setSelectedName(null);
    setShowConfetti(false);

    // Animate spinning
    let currentRotation = 0;
    const spinInterval = setInterval(() => {
      currentRotation += 45;
      setRotation(currentRotation);
    }, 50);

    // After 3 seconds, stop spinning and reveal winner
    setTimeout(() => {
      clearInterval(spinInterval);

      // Pick a random name
      const randomIndex = Math.floor(Math.random() * GUEST_NAMES.length);
      const winner = GUEST_NAMES[randomIndex];
      setSelectedName(winner);

      // Final rotation to stop at a nice angle
      const finalRotation = (randomIndex * (360 / GUEST_NAMES.length)) % 360;
      setRotation(finalRotation);

      setIsSpinning(false);

      // Show confetti for celebration
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-pink-300 to-pink-100 flex flex-col items-center justify-center p-4">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Sorteio Festa de 15 Anos
          </h1>
          <p className="text-2xl text-white mb-1 drop-shadow">Lara</p>
          <p className="text-xl text-white/90 drop-shadow">
            Quem será o próximo sorteado?
          </p>
        </div>

        {/* Main Card */}
        <Card className="bg-white/95 backdrop-blur shadow-2xl p-8 mb-8">
          {/* Spinning Ball */}
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-64">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-8 border-pink-600 shadow-2xl"></div>

              {/* Spinning ball with names */}
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-2xl flex items-center justify-center transition-transform ${
                  isSpinning ? "" : "transition-transform duration-1000"
                }`}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transitionDuration: isSpinning ? "0ms" : "1000ms",
                }}
              >
                {/* Names around the ball */}
                {GUEST_NAMES.map((name, i) => {
                  const angle = (i * (360 / GUEST_NAMES.length)) * (Math.PI / 180);
                  const x = Math.cos(angle) * 100;
                  const y = Math.sin(angle) * 100;

                  return (
                    <div
                      key={i}
                      className="absolute w-16 h-16 flex items-center justify-center font-bold text-xs text-white drop-shadow-lg text-center"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      {name}
                    </div>
                  );
                })}

                {/* Center circle */}
                <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <span className="text-3xl font-bold text-pink-600">🎀</span>
                </div>
              </div>
            </div>
          </div>

          {/* Draw Button */}
          <div className="flex justify-center mb-8">
            <Button
              onClick={performDraw}
              disabled={isSpinning}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform transition hover:scale-105 disabled:scale-100 disabled:opacity-70"
            >
              {isSpinning ? "GIRANDO..." : "GIRAR A BOLA"}
            </Button>
          </div>

          {/* Result */}
          {selectedName && (
            <div className="text-center space-y-4 animate-in fade-in duration-500">
              <div className="p-8 bg-gradient-to-r from-pink-100 to-pink-50 rounded-lg border-4 border-pink-400">
                <p className="text-sm text-gray-600 mb-3">🎉 Sorteado(a):</p>
                <p className="text-6xl font-bold text-pink-600 drop-shadow">
                  {selectedName}
                </p>
              </div>

              <div className="p-4 bg-purple-100 rounded-lg border-2 border-purple-400">
                <p className="text-lg font-semibold text-purple-600">
                  ✨ Parabéns, {selectedName}! ✨
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Info Section */}
        <Card className="bg-white/95 backdrop-blur shadow-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Convidados:
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {GUEST_NAMES.map((name) => (
              <div
                key={name}
                className={`font-semibold rounded-lg p-3 text-center text-sm transition-all ${
                  selectedName === name
                    ? "bg-pink-400 text-white scale-110 shadow-lg"
                    : "bg-pink-100 text-gray-900 shadow-md"
                }`}
              >
                {name}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
