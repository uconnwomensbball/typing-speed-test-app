import { useState } from 'react'


function App() {

  const [isInitialScreen, setInitialScreen] = useState(true)
  return (
    <>
      <header className="flex flex-row justify-between items-center">
        <img src="src\assets\images\logo-small.svg"/>
        <div>
        <img src="src\assets\images\icon-personal-best.svg"/>
        <p>Best: 92 WPM</p>
        </div>
      </header>

      <main>
        <nav>
          <div>
            <p>WPM:</p>
            <p>0</p>
          </div>
          <div>
            <p>Accuracy:</p>
            <p>100%</p>
          </div>
          <div>
            <p>Time:</p>
            <p>0:60</p>
          </div>
        <select>
          <option><button type="radio"></button>Hard</option>
          <option><button type="radio"></button>Medium</option>
          <option><button type="radio"></button>Easy</option>
        </select>
        <select>
          <option><button type="radio"></button>Timed (60s)</option>
          <option><button type="radio"></button>Passage</option>
        </select>
        </nav>
        <button>Start Typing Test</button>
        <p>Or click the text and start typing</p>
      
      </main>
    </>
  )
}

export default App
