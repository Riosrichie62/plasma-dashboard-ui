import { useState, useEffect } from "react";

export default function PlasmaControlPanel() {
  const [torchState, setTorchState] = useState(false);
  const [voltage, setVoltage] = useState(0);
  const [arcSignal, setArcSignal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Placeholder: Replace with actual API call to Moonraker
      const fakeVoltage = Math.random() * 250;
      const fakeArc = Math.random() > 0.5;
      setVoltage(fakeVoltage);
      setArcSignal(fakeArc);
    };

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTorchToggle = () => {
    setTorchState(prev => !prev);
    // Send G-code to Klipper: PLASMA_ON or PLASMA_OFF via WebSocket/API
  };

  return (
    <div className="grid grid-cols-2 gap-4 bg-black min-h-screen p-6 text-white font-sans">
      <div className="bg-zinc-900 shadow-xl rounded-2xl p-4">
        <h2 className="text-xl mb-2">Torch Control</h2>
        <button
          onClick={handleTorchToggle}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
        >
          {torchState ? "Torch OFF" : "Torch ON"}
        </button>
      </div>

      <div className="bg-zinc-900 shadow-xl rounded-2xl p-4">
        <h2 className="text-xl mb-2">Torch Voltage</h2>
        <div className="text-lime-400 text-3xl font-mono">
          {voltage.toFixed(1)} V
        </div>
      </div>

      <div className="col-span-2 bg-zinc-900 shadow-xl rounded-2xl p-4">
        <h2 className="text-xl mb-2">Arc Signal</h2>
        <div className={`w-full p-6 text-center rounded-xl text-lg font-bold ${arcSignal ? 'bg-green-700' : 'bg-red-700'}`}>
          {arcSignal ? "ARC DETECTED" : "NO ARC"}
        </div>
      </div>
    </div>
  );
}
