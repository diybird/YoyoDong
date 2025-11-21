import React, { useEffect, useRef } from 'react';

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
      if (canvas && ctx) {
        width = window.innerWidth;
        height = window.innerHeight;
        
        // High DPI support
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        
        // Scale context to match DPI
        ctx.scale(dpr, dpr);
        
        // Style dimensions (CSS pixels)
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial setup
    handleResize();

    const dotSpacing = 25; // Slightly denser
    const baseDotSize = 1.5; // Base size
    const interactiveRadius = 120;
    const baseColor = '102, 126, 234'; // RGB values

    const animate = () => {
      // Clear using logical dimensions (context is scaled)
      ctx.clearRect(0, 0, width, height);

      for (let x = 0; x < width; x += dotSpacing) {
        for (let y = 0; y < height; y += dotSpacing) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          let alpha = 0.2; // Increased base visibility from 0.15
          let currentSize = baseDotSize;

          // Interaction logic: dots grow within radius
          if (distance < interactiveRadius) {
            const factor = 1 - (distance / interactiveRadius);
            currentSize = baseDotSize + (baseDotSize * 2.5 * factor);
            alpha = 0.2 + (factor * 0.4);
          }

          ctx.fillStyle = `rgba(${baseColor}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default BackgroundCanvas;