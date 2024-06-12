import React, { useEffect, useState } from 'react'
import './Exam.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export const Exam = () => {
  const [exams, setExams] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/read/quiz/read')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setExams(data);
      });
  }, []);
  return (
    <div className='con-exam'>
          {exams.map(exam=> 
          <>
            <div className="container-exam">
              <h3>{exam.name_exam}</h3> 
              <p>Duration: {exam.duration}</p>
              <p>Number of Questions: {exam.num_quest}</p>
              <Link to={`/details/${exam.id}`}><button>Attend Quiz</button></Link>
            </div>
            <br></br>
          </>
            
          )}
    
    </div>
  )
}
