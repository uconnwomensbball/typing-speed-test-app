import { useState, useEffect } from 'react'
import data from './data.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons'

function App() {
  
  const [isInitialScreen, setIsInitialScreen] = useState(true)
  const [isFirstTest, setIsFirstTest] = useState(false)
  const [isTestOver, setIsTestOver] = useState(false)
  const [isDifficultyMenuDisplayed, setIsDifficultyMenuDisplayed] = useState(false)
  const [isTestTypeMenuDisplayed, setIsTypeTestMenuDisplayed] = useState(false)
  const [passage, setPassage] = useState(data.hard[0].text)
  const [passageDifficulty, setPassageDifficulty] = useState("Hard")
  const [testType, setTestType] = useState("Timed (60s)")
  const [randomNumber, setRandomNumber] = useState(null)
  const [timer, setTimer] = useState(10)
  const [isHighScore, setIsHighScore] = useState(false)

  //function - starts test upon click of "Start Typing Test" button 
  function startTest(){
    setIsInitialScreen(false)
    const randomNumber = Math.floor(Math.random()*10)
    setPassage(data[passageDifficulty.toLowerCase()][randomNumber].text)

    if (testType === "Timed (60s)"){
      const intervalId = setInterval(()=>{
          setTimer(prevTime=>{
            if (prevTime !== 0){
              return prevTime-1}
            else{
              setIsTestOver(true)
              clearInterval(intervalId)
              setTimer(10)
            }})},1000)
  }}

  function handleKeyPress(e){
    console.log(e)
  }

  useEffect(()=>{
    window.addEventListener("keydown", handleKeyPress)
    return () => {
    window.removeEventListener("keydown", handleKeyPress);
  }
  },[] )
 


//TODO: complete the resultsHeader logic 
let resultsHeader 
let resultsText
if (isFirstTest){
  resultsHeader = "Baseline Established!"
  resultsText = "You've set the bar. Now the real challenge begins--time to beat it."
}else if (isHighScore){
  resultsHeader = "High Score Smashed!"
  resultsText = "You're getting faster. That was incredible typing."
}else{
  resultsHeader = "Test Complete!"
  resultsText = "Solid run. Keep pushing to beat your high score."
}

  return (
    <div className="bg-neutral-900 flex flex-col justify-center items-center max-w-sm m-auto font-soraReg p-4">

      <header className="flex flex-row justify-between items-center w-full mb-4">
        <img src="src\assets\images\logo-small.svg"/>
        <div className="flex flex-row justify-center items-center">
          <img src="src\assets\images\icon-personal-best.svg"/>
          <p className="text-neutral-400 ml-2">Best: <span className="text-neutral-50">92 WPM</span></p>
        </div>
      </header>

  <main className="flex flex-col justify-center items-center">
    {!isTestOver?
   
    <>
        <nav className="flex flex-row justify-center mb-4 w-full">
          <div className="flex flex-col items-center flex-1">
            <p className="text-neutral-400">WPM:</p>
            <p className="text-neutral-50 font-soraBold">0</p>
          </div>
          <div className="border-l border-r flex flex-col items-center flex-1">
            <p className="text-neutral-400">Accuracy:</p>
            <p className="text-neutral-50 font-soraBold">100%</p>
          </div>
          <div className="flex flex-col items-center flex-1">
            <p className="text-neutral-400">Time:</p>
            <p className="text-neutral-50 font-soraBold">0:{String(timer).padStart(2, "0")}</p>
          </div>
        </nav>
   
          <div className="flex flex-row justify-center items-center gap-4 mb-4 w-full">
            <div className="flex flex-col flex-1">
              <div className="border border-neutral-400 pr-4 pl-4 flex flex-row justify-center items-center gap-2 rounded-md" onClick={()=>setIsDifficultyMenuDisplayed(prevVal=>!prevVal)}>
                <p className="text-neutral-200">{passageDifficulty}</p>
                <img src="src\assets\images\icon-down-arrow.svg"/>
              </div>
              {isDifficultyMenuDisplayed && <div className="flex flex-col justify-center items-center text-neutral-50 bg-neutral-800">
                <div className="flex flex-row w-full pt-1 pb-1">
                    <input className="mr-2 ml-2" type="radio" name="difficulty" value="easy" checked={passageDifficulty === "Easy"? true: false} onChange={()=>setPassageDifficulty("Easy")}></input>
                    <p>Easy</p>
                </div>
                <div className="flex flex-row border-t border-b w-full pt-1 pb-1">
                  <input className="mr-2 ml-2" type="radio" name="difficulty" value="medium"  checked={passageDifficulty === "Medium"? true: false} onChange={()=>setPassageDifficulty("Medium")}></input>
                  <p className="pr-2">Medium</p>
                </div>
                <div className="flex flex-row w-full pt-1 pb-1">
                  <input className="mr-2 ml-2" type="radio" name="difficulty" value="hard" checked={passageDifficulty === "Hard"? true: false} onChange={()=>setPassageDifficulty("Hard")}></input>
                  <p>Hard</p>
                </div>
              </div>}
            </div>

          <div className="flex flex-col flex-1">
            <div className="flex flex-row justify-center items-center gap-2 border border-neutral-400 rounded-md" onClick={()=>setIsTypeTestMenuDisplayed(prevVal=>!prevVal)}>
              <p className="text-neutral-200">Timed (60s)</p>
              <img src="src\assets\images\icon-down-arrow.svg" />
            </div>
            {isTestTypeMenuDisplayed && <div className="text-neutral-50 bg-neutral-800 ">
              <div className="flex flex-row border-b pt-1 pb-1 pr-2">
                <input className="mr-2 ml-2" type="radio" name="test-type" value="timed" checked={testType==="Timed (60s)"? true: false} onChange={()=>setTestType("Timed (60s)")}></input>
                <p>Timed (60s)</p>
              </div>
              <div className="flex flex-row pt-1 pb-1">
                <input className="mr-2 ml-2" type="radio" name="test-type" value="passage" checked={testType==="Passage"? true: false} onChange={()=>setTestType("Passage")}></input>
                <p>Passage</p>
              </div>
            </div>}
          </div>
        </div>

       
        <div className={`text-neutral-50 border-t ${!isInitialScreen? "border-b": ""} p-2 mb-2 relative`}>
          <p className={`pt-4 ${isInitialScreen? "blur-sm": ""}`}>{passage}</p>
            {isInitialScreen && <div className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <button className="text-neutral-50 bg-blue-600 p-2 rounded-md mb-4 hover:bg-blue-400" onClick={startTest}>Start Typing Test</button>
          <p className="text-neutral-50">Or click the text and start typing</p>
        </div>}
        </div>
        {!isInitialScreen && <button className="flex flex-row gap-2 text-neutral-50 bg-neutral-800 mt-4 mb-4 p-2 rounded-md" onClick={()=>{
          setIsTestOver(false)
          setIsInitialScreen(true)
          
          }}>Restart Test <img src="src/assets/images/icon-restart.svg"/></button>}
      
        </>:
        <div className="flex flex-col justify-center items-center gap-2">
          <img src="src/assets/images/pattern-star-2.svg"/>
          <img src={isFirstTest? "src/assets/images/icon-new-pb.svg": "src/assets/images/icon-completed.svg"}/>  
          <h1 className="text-neutral-50 font-soraBold">{resultsHeader}</h1>
          <p className="text-neutral-400">{resultsText}</p>
          <div className="border w-full mt-2 rounded pt-2 pb-2 pl-2">
            <p className="text-neutral-400">WPM:</p>
            <p className="text-neutral-50 font-soraBold">85</p>
          </div>
          <div className="border w-full mt-4 mb-4 rounded pt-2 pb-2 pl-2">
            <p className="text-neutral-400">Accuracy:</p>
            <p className="text-green-500 font-soraBold">100%</p>
          </div>
          <div className="border w-full rounded pt-2 pb-2 pl-2">
            <p className="text-neutral-400">Characters:</p>
            <p className="font-soraBold"><span className="text-green-500">120</span><span className="text-neutral-400">/</span><span className="text-red-500">5</span></p>
          </div>
          <button className="flex flex-row gap-2 text-neutral-50 bg-neutral-800 mt-4 mb-4 p-2 rounded-md" onClick={()=>{
            setIsTestOver(false)
            setIsInitialScreen(true)}}>Go Again <img src="src/assets/images/icon-restart.svg"/></button>
            <img src="src/assets/images/pattern-star-1.svg"/>
        </div>}
      </main>
      <footer className="text-neutral-50">JDJD Codes <FontAwesomeIcon icon={faScaleBalanced}/></footer>
    </div>
  )
}

export default App
