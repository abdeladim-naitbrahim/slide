// src/Slide.js

import './Slide.css';
// Composant principal Slide
import React, { useState, useEffect } from 'react';
// Composant pour les listes
function ListComponent({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// Composant pour afficher des images
function ImageComponent({ src, alt }) {
  return <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto' }} />;
}



function Slide({ title, content, reveal,className }) {
    const contents = Array.isArray(content) ? content : [content];
  const [visibleCount, setVisibleCount] = useState(
    reveal != "step" ? contents.length : 1
  );

  // Reset animation when slide changes
  useEffect(() => {
    setVisibleCount(reveal != "step" ? contents.length : 1);
  }, [contents, reveal]);

  const showNext = () => {
    if (visibleCount < contents.length) {
      setVisibleCount(v => v + 1);
      return true; // content revealed
    }
    return false; // no more content
  };

  // expose function to parent (optional)
//Slide.showNexts.push(showNext);

  return (<>
    <div className={`slide ${className}`}>
        
      <h2 >{title}</h2>

      {contents.slice(0, visibleCount).map((content, index) => (
        <div key={index} className="content-item">
          {content.type === 'text' && <p>{content.text}</p>}
          {content.type === 'list' && <ListComponent items={content.items} />}
          {content.type === 'image' && (
            <ImageComponent src={content.src} alt={content.alt} />
          )}
          
        </div>
      ))}
      
    </div>
    {visibleCount < contents.length&&<a className={className} style={{width:"100%",marginRight:"40px",textAlign:"right",cursor:"pointer"}} onClick={showNext}> {">"}</a>}
    </>
  );
}

export default Slide;



