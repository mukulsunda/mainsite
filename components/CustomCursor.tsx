"use client";

import { useEffect, useState, useCallback } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [targetPosition, setTargetPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const updateCursor = useCallback((e: MouseEvent) => {
    setTargetPosition({ x: e.clientX, y: e.clientY });
    
    const target = e.target as HTMLElement;
    const computedStyle = window.getComputedStyle(target);
    const isClickable = 
      computedStyle.cursor === 'pointer' ||
      target.tagName.toLowerCase() === 'a' ||
      target.tagName.toLowerCase() === 'button' ||
      target.closest('a') !== null ||
      target.closest('button') !== null ||
      target.getAttribute('role') === 'button';
    
    setIsPointer(isClickable);
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);
  const handleMouseLeave = useCallback(() => setIsHidden(true), []);
  const handleMouseEnter = useCallback(() => setIsHidden(false), []);

  useEffect(() => {
    // Smooth cursor animation using RAF
    let animationFrameId: number;
    
    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.15,
        y: prev.y + (targetPosition.y - prev.y) * 0.15
      }));
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [targetPosition, updateCursor, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div 
        className="cursor-dot"
        style={{ 
          left: `${targetPosition.x}px`, 
          top: `${targetPosition.y}px`,
          opacity: isHidden ? 0 : 1,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : 1})`,
          transition: 'transform 0.1s ease-out, opacity 0.3s ease'
        }}
      />
      
      {/* Cursor outline with smooth follow */}
      <div 
        className={`cursor-outline ${isPointer ? 'hover' : ''}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          opacity: isHidden ? 0 : 1,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
        }}
      />
    </>
  );
}