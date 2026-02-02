// src/App.js
import React, { useState } from 'react';
import Slide from './Slide';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Introduction à la fonction affine",
      content: {
        type: 'text',
        text: "La fonction affine s'écrit sous la forme y = ax + b."
      },
    },
    {
      title: "Propriétés de la fonction affine",
      content: {
        type: 'list',
        items: [
          "La pente 'a' détermine l'inclinaison de la droite.",
          "L'ordonnée à l'origine 'b' détermine où la droite coupe l'axe des ordonnées."
        ]
      },
    },
    {
      title: "Exemple concret",
      content: {
        type: 'text',
        text: "Prenons l'exemple de la fonction y = 2x + 3."
      },
    },
    {
      title: "Graphique de la fonction",
      content: {
        type: 'image',
        src: 'https://example.com/graphique.jpg',
        alt: 'Graphique de la fonction affine'
      },
    },
    {
      title: "Propriétés",
      reveal: "step",
      content: [
        { type: "text", text: "a est la pente" },
        { type: "text", text: "b est l’ordonnée à l’origine" },
        { type: "image", src: "/graph.png", alt: "graph" }
      ]
    }
    
  ];

  const goToNextSlide = () => {
    //if (Slide.showNext && Slide.showNext()) return;
    setCurrentSlide(s => (s + 1) % slides.length);
  };
  
  

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="presentation">
      <div className="slides-container">
  {slides.map((slide, index) => (
    <Slide
      key={index}
      title={slide.title}
      content={slide.content}
      reveal={slide.reveal}
      className={index === currentSlide ? 'active' : 'disabel'}
    />
  ))}
</div>


<div className="controls">
  
  <button onClick={goToPreviousSlide}>Précédent</button>
  <span>{currentSlide + 1} / {slides.length}</span>
  <button onClick={goToNextSlide}>Suivant</button>
</div>

    </div>
  );
}

export default App;
