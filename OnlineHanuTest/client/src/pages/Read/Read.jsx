import React from 'react'
import { Exam } from '../../components/Exam/Exam'
import './read.css'

const Read = () => {
  
  return (
    <div className='read-container'>
      <div style={{textAlign:"center", fontWeight:"600", margin:"40px"}}>Kỹ năng: Đọc Hiểu</div>
      <Exam/>
      
    </div>
    
  )
}

export default Read