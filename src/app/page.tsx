'use client';
import React, { useEffect, useRef, useState, useContext } from 'react';
import SplineContext from '@/splineContext/SplineContext';
import AuthContext from '@/context/AuthContext';
import { redirect } from 'next/navigation';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../app/components/home/Navbar';
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
  const { heroButtonClicked, showModal } = useContext(SplineContext);
  const { error, user } = useContext(AuthContext);

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

    if (heroButtonClicked) {
      camera?.emitEvent('mouseDown');
    } else {
      camera?.emitEventReverse('mouseDown');
    }
  }, [heroButtonClicked]);

  useEffect(() => {
    toast.error(error);
  }, [error]);

  useEffect(() => {
    // redirect user registered/logged/has cookie stored
    if (user) {
      redirect('/dashboard');
    }
  }, [user]);

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.homePage}>
        <ToastContainer />
        {loading && <div style={{ color: 'white' }}>Loading...</div>}
        {/* <canvas
          ref={canvasRef}
          id='canvas3d'
          className={styles.render3d}
        ></canvas> */}
        {!loading && (
          <>
            <div
              className={`${styles.marquee} ${
                !heroButtonClicked && styles.marqueeVisible
              }`}
            >
              <div className={styles.imageContainer}>
                <Image priority src='/hero/hero-text.svg' alt='' fill></Image>
              </div>
              <div className={styles.imageContainer}>
                <Image priority src='/hero/hero-text.svg' alt='' fill></Image>
              </div>
            </div>
            {showModal && <AuthForm></AuthForm>}
          </>
        )}
      </div>
    </>
  );
}
