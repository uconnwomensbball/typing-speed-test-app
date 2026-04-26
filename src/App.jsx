import { useState } from 'react'


function App() {

  const [isInitialScreen, setInitialScreen] = useState(true)
  const [isDifficultyMenuDisplayed, setIsDifficultyMenuDisplayed] = useState(false)
  const [isTestTypeMenuDisplayed, setIsTypeTestMenuDisplayed] = useState(false)
  
  return (
    <div className="bg-neutral-900 flex flex-col justify-center items-center">

      <header className="flex flex-row justify-between items-center">
        <img src="src\assets\images\logo-small.svg"/>
        <div className="flex flex-row justify-center items-center">
        <img src="src\assets\images\icon-personal-best.svg"/>
        <p className="text-neutral-400">Best: <span className="text-neutral-50">92 WPM</span></p>
        </div>
      </header>

      <main>
        <nav className="flex flex-row">
          <div>
            <p className="text-neutral-400">WPM:</p>
            <p className="text-neutral-50">0</p>
          </div>
          <div>
            <p className="text-neutral-400">Accuracy:</p>
            <p className="text-neutral-50">100%</p>
          </div>
          <div>
            <p className="text-neutral-400">Time:</p>
            <p className="text-neutral-50">0:60</p>
          </div>
        </nav>

        <div className="flex flex-row justify-center items-center">
          <div className="border border-neutral-400 pointer" onClick={()=>setIsDifficultyMenuDisplayed(prevVal=>!prevVal)}>
            <p className="text-neutral-400">Hard</p>
            <img src="src\assets\images\icon-down-arrow.svg"/>
          </div>
          {isDifficultyMenuDisplayed && <div className="flex flex-col justify-center items-center border text-neutral-50">
            <div className="flex flex-row justify-center items-center">
                <input type="radio" name="difficulty" value="hard"></input>
                <p>Hard</p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <input type="radio" name="difficulty" value="medium"></input>
              <p>Medium</p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <input type="radio" name="difficulty" value="easy"></input>
              <p>Easy</p>
            </div>
          </div>}

          <div className="border border-neutral-400 pointer" onClick={()=>setIsTypeTestMenuDisplayed(prevVal=>!prevVal)}>
            <p className="text-neutral-400">Timed (60s)</p>
            <img src="src\assets\images\icon-down-arrow.svg" />
          </div>
          {isTestTypeMenuDisplayed && <div className="text-neutral-50">
            <div className="flex flex-row justify-center items-center">
              <input type="radio" name="test-type" value="timed"></input>
              <p>Timed (60s)</p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <input type="radio" name="test-type" value="passage"></input>
              <p>Passage</p>
            </div>
          </div>}
        </div>
       
        <button className="text-neutral-50 bg-blue-600">Start Typing Test</button>
        <p className="text-neutral-50">Or click the text and start typing</p>
      
      </main>
    </div>
  )
}

export default App
