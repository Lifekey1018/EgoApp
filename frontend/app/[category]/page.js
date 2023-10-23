"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const DynamicPage = ({params}) => {
    return (
    <body>
    <h1>Hello, {params.category}!</h1>
    </body>
    );
}

export default DynamicPage;