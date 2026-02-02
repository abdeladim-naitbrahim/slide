export default function Controls({ a, b, setA, setB }) {
    return (
      <div>
        <h3>Contrôles :</h3>
        <label>
          a (pente) :
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
            step="0.1"
          />
        </label>
        <br />
        <label>
          b (ordonnée à l'origine) :
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            step="0.1"
          />
        </label>
      </div>
    );
  }
  