"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);

  const createStar = useCallback((canvas: HTMLCanvasElement): Star => {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      brightness: Math.random() * 0.5 + 0.5,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2,
    };
  }, []);

  const initStars = useCallback(
    (canvas: HTMLCanvasElement) => {
      const starCount = Math.floor((canvas.width * canvas.height) / 8000);
      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(createStar(canvas));
      }
      starsRef.current = stars;
    },
    [createStar],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.fillStyle = "rgba(10, 15, 30, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation
      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * 0.02;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * 0.02;

      const time = Date.now() * 0.001;

      starsRef.current.forEach((star) => {
        // Calculate movement based on mouse position
        const mouseInfluenceX = (mouseRef.current.x / canvas.width) * 2;
        const mouseInfluenceY = (mouseRef.current.y / canvas.height) * 2;

        // Update star position with gentle drift
        star.x += star.speed * (mouseInfluenceX * 3 + 0.5);
        star.y += star.speed * (mouseInfluenceY * 3 + 0.3);

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Twinkle effect
        const twinkle =
          Math.sin(time * star.twinkleSpeed * 10 + star.twinkleOffset) * 0.3 +
          0.7;
        const alpha = star.brightness * twinkle;

        // Draw star
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 2,
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${alpha * 0.5})`);
        gradient.addColorStop(1, "rgba(200, 220, 255, 0)");

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [initStars]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        background:
          "linear-gradient(to bottom, #0a0f1c 0%, #1a1f3a 50%, #0a0f1c 100%)",
      }}
    />
  );
}
