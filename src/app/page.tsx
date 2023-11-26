'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Home.module.scss';
import { Application } from '@splinetool/runtime';
import Image from 'next/image';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const app = new Application(canvas);
    app
      .load('https://draft.spline.design/ea1odh2AWh9daDcm/scene.splinecode')
      .then(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.homePage}>
      {loading && <div>Loading...</div>}
      <canvas
        ref={canvasRef}
        id='canvas3d'
        className={styles.render3d}
      ></canvas>
      {!loading && (
        <div className={styles.marquee}>
          <div className={styles.imageContainer}>
            <Image
              priority
              src='/navbar/hero-text.svg'
              alt=''
              fill
            ></Image>
          </div>
          <div className={styles.imageContainer}>
            <Image
              priority
              src='/navbar/hero-text.svg'
              alt=''
              fill
            ></Image>
          </div>
        </div>
      )}
    </div>
  );
}
