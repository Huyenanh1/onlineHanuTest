import React, { useEffect, useState } from 'react'
import './Exam/Exam.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export const ExamWrite = () => {
  const [exams, setExams] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/read/quiz/write')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setExams(data);
      });
  }, []);
  return (
    <>
          {exams.map(exam=> 
          <>
            <div className="container-exam">
              <h3>{exam.name_exam}</h3> 
              <p>Duration: {exam.duration}</p>
              <p>Number of Parts: {exam.num_quest}</p>
              <Link to={`/listen/${exam.id}`}><button>Attend Quiz</button></Link>
            </div>
            <br></br>
          </>
            
          )}
    
    </>
  )
}
