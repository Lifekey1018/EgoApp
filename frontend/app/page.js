'use client'
import Link from 'next/link'
import React,{ useState, useLayoutEffect } from 'react';
import Select from 'react-select';

export default function Home() {
 
return (
  <div>
    <div>実験動画一覧</div>
    <br/>
    <Link href="../search">
      ion
    </Link>

    <br/>
    <Link href="../demo">
      VAD Demo
    </Link>
    </div>
);
}