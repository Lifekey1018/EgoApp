'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react';

export default function Home() {
return (
<html lang="ja">
  <head>
    <title>シーン検索</title>
    
  </head>

  <body>
    <dev>実験動画一覧</dev>
    <br></br>
    <Link href="../search">
      エタノール
    </Link>
  </body>
</html>
);
}