import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Mouse ki current position track karne ke liye
    const mouse = { x: 0, y: 0 };
    // Outline ki current position
    const outline = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Dot ko foran mouse ki jagah le jayein
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
      }
    };

    // Smooth Animation Loop (Sirf Outline ke liye)
    const animate = () => {
      // Easing formula (0.15 ka matlab hai smooth dheere dheere aana)
      outline.x += (mouse.x - outline.x) * 0.15;
      outline.y += (mouse.y - outline.y) * 0.15;

      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate(${outline.x}px, ${outline.y}px)`;
      }
      requestAnimationFrame(animate);
    };

    // Hover Check (Buttons/Links par)
    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.tagName.toLowerCase() === 'input'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Theme Check (Dark / Light)
    const checkTheme = () => {
      setIsDarkMode(document.body.classList.contains('dark'));
    };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Events lagayein
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Animation start karein
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      observer.disconnect();
    };
  }, []);

  // Colors (Golden for Dark, Orange for Light)
  const mainColor = isDarkMode ? '#e6b912' : '#f05a28';
  const bgColor = isDarkMode ? 'rgba(230, 185, 18, 0.15)' : 'rgba(240, 90, 40, 0.15)';

  return (
    <div className="custom-cursor-wrapper">
      {/* 1. Chota Dot (Mouse ke sath foran chalta hai) */}
      <div 
        ref={dotRef}
        className="cursor-dot"
        style={{ backgroundColor: mainColor }}
      ></div>

      {/* 2. Bara Circle (Mouse ke piche smoothly aata hai) */}
      <div 
        ref={outlineRef}
        className={`cursor-outline ${isHovering ? 'hovering' : ''}`}
        style={{ 
          borderColor: mainColor,
          backgroundColor: isHovering ? bgColor : 'transparent'
        }}
      ></div>
    </div>
  );
};

export default CustomCursor;