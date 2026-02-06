// src/App.js
import React, { useState } from 'react';
import Slide from './Slide';
import './App.css';
import Graph from './components/Graph';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
  {
    title: "Fonction affine : introduction",
    reveal: "step",
    content: [
      {
        type: "text",
        text: "Définition : une fonction affine est de la forme y = ax + b."
      },
      {
        type: "text",
        text: "Exemple : y = 2x + 3 est une fonction affine."
      },
      {
        type: "text",
        text: "Calcul : pour x = 1, on a y = 2×1 + 3 = 5."
      }
    ]
  },

  {
    title: "Présentation graphique",
    reveal: "step",
    content: [
      <Graph/>,
      {
        type: "text",
        text: "Remarque : la représentation graphique d’une fonction affine est une droite."
      }
    ]
  },

  {
    title: "Rôle de a et de b",
    reveal: "step",
    content: [
      {
        type: "text",
        text: "Le nombre a s’appelle la pente (ou coefficient directeur)."
      },
      {
        type: "text",
        text: "Le nombre b s’appelle l’ordonnée à l’origine."
      },
      {
        type: "text",
        text: "Quand a change, la droite tourne autour de l’axe des ordonnées."
      },
      {
        type: "text",
        text: "Quand b change, la droite se déplace verticalement et coupe l’axe en (0, b)."
      },<Graph/>
    ]
  },

  {
    title: "Déterminer a et b",
    reveal: "step",
    content: [
      {
        type: "text",
        text: "Graphiquement : on lit b au point d’intersection avec l’axe des ordonnées."
      },
      {
        type: "text",
        text: "Graphiquement : a se calcule comme le rapport Δy / Δx entre deux points."
      },
      {
        type: "text",
        text: "Numériquement : à partir de deux points, on calcule a puis b."
      }
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
