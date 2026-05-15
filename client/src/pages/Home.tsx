import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

const WINNING_NUMBERS = [59, 60, 49, 66, 41, 43, 25, 10, 47, 50, 67, 54, 62];

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const performDraw = () => {
    setIsSpinning(true);

    // Animate spinning
    let currentRotation = 0;
    const spinInterval = setInterval(() => {
      currentRotation += 45;
      setRotation(currentRotation);
    }, 50);

    // After 3 seconds, stop spinning
    setTimeout(() => {
      clearInterval(spinInterval);
      
      // Final rotation to stop at a nice angle
      const finalRotation = Math.random() * 360;
      setRotation(finalRotation);
      
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-pink-300 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Rifa Festa de 15 Anos - Lara
          </h1>
          <p className="text-xl text-white/90 drop-shadow">
            Sorteio ao Vivo - 1 Ganhador
          </p>
        </div>

        {/* Main Card */}
        <Card className="bg-white/95 backdrop-blur shadow-2xl p-8 mb-8">
          {/* Spinning Ball */}
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-64">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-8 border-pink-600 shadow-2xl"></div>
              
              {/* Spinning ball with numbers */}
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-2xl flex items-center justify-center transition-transform ${
                  isSpinning ? "" : "transition-transform duration-1000"
                }`}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transitionDuration: isSpinning ? "0ms" : "1000ms",
                }}
              >
                {/* Numbers around the ball */}
                {Array.from({ length: 20 }, (_, i) => {
                  const angle = (i * 18) * (Math.PI / 180);
                  const x = Math.cos(angle) * 100;
                  const y = Math.sin(angle) * 100;
                  const number = (i * 5) + 1;
                  
                  return (
                    <div
                      key={i}
                      className="absolute w-12 h-12 flex items-center justify-center font-bold text-lg text-white drop-shadow-lg"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      {number}
                    </div>
                  );
                })}
                
                {/* Center circle */}
                <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <span className="text-3xl font-bold text-pink-600">🎰</span>
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
        </Card>

        {/* Info Section */}
        <Card className="bg-white/95 backdrop-blur shadow-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Seus Números na Rifa:
          </h3>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7">
            {WINNING_NUMBERS.map((num) => (
              <div
                key={num}
                className="font-bold rounded-lg p-2 text-center text-sm bg-yellow-300 text-gray-900 shadow-md"
              >
                {num}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
