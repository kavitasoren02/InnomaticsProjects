import React , {useState , useEffect} from 'react'
import {throttle, transform} from 'lodash';
 
 const Cursor =()=> {

    const[pos , setPos] = useState({x:0, y:0});

    useEffect(() =>{
        const handleMove = throttle((e) =>{
            const {clientX , clientY } = e;
            setPos({ x: clientX, y: clientY });
        },16);
    window.addEventListener('mousemove' , handleMove);

    return () =>{
        window.removeEventListener('mousemove' , handleMove);
    };
 },[]);

   return (
     <div style={{
        position: 'absolute',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: '8px',
        height: '8px',
        backgroundColor: 'transparent',
        border: "2px solid #FFFFFF",
        borderRadius: '50%',
        pointerEvents: 'none',
        transition: 'transform 0.1s ease', 
        zIndex:'9999',
        transform: "translate(-50%, -50%)"
     }}>
     </div>
   )
 }
 
 export default Cursor; 