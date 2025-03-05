
import React from 'react';
import Navbar from '../components/Navbar'
// import { useState , useEffect } from 'react';


function Home() {

  // const[vword , setvWords] = useState([]);
  // const words = ["Hi,", "Kavita", "Soren", "from", "India", "Web", "Developer"];

  // useEffect(()=>{
  //   words.forEach((word , index)=>{
  //     setTimeout(()=>{
  //       setvWords((prev) => [...prev , word])
  //     },1000)
  //   })
  // })

  return (
    <>
    <Navbar/>
    <div>
      <section id="home" className="hero">
        <p className="job-title">Web Developer</p>
        <h1>
          Hi, I'm <span className="K">Kavita Soren</span> from India
        </h1>
      </section>
    </div>
    </>
  );
}

export default Home;
