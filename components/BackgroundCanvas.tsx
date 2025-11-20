
import React, { useEffect, useRef } from 'react';

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = document.documentElement.scrollHeight;
    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
      if (canvas) {
        width = window.innerWidth;
        height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const dotSpacing = 30;
    const baseDotSize = 1.5;
    const interactiveRadius = 80; // Requested radius
    const baseColor = '102, 126, 234'; // RGB values

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let x = 0; x < width; x += dotSpacing) {
        for (let y = 0; y < height; y += dotSpacing) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          let alpha = 0.15; 
          let currentSize = baseDotSize;

          // Interaction logic: dots grow within radius
          if (distance < interactiveRadius) {
            // Calculate scale factor: 0 at radius edge, 1 at center
            const factor = 1 - (distance / interactiveRadius);
            // Scale up to 4x original size smoothly
            currentSize = baseDotSize + (baseDotSize * 3 * factor);
            // Slightly increase opacity for the active dots
            alpha = 0.15 + (factor * 0.4);
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
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default BackgroundCanvas;
