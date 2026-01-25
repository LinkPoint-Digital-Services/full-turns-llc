'use client';

import React, {useEffect, useRef, useState} from 'react';

const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({x: -100, y: -100});
  const points = useRef<{x: number; y: number; age: number}[]>([]);
  const latestPos = useRef<{x: number; y: number} | null>(null);

  // ✅ Initialize isDesktop without useEffect
  const [isDesktop] = useState(() => {
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return !isTouchDevice;
  });

  // Track mouse movement
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({x: e.clientX, y: e.clientY});
      latestPos.current = {x: e.clientX, y: e.clientY};
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop]);

  // Render paint strokes
  useEffect(() => {
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrame: number;
    const maxAge = 45;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (latestPos.current) {
        points.current.push({...latestPos.current, age: 0});
        latestPos.current = null;
      }

      points.current.forEach(p => (p.age += 1));
      points.current = points.current.filter(p => p.age < maxAge);

      if (points.current.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 1; i < points.current.length; i++) {
          const p1 = points.current[i - 1];
          const p2 = points.current[i];
          const opacity = 1 - p2.age / maxAge;

          const jitterX = Math.sin(p2.age * 0.3) * 0.5;
          const jitterY = Math.cos(p2.age * 0.3) * 0.5;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(198, 163, 80, ${opacity * 0.8})`;
          ctx.lineWidth = (12 + Math.sin(p2.age / 2) * 4) * opacity;
          ctx.moveTo(p1.x + jitterX, p1.y + jitterY);
          ctx.lineTo(p2.x + jitterX, p2.y + jitterY);
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.25})`;
          ctx.lineWidth = 3 * opacity;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            * { cursor: none !important; }
            input, select, textarea, button, a, [role="button"], iframe {
              cursor: none !important;
            }
          `
        }}
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-9998"
      />
      <div
        className="fixed pointer-events-none z-9999 transition-transform duration-75 ease-out"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: `translate(-10%, -5%)`,
          width: '60px',
          height: '60px',
          backgroundImage:
            'url("/assets/images/homepage/paintbrush-cursor.png")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </>
  );
};

export default CustomCursor;
