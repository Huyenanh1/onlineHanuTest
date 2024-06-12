import React from 'react'
import { ExamSpeak } from "../components/ExamSpeak"
const Speak = () => {
  return (
    <div className='read-container'>
      <div style={{textAlign:"center", fontWeight:"600", margin:"40px"}}>Kỹ năng: Nói</div>
      <ExamSpeak/>
      
    </div>
  )
}

export default Speak