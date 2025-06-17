import { Card, CardContent } from "@/components/ui/card";
import { Gauge, GaugeLabel, GaugeValue } from "@/components/ui/gauge";
import { Button } from "@/components/ui/button";
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
    <div className="grid grid-cols-2 gap-4 bg-black min-h-screen p-6 text-white">
      <Card className="bg-zinc-900 shadow-xl rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-xl mb-2">Torch Control</h2>
          <Button onClick={handleTorchToggle} className="w-full">
            {torchState ? "Torch OFF" : "Torch ON"}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 shadow-xl rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-xl mb-2">Torch Voltage</h2>
          <Gauge value={voltage} max={300} className="text-lime-400">
            <GaugeLabel>Voltage</GaugeLabel>
            <GaugeValue>{voltage.toFixed(1)} V</GaugeValue>
          </Gauge>
        </CardContent>
      </Card>

      <Card className="col-span-2 bg-zinc-900 shadow-xl rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-xl mb-2">Arc Signal</h2>
          <div className={`w-full p-6 text-center rounded-xl text-lg font-bold ${arcSignal ? 'bg-green-700' : 'bg-red-700'}`}>
            {arcSignal ? "ARC DETECTED" : "NO ARC"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
