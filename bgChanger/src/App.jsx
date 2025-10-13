import { useState } from "react"

function App() {
  const [color, setColor] = useState("olive")

  console.log("Current color:", color);
  return (
    <>
     <div className="w-full h-screen duration-200" style={{backgroundColor:color}}>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-xl bg-white px-3 py-2 rounded-3xl">
          <button onClick={() => setColor("red")}
          className="min-h-[3rem] px-4  active:scale-105 scale-110 active:transition-all duration-50 font-semibold rounded-full bg-red-100 text-gray-800">
          Red</button>

          <button onClick={() => setColor("blue")}
          className="min-h-[3rem] px-4  active:scale-105 scale-110 active:transition-all duration-50 font-semibold rounded-full bg-blue-100 text-gray-800">
          Blue</button>

          <button onClick={() => setColor("green")}
          className="min-h-[3rem] px-4  active:scale-105 scale-110 active:transition-all duration-50 font-semibold rounded-full bg-green-100 text-gray-800">
          Green</button>

          <button onClick={() => setColor("yellow")}
          className="min-h-[3rem] px-4  active:scale-105 scale-110 active:transition-all duration-50 font-semibold rounded-full bg-yellow-100 text-gray-800">
          Yellow</button>

          <button onClick={() => setColor("orange")}
          className="min-h-[3rem] px-4  active:scale-105 scale-110 active:transition-all duration-50 font-semibold rounded-full bg-orange-100 text-gray-800">
          Orange</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
