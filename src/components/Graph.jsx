import React, { useState, useMemo } from "react";
import "./Graph.css";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
);

function Graph({minX=0,maxY=10,minY=0,maxX=10}) {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [xInput, setXInput] = useState("");
  const [points, setPoints] = useState([]);



const guideLineDatasets = p => {
  const base = {
    borderColor: "rgba(0,0,0,0.9)",
    borderDash: [6, 6],
    pointRadius: 0,
    borderWidth: 1,
    animations: p.active
  };



  return [
    {
      ...base,
      animations:p.active? {
        easing:"easeInBounce"
        }: false,
      data: [

        { x: p.x, y: minY },
        { x: p.x, y: p.y }
        
      ]
    },
    {
      ...base,
      animations:p.active? {
        easing:"easeOutBounce",
          x: { from: minX, duration: 1000 },
          y: { from: p.y, duration: 0 }
        }: false,
      data: [
        { x: minX, y: p.y },
        { x: p.x, y: p.y }
      ]
    }
  ];
};





  // generate line from y = ax + b
  const lineData = useMemo(() => {
    const xs = [];
    const ys = [];

    for (let x = minX; x <= maxY; x+=1) {
      xs.push(x);
      ys.push(a * x + b);
    }

    return { xs, ys };
  }, [a, b]);

const chartData = useMemo(() => ({

  datasets: [
    {
  label: "Points",
  data: points.filter(e=>!e.active).map(p => ({ x: p.x, y: p.y })),
  showLine: false,
  backgroundColor: "red",
  pointRadius: 3,
  animation: false
},
{
  label: "NewPoint",
  data: points.filter(e=>e.active),
  showLine: false,
  backgroundColor: "red",
  pointRadius: 3,
  animations: {
    easing:"easeOutBounce",
  }
}
,

    ...points.flatMap(guideLineDatasets),

    {
      label: "y = ax + b",
      data: lineData.xs.map((x, i) => ({
        x,
        y: lineData.ys[i]
      })),
      borderColor: "blue",
      pointRadius: 2,
      tension: 0.1,
      borderWidth:1,
    }
  ]
}), [points, lineData]);




  const options =useMemo(() => ({
    ticks: {
  stepSize: 1
}
,
    maintainAspectRatio: false,
    //animation: { duration: 1000 }, transitions: { active: { animation: { duration: 0 } } },
  scales: {
    x: { type: "linear", min: minX, max: maxX },
    y: { min: minY, max: maxY }
  },
  plugins: {
    legend: {
      labels: {
        filter: item =>
          item.text === "Points" || item.text === "y = ax + b"
      }
    }
  }
}), [points, lineData])


  const addPoint = () => {
    const x = Number(xInput);
    if (isNaN(x)) return;

    const y = a * x + b;
    setPoints(prev => [...(prev.map(e=>({x:e.x,y:e.y}))), { x, y,active:true }]);
    setXInput("");
  };

  const removePoint = index => {
    setPoints(prev => prev.map(e=>({x:e.x,y:e.y})).filter((_, i) => i !== index));
  };
const clearPoints = () => {
  setPoints([]);
};

  return (
  <div className="graph-wrapper">
    {/* GRAPH */}
    <div className="graph-panel">
      <Line  data={chartData} options={options} />
    </div>

    {/* CONTROLS */}
    <div className="controls-panel">
      <h3>y = ax + b</h3>

      <div className="input-row">
        <label>a</label>
        <input
          type="number"
          value={a}
          onChange={e => {setA(Number(e.target.value));clearPoints()}}
        />
      </div>

      <div className="input-row">
        <label>b</label>
        <input
          type="number"
          value={b}
          onChange={e => {setB(Number(e.target.value));clearPoints()}}
        />
      </div>

      <p className="equation">
        y = {a}x + {b}
      </p>

      <div className="input-row">
        <label>x</label>
        <input
          value={xInput}
          onChange={e => setXInput(e.target.value)}
        />
        <button onClick={addPoint}>Add</button>
        <button onClick={clearPoints} className="clear-btn">
  Clear Points
</button>

      </div>
    </div>

    {/* POINT LIST */}
    <div className="points-panel">
      <h4>Points</h4>

      {points.map((p, i) => (
        <div className="point-item" key={i}>
          ({p.x}, {p.y})
          <button onClick={() => removePoint(i)}>✕</button>
        </div>
      ))}
    </div>
  </div>
);

}

export default Graph;
