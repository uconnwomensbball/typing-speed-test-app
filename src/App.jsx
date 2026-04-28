import { useState } from 'react'
import data from './data.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons'

function App() {
  console.log(data)
  const [isInitialScreen, setInitialScreen] = useState(true)
  const [isDifficultyMenuDisplayed, setIsDifficultyMenuDisplayed] = useState(false)
  const [isTestTypeMenuDisplayed, setIsTypeTestMenuDisplayed] = useState(false)
  const [passage, setPassage] = useState(data.easy[0].text)
  const [passageDifficulty, setPassageDifficulty] = useState("hard")
  const [testType, setTestType] = useState("timed")
  const [randomNumber, setRandomNumber] = useState(null)

//the below function is not working correctly 
  function startTest(){
    setInitialScreen(false)
    const randomNumber = Math.floor(Math.random()*10)
    console.log(randomNumber)

    //setPassage(data[passageDifficulty][randomNumber])
    console.log(passage)
  }
  
  return (
    <div className="bg-neutral-900 flex flex-col justify-center items-center max-w-sm m-auto">

      <header className="flex flex-row justify-between items-center">
        <img src="src\assets\images\logo-small.svg"/>
        <div className="flex flex-row justify-center items-center">
          <img src="src\assets\images\icon-personal-best.svg"/>
          <p className="text-neutral-400">Best: <span className="text-neutral-50">92 WPM</span></p>
        </div>
      </header>

      <main className="flex flex-col justify-center items-center">
        <nav className="flex flex-row gap-4 mb-4">
          <div>
            <p className="text-neutral-400">WPM:</p>
            <p className="text-neutral-50">0</p>
          </div>
          <div className="border-l border-r pl-4 pr-4">
            <p className="text-neutral-400">Accuracy:</p>
            <p className="text-neutral-50">100%</p>
          </div>
          <div>
            <p className="text-neutral-400">Time:</p>
            <p className="text-neutral-50">0:60</p>
          </div>
        </nav>
   
          <div className="flex flex-row justify-center items-center gap-4 mb-4">
            <div className="border border-neutral-400 pointer" onClick={()=>setIsDifficultyMenuDisplayed(prevVal=>!prevVal)}>
              <p className="text-neutral-400">Hard</p>
              <img src="src\assets\images\icon-down-arrow.svg"/>
            </div>
            {isDifficultyMenuDisplayed && <div className="flex flex-col justify-center items-center border text-neutral-50">
              <div className="flex flex-row justify-center items-center">
                  <input type="radio" name="difficulty" value="easy"  checked={passageDifficulty === "easy"? true: false} onChange={()=>setPassageDifficulty("easy")}></input>
                  <p>Easy</p>
              </div>
              <div className="flex flex-row justify-center items-center">
                <input type="radio" name="difficulty" value="medium"  checked={passageDifficulty === "medium"? true: false} onChange={()=>setPassageDifficulty("medium")}></input>
                <p>Medium</p>
              </div>
              <div className="flex flex-row justify-center items-center">
                <input type="radio" name="difficulty" value="hard" checked={passageDifficulty === "hard"? true: false} onChange={()=>setPassageDifficulty("hard")}></input>
                <p>Hard</p>
              </div>
            </div>}

            <div className="border border-neutral-400 pointer" onClick={()=>setIsTypeTestMenuDisplayed(prevVal=>!prevVal)}>
              <p className="text-neutral-400">Timed (60s)</p>
              <img src="src\assets\images\icon-down-arrow.svg" />
            </div>
            {isTestTypeMenuDisplayed && <div className="text-neutral-50">
              <div className="flex flex-row justify-center items-center">
                <input type="radio" name="test-type" value="timed" checked={testType==="timed"? true: false} onChange={()=>setTestType("timed")}></input>
                <p>Timed (60s)</p>
              </div>
              <div className="flex flex-row justify-center items-center">
                <input type="radio" name="test-type" value="passage" checked={testType==="passage"? true: false} onChange={()=>setTestType("passage")}></input>
                <p>Passage</p>
              </div>
            </div>}
        </div>

        <div className="text-neutral-50 border-t p-2">
          <p>{passage}</p>
        </div>
        {isInitialScreen && <div className="flex flex-col justify-center items-center">
          <button className="text-neutral-50 bg-blue-600 p-2" onClick={startTest}>Start Typing Test</button>
          <p className="text-neutral-50">Or click the text and start typing</p>
        </div>}
      </main>
      <footer className="text-neutral-50">JDJD Codes <FontAwesomeIcon icon={faScaleBalanced}/></footer>
    </div>
  )
}

export default App
