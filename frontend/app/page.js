'use client'
import Link from 'next/link'
import React from 'react';
import Header from './components/Header';
export default function Home() {

return (
  <div>
    <Header />
    <div>実験動画一覧</div>
    <Link href="../ion">
      イオン実験
    </Link>
    <br />
    <Link href="../cardboard">
      ダンボール工作 
    </Link>
  </div>
)
}