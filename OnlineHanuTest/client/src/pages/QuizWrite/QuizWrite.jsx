import React, { useState, useEffect } from 'react'
import '../QuizRead/Quiz.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import  Timer from '../../components/timer/Timer';


const QuizWrite = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
	const getUser = async () => {
		try {
			const url = `http://localhost:5000/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};
    let {id} = useParams();
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);

    async function getOptions(objs) {
        const responses = [];
        for (let obj of objs) {
                const response = await fetch(`http://localhost:5000/writeOption/${obj.id}`);
                let json= await response.json();
                responses.push(json) ;
        }
        setOptions(responses)
        return responses
    }

    const insertData =  (e) => {
        e.preventDefault();
        let params={
            exam: id,
            user: user.sub,
            ques: 0
        };
    
        axios.post(`http://localhost:5000/history`,params )
        .then((res) => {
            console.log(res.data)
      })
      navigate('/');
    }
    
    useEffect(()=> {
        getUser();
        axios.get(`http://localhost:5000/write/`+id).then((resp1) => {
            setQuestions(resp1.data);
            console.log(resp1.data)
            getOptions(resp1.data)
        }).catch((error) => { console.log(error) });
    }, [])
  return (
    <div className="container-quiz">
        <Timer time = {3600}/>
        <div className="question">
            <h2 className="text-light">KỸ NĂNG: VIẾT</h2>
            <div className="grid-1">
                
                        {questions.map((question,j) =>
                            <div className="grid-test">
                                <div className="paragraph">
                                <b>Phần {(j+1)}: </b> {question.content}
                                </div>
                            
                            <div className="list-ques">
                                <ul className="ques" >
                                {options[j]?.map((option,i) => 
                                        <li>
                                            <span>({i+1}) </span>
                                            <input type='text'
                                                style={{marginRight:90, outline: "none"}}
                                                
                                            />
                                            <span >{option.content}</span>
                                        </li> 
                                )}    
                                </ul>
                                {question.part !== 1 &&
                                    <textarea style={{float: 'left', width: 600, height:200}}
                                        placeholder='Viết bài làm của bạn vào đây...'
                                    />
                                }
                                
                            </div>
                            </div>
                            
                            
                                     
                        )}
                
                    
                
            </div> 
            
        </div>
        <div className="grid">
                <button className='prev' onClick={insertData}>Submit</button>
        </div> 
     </div>
  )
}

export default QuizWrite