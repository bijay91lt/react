import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

function MyApp(){
    return(
        <div>
            <h1>custom app</h1>
        </div>
    )
}

// const ReactElement = {
//     type: 'a',
//     props: {
//         href: "https://google.com",
//         target: '_blank'
//     },
//     children: 'click me to visit google'
// }

const anotherElement =  (
    <a href="https://google.com" target='_blank'>Visit google</a>
)

const reactElement = React.createElement(
    'a', 
    {href: 'https://google.com', target:'_blank'},
    'Click me to visit google'

)
createRoot(document.getElementById('root')).render(
  
    <App />
  
)
