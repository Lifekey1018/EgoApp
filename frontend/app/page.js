'use client'
import Link from 'next/link'
import React,{ useState, useLayoutEffect } from 'react';
import Select from 'react-select';

export default function Home() {
  const [selectedOption, setSelectedOption] = useState({label:"",value:""});
  useLayoutEffect(() => {
    setSelectedOption({label:"エタノール",value:"1"});
    console.log(selectedOption);
  },[]);
  const options = [
    { value: '1', label: 'エタノール' },
    { value: '2', label: '孔雀' },
    { value: '3', label: 'カバ' },
  ];
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
return (
<html lang="ja">
  <head>
    <title>シーン検索</title>
  </head>
  <body>
    <dev>実験動画一覧</dev>
    <br></br>
    <br></br>
    <Select
      defaultValue={{value:"1",label:"エタノール"}}
      onChange={(value)=>{handleChange(value)}}
      options={options}
    />
    <br/>
    <Link href="../search">
      エタノール
    </Link>
    <br></br>
    <Link href ={`/${selectedOption.value}`}>
      Go DynamicPage
    </Link>
  </body>
</html>
);
}