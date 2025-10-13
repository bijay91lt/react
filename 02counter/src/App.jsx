import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [counter, setCounter]= useState(5)
  //let counter= 5;

  const incValue = () => {
    counter += 1;
    console.log("value decreased", counter); 
    setCounter(counter);

    if(counter ==21){
      counter -=1 ;
      setCounter(counter);
    }
  }

  const decValue = () => {
    counter -= 1;
    console.log("value decreased", counter);
    setCounter(counter)
    if(counter==-1){
      counter+=1;
      setCounter(counter);
    }
  }

  return (
    <>
    <h1>helllooo</h1>
    <h2>Counter value: {counter}</h2>
    <button
    onClick={incValue}>Increase Value</button>
    <br/>
    <button 
    onClick={decValue}>Decrease Value</button>
    </>
  )
}

export default App
