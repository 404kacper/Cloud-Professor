'use client';
import React, { useEffect, useRef, useState, useContext } from 'react';
import SplineContext from '@/splineContext/SplineContext';
import styles from './Home.module.scss';
import { Application } from '@splinetool/runtime';
import AuthForm from './authForm';
import Image from 'next/image';

// TODO: To make this a server component
// create loading state in SplieContext
// export useEffect here into a sepearate component along with the spline render and make that component client side
// then import it into here and remove 'use client'
// ! only issue is with loading since it will still be a client side state and won't be allowed to be used inside a server component...

export default function HomePage() {
  const splineContext = useContext(SplineContext);

  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const app = new Application(canvas);
    appRef.current = app;

    app
      .load('https://draft.spline.design/7uDw1ImbCjUHa9Sk/scene.splinecode')
      .then(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!appRef.current) return;

    const app = appRef.current;
    const camera = app.findObjectByName('Camera Start');

    if (splineContext.heroButtonClicked) {
      camera?.emitEvent('mouseDown');
    } else {
      camera?.emitEventReverse('mouseDown');
    }
  }, [splineContext.heroButtonClicked]);

  return (
    <div className={styles.homePage}>
      {loading && <div>Loading...</div>}
      <canvas
        ref={canvasRef}
        id='canvas3d'
        className={styles.render3d}
      ></canvas>
      {!loading && (
        <>
          <div className={styles.marquee}>
            <div className={styles.imageContainer}>
              <Image priority src='/hero/hero-text.svg' alt='' fill></Image>
            </div>
            <div className={styles.imageContainer}>
              <Image priority src='/hero/hero-text.svg' alt='' fill></Image>
            </div>
          </div>
          {(splineContext.isLoginScreen || splineContext.heroButtonClicked) && <AuthForm></AuthForm>}
        </>
      )}
    </div>
  );
}
