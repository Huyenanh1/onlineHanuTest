import React, { useState, useEffect } from 'react'
import '../QuizRead/Quiz.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuizListen = () => {
    const [user, setUser] = useState(null);

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
    const[answers, setAnswer] = useState('');

    async function getOptions(objs) {
        const responses = [];
        for (let obj of objs) {
                const response = await fetch(`http://localhost:5000/listenOption/${obj.id}`);
                let json= await response.json();
                responses.push(json) ;
        }
        setOptions(responses)
        return responses
    }
    let count = 0;
    function getCheckedValue(){
        for(let i = 0; i < questions.length; i++){
            let radios = document.getElementsByName('q'+ i +'-options');
            for (var y = 0; y < radios.length; y++){
                if(radios[y].checked){
                    count++;
                }
            }
           
        }
        setAnswer(count);
    }

    const insertData = async (e) => {
        e.preventDefault();
        let params={
            exam: id,
            user: user.sub,
            ques: answers
        };
    
        axios.post(`http://localhost:5000/history`,params )
        .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
    
    useEffect(()=> {
        let option = [];
        getUser();
        getCheckedValue();
        axios.get(`http://localhost:5000/listen/`+id).then((resp1) => {
        setQuestions(resp1.data);
        getOptions(resp1.data)

     }).catch((error) => { console.log(error) });
    }, [])
    
  return (
     <div className="container-quiz">
        <div className="question">
            <h2 className="text-light">KỸ NĂNG: NGHE HIỂU</h2>
            <div className="grid-1">
                <div className="grid-test">
                    <div className="list-ques">
                    <ul className='list-of-ques' >    
                        {questions.map((question,j) =>
                            <li>  
                            {'Câu ' + (j+1) +': ' + question.content}
                            <ul className="ques" >
                            {options[j]?.map(option => 
                                <li>
                                    <label>
                                        <input type="radio" 
                                               name = {`q${j}-options`} 
                                               value={option.id} 
                                               />
                                        <span>{option.content}</span>
                                    </label>
                                </li> 
                            )}    
                            </ul>
                            </li>            
                        )}
                    </ul>
                    </div>  
                </div>
            </div> 
            
        </div>
        <div className="grid">
                <button className='prev' onClick={insertData}>Submit</button>
        </div> 
     </div>
  )
}

export default QuizListen 