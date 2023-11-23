import { useState } from "react"
import MyComponent from "./components/RandomGenerator"
import './App.css'
const App = () => {
  const [message] = useState('hello')

  return (
    <>
      <div className="bg-red-900">
        <div className="h-24 w-100 bg-yellow-200">
          <header className="h-24 w-100 bg-red-900"></header>
        </div>
        <div className="flex justify-center flex-wrap">
          <div className="">

          </div>
          <MyComponent >
            <div>
              {message}
            </div>
          </MyComponent>
        </div>
      </div>
    </>
  )
}

export default App