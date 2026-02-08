// src/Slide.js

import './Slide.css';
// Composant principal Slide
import React, { useState, useEffect } from 'react';
// Composant pour les listes
function ListComponent({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li style={{ '--fade-time': index*0.5+'s' }} key={index}>{item}</li>
      ))}
    </ul>
  );
}

// Composant pour afficher des images
function ImageComponent({ src, alt }) {
  return <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto' }} />;
}



function Slide({ title, content, reveal,className,sub,cn }) {
    const contents = Array.isArray(content) ? content : [content];
    const n=contents.length
    let ns=contents.reduce((x,y)=>[...x,x[x.length-1]+Array.isArray(y) ? y.length : 1],[0]);
    console.log(ns,cn)
  const [visibleCount, setVisibleCount] = useState(
    reveal != "step" ? contents.length : 1
  );

  // Reset animation when slide changes
  useEffect(() => {
    setVisibleCount(reveal != "step" ? sub?cn:contents.length : 1);
  }, [contents, reveal]);

  const showNext = () => {
    if (visibleCount < sub?cn:contents.length) {
      setVisibleCount(v => v + 1);
      return true; // content revealed
    }
    return false; // no more content
  };

  // expose function to parent (optional)
//Slide.showNexts.push(showNext);

  return (<>
    <div   className={`slide ${className}`}>
        
      <h2 >{title}</h2>
      <div style={{display:"flex",width:"100%"}}>
        {(sub?contents:[contents]).map((contents,i)=><div style={{overflow:sub?"auto":"hidden", width:(sub?visibleCount>ns[i]?visibleCount<=ns[i+1]?100:Math.floor(100/n):0:100)+"%"}} className={i}>
        {(Array.isArray(contents) ? contents : [contents]).slice(0, Math.max(visibleCount-ns[i],0)).map((content, index) => (
        <div  key={ns[i]+index} className={"content-item "+(visibleCount-ns[i])}>
          
          {React.isValidElement(content) && content}
          {content.type === 'text' && <p>{content.text}</p>}
          {content.type === 'list' && <ListComponent items={content.items} />}
          {content.type === 'image' && (
            <ImageComponent src={content.src} alt={content.alt} />
          )}
          
          
        </div>
      ))}
      </div>)}
      </div>
      
    </div>
    {visibleCount < (sub?cn:contents.length)&&<a className={className+" nxt"}  onClick={showNext}> {">"}</a>}
    </>
  );
}

export default Slide;



