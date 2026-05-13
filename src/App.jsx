import { useState, useEffect, useRef } from 'react'
import data from './data.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons'

function App() {
  //state variables
  const [isInitialScreen, setIsInitialScreen] = useState(true)
  const [isFirstTest, setIsFirstTest] = useState(false)
  const [isHighScore, setIsHighScore] = useState(true)
  const [isTestOver, setIsTestOver] = useState(false)
  const [isDifficultyMenuDisplayed, setIsDifficultyMenuDisplayed] = useState(false)
  const [isTestTypeMenuDisplayed, setIsTypeTestMenuDisplayed] = useState(false)
  const [isMenuDisabled, setIsMenuDisabled] = useState(false)
  const [passage, setPassage] = useState(data.hard[0].text)
  const [passageDifficulty, setPassageDifficulty] = useState("Hard")
  const [testType, setTestType] = useState("Timed (60s)")
  const [timer, setTimer] = useState(10)
 
  const [typedText, setTypedText] = useState([])
  //refs 
  const intervalRef = useRef(null)

  //function - starts test upon click of "Start Typing Test" button 
  function startTest(){
    setIsInitialScreen(false)
    setIsDifficultyMenuDisplayed(false)
    setIsTypeTestMenuDisplayed(false)
    setIsMenuDisabled(true)
    const randomNumber = Math.floor(Math.random()*10)
    setPassage(data[passageDifficulty.toLowerCase()][randomNumber].text)

    if (testType === "Timed (60s)"){
      intervalRef.current = setInterval(()=>{
        
          setTimer(prevTime=>{
           if (prevTime !== 0){
              return prevTime-1}
            else{
              setIsTestOver(true)
              setIsMenuDisabled(false)
              setTypedText([])
              clearInterval(intervalRef.current)
              setTimer(10)
            }})},1000)
  }}

  //function - restarts test if user clicks "Go Again" during a test 
  function restartTest(){
    clearInterval(intervalRef.current)
    setTimer(10)
    setIsTestOver(false)
    setIsInitialScreen(true)
    setIsMenuDisabled(false)
  }

  function handleKeyPress(e){
    if (!isTestOver){
      setTypedText((prevKey)=>[...prevKey, e.key])
    }}

 console.log("typedText", typedText)
 console.log("passage", passage)

  useEffect(()=>{
    window.addEventListener("keydown", handleKeyPress)
    return () => {
    window.removeEventListener("keydown", handleKeyPress);
  }
  },[] )

//TODO: fix the hover color of the restart arrow  
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
    <div className="bg-neutral-900 flex flex-col justify-center items-center m-auto font-soraReg p-4">

      <header className="flex flex-row justify-between items-center w-full mb-4">
        <img className="md:hidden" src="src\assets\images\logo-small.svg"/>
        <div className="hidden md:block md:flex md:flex-row gap-2">
          <img src="src\assets\images\logo-small.svg"/>
          <div >
            <h1 className="text-neutral-50 font-black tracking-wide">Typing Speed Test</h1>
            <p className="text-neutral-400 text-xs">Type as fast as you can in 60 seconds</p>
          </div>
        </div>
        <div className="flex">
          <img src="src\assets\images\icon-personal-best.svg"/>
          
            <span className="hidden md:block text-neutral-400 ml-2 mr-1">Personal </span>
            <p className="text-neutral-400 mr-2">Best: </p> 
            <span className="text-neutral-50">92 WPM</span>
         
        </div>
      </header>
  {/* Fix the below main element layout for small and large screens*/}
  <main className="flex flex-col md:justify-between border">
    {!isTestOver?
   
    <>
        <nav className="flex flex-row justify-center mb-4 w-full md:hidden">
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
            <p className="text-neutral-50 font-soraBold" ref={intervalRef}>0:{String(timer).padStart(2, "0")}</p>
          </div>
        </nav>

          {/*Difficulty Menu for small screens*/}
          <div className="flex flex-row justify-center items-center gap-4 mb-4 w-full md:hidden">
            <div className="flex flex-col flex-1">
              <div className="border border-neutral-400 pr-4 pl-4 flex flex-row justify-center items-center gap-2 rounded-md cursor-pointer" onClick={()=>{if (!isMenuDisabled){setIsDifficultyMenuDisplayed(prevVal=>!prevVal)}}}>
                <p className="text-neutral-200">{passageDifficulty}</p>
                <img src="src\assets\images\icon-down-arrow.svg"/>
              </div>
              {isDifficultyMenuDisplayed && <div className="flex flex-col justify-center items-center text-neutral-50 bg-neutral-800">
                <label htmlFor="easy" className="flex flex-row w-full pt-1 pb-1 cursor-pointer">                
                    <input id="easy" className="mr-2 ml-2" type="radio" name="difficulty" value="easy" checked={passageDifficulty === "Easy"? true: false} onChange={()=>setPassageDifficulty("Easy")}></input>
                    <p>Easy</p>           
                </label>
                <label htmlFor="medium" className="flex flex-row border-t border-b w-full pt-1 pb-1 cursor-pointer">
                  <input id="medium" className="mr-2 ml-2" type="radio" name="difficulty" value="medium"  checked={passageDifficulty === "Medium"? true: false} onChange={()=>setPassageDifficulty("Medium")}></input>
                  <p className="pr-2">Medium</p>
                </label>
                <label className="flex flex-row w-full pt-1 pb-1 cursor-pointer">
                  <input id="hard" className="mr-2 ml-2" type="radio" name="difficulty" value="hard" checked={passageDifficulty === "Hard"? true: false} onChange={()=>setPassageDifficulty("Hard")}></input>
                  <p>Hard</p>
                </label>
              </div>}
            </div>

          {/*Test Type Menu for small screens*/}
          <div className="flex flex-col flex-1">
            <div className="flex flex-row justify-center items-center gap-2 border border-neutral-400 rounded-md cursor-pointer" onClick={()=>{if (!isMenuDisabled){setIsTypeTestMenuDisplayed(prevVal=>!prevVal)}}}>
              <p className="text-neutral-200">{testType}</p>
              <img src="src\assets\images\icon-down-arrow.svg" />
            </div>
            {isTestTypeMenuDisplayed && <div className="text-neutral-50 bg-neutral-800 ">
              <label htmlFor="timed" className="flex flex-row border-b pt-1 pb-1 pr-2 cursor-pointer">
                <input id="timed" className="mr-2 ml-2" type="radio" name="test-type" value="timed" checked={testType === "Timed (60s)"? true: false} onChange={()=>setTestType("Timed (60s)")}></input>
                <p>Timed (60s)</p>
              </label>
              <label htmlFor="passage" className="flex flex-row pt-1 pb-1 cursor-pointer">
                <input id="passage" className="mr-2 ml-2" type="radio" name="test-type" value="passage" checked={testType === "Passage"? true: false} onChange={()=>setTestType("Passage")}></input>
                <p>Passage</p>
              </label>
            </div>}
          </div>
        </div>

        {/*Difficulty Menu for medium/large screens*/}   
        <nav className="hidden md:block border flex flex-row">
          <div className="flex flex-row">
            <div>
              <p className="text-neutral-400">WPM:</p>
              <p className="text-neutral-50 font-soraBold">0</p>
            </div>
            <div className="border-l border-r">
              <p className="text-neutral-400">Accuracy:</p>
              <p className="text-neutral-50 font-soraBold">100%</p>
            </div>
            <div>
              <p className="text-neutral-400">Time:</p>
              <p className="text-neutral-50 font-soraBold" ref={intervalRef}>0:{String(timer).padStart(2, "0")}</p>
            </div>
          </div>
          <div>
            <p className="text-neutral-400">Difficulty: </p>
            <button className="text-neutral-50 border border-neutral-400 hover:border-blue-400 hover:text-blue-400">Easy</button>
            <button className="text-neutral-50 border border-neutral-400 hover:border-blue-400 hover:text-blue-400">Medium</button>
            <button className="text-neutral-50 border border-neutral-400 hover:border-blue-400 hover:text-blue-400">Hard</button>
          </div>
        </nav>

        <div className={`text-neutral-50 border-t cursor-pointer ${!isInitialScreen? "border-b": ""} p-2 mb-2 relative`} onClick={startTest}>
          <p className={`pt-4 ${isInitialScreen? "blur-sm": ""}`}>{passage.split("").map((passageLetter, index)=>{
            return <span className={passageLetter[index] === typedText[index]? "text-green-500": "text-red-500"}>{passageLetter}</span>
              
            })}</p>
            {isInitialScreen && <div className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <button className="text-neutral-50 bg-blue-600 p-2 rounded-md mb-4 hover:bg-blue-400">Start Typing Test</button>
          <p className="text-neutral-50">Or click the text and start typing</p>
        </div>}
        </div>
        {!isInitialScreen && <button className="flex flex-row gap-2 text-neutral-50 bg-neutral-800 mt-4 mb-4 p-2 rounded-md" onClick={restartTest}>Restart Test <img src="src/assets/images/icon-restart.svg"/></button>}
      
        </>:
        <div className="flex flex-col justify-center items-center gap-2">
          {isHighScore? "":<img className="mr-auto w-6" src="src/assets/images/pattern-star-2.svg"/>}
          <img src={isHighScore? "src/assets/images/icon-new-pb.svg": "src/assets/images/icon-completed.svg"}/>  
          <h1 className="text-neutral-50 font-soraBold tracking-wide text-xl">{resultsHeader}</h1>
          <p className="text-neutral-400 text-center">{resultsText}</p>
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
          <button className="flex flex-row gap-2 text-neutral-50 bg-neutral-800 mt-4 mb-4 p-2 rounded-md hover:bg-neutral-50 hover:text-neutral-800" onClick={()=>{
            setIsTestOver(false)
            setIsInitialScreen(true)
            }}>{isFirstTest? "Beat This Score": "Go Again"}<img src="src/assets/images/icon-restart.svg"/></button>
            {isHighScore? <img className="z-0 relative" src="src/assets/images/pattern-confetti.svg"/>: <img className="ml-auto w-8" src="src/assets/images/pattern-star-1.svg"/>}
        </div>}
      </main>
      <footer className="text-neutral-50">JDJD Codes <FontAwesomeIcon icon={faScaleBalanced}/></footer>
    </div>
  )
}

export default App
