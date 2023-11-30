'use client';
import React, { useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { redirect } from 'next/navigation';

export default function Dasbhoard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // redirect user registered/logged/has cookie stored
    if (!user) {
      redirect('/');
    }
  }, []);

  return <div>Dashboard page</div>;
}
