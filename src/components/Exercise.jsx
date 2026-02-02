import { useState } from "react";

export default function Exercise({ a, b }) {
  const [xInput, setXInput] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const x = parseFloat(xInput);
    if (!isNaN(x)) {
      setResult(a * x + b);
    }
  };

  return (
    <div>
      <h3>Exercice interactif :</h3>
      <p>Calculez y pour une valeur donnée de x.</p>
      <label>
        Entrez une valeur de x :
        <input
          type="number"
          value={xInput}
          onChange={(e) => setXInput(e.target.value)}
        />
      </label>
      <button onClick={handleCalculate}>Calculer y</button>
      {result !== null && <p>y = {result}</p>}
    </div>
  );
}
