'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Home.module.scss';
import { Application } from '@splinetool/runtime';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);;

  const splineSceneLoaded = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const app = new Application(canvas);
    app.load('https://prod.spline.design/js2Ij4s0p8oGDX1g/scene.splinecode').then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className={styles.homePage}>
      {loading && <div className={styles.loading}>Loading...</div>}
      <canvas ref={canvasRef} id="canvas3d"></canvas>
      {!loading && (
        <>
          <h1>Welcome to My Next.js App!</h1>
          <p>This is the home page.</p>
        </>
      )}
    </div>
  );
}
