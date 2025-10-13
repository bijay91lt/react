import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cards from './components/cards'

function App() {
  const [count, setCount] = useState(0)
 
  return (
    <>
      {/* <h1 className='bg-green-400 text-black p-4 rounded-4xl'>Tailwind test</h1> */}
       <Cards props="kakeru" price= "$340" size= "0.01"/>
       <Cards props="hashira"/>
    </>
  )
}

export default App
