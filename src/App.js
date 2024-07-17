import {useState, useEffect} from 'react';
import {
  hasDigits,
  hasLower,
  hasUpper,
  hasSpecial
} from './util.js'

export default function App() {
  const [passWord, setPassWord] = useState('')
  const [score, setScore] = useState(0)
  const [strength, setStrength] = useState('')


  const handleOnChange =(e) => {
    setPassWord(e.target.value)
  }

  useEffect(()=>{
    let totalScore = 0;
    let scoreByChar = 0;
    let scoreByLen = 0;
    let strengthText = ''
    if(passWord.length > 3) {
      scoreByLen = Math.min(6, Math.floor(passWord.length/3))
      if(hasDigits.test(passWord)) scoreByChar += 1;
      if(hasLower.test(passWord)) scoreByChar += 1;
      if(hasUpper.test(passWord)) scoreByChar += 1;
      if(hasSpecial.test(passWord)) scoreByChar += 1;
      totalScore = scoreByChar+scoreByLen;

    } else {
      totalScore = 0;
    }

    if(totalScore > 3 && totalScore <=6) {
      strengthText = ' / weak'
    } else if (totalScore > 6 && totalScore <= 8) {
      strengthText = ' / moderate'
    } else if (totalScore > 8) {
      strengthText = ' / strong'
    }

    setScore(totalScore)
    setStrength(strengthText)

}, [passWord])

  return (
    <main>
      <h2>Password Strength Checker</h2>
      <input style={ {width:"70%"}} type="text" maxLength="32" value={passWord} onChange = {handleOnChange}/>
      <progress style={{ width: "70%" }} max="10" value={score}>{score}</progress>
      <p>password strength is (out of 10): {score}{strength}</p>


    </main>
  );
}