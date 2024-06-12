import React, { useState, useEffect } from 'react'
import './Quiz.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Quiz = () => {
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
    const [topics, setTopics] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);

    async function getQuestions(objs) {
        const responses = [];
            for (let obj of objs) {
                const response = await fetch(`http://localhost:5000/topics/${obj.id}`);
                const json = await response.json();
                responses.push(json)         
            }
        setQuestions(responses) 
        console.log(responses)
        return responses
    }
    async function getOptions(objs, id_topic) {
        const options = [];
        const responses = [];
        for (let obj of objs) {
            for (let o of obj) {
                const response = await fetch(`http://localhost:5000/options/${o.id}`);
                let json= await response.json();
                responses.push(json) ;    
            }
            options.push(responses)    
                
        }
        console.log(options)
        setOptions(responses)
        
        return responses
    }
    const insertData = async (e) => {
        e.preventDefault();
        let params={
            exam: id,
            user: user.sub,
        };
    
        axios.post(`http://localhost:5000/history`,params )
        .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
    useEffect(()=> {
        getUser();
        axios.get(`http://localhost:5000/details/`+id).then((resp1) => {
        setTopics(resp1.data);
        console.log(resp1.data)
        getQuestions(resp1.data).then((res) => {   
            getOptions(res) 
        })
        
     }).catch((error) => { console.log(error) });
    }, [])
    
  return (
     <div className="container-quiz">
        

        <div className="question">
            <h2 className="text-light">KỸ NĂNG: ĐỌC HIỂU</h2>
            {topics.map((topic,i) =>
            <div className="grid-1">
                <h4>Bài {i+1}</h4>
                <div className="grid-test">
                    <div className="paragraph">
                    <p key={`${topic.id+1}topic`}>{topic.content}</p>
                    </div> 
                    
                    <div className="list-ques">
                    {questions[i]?.map((question,j) => 
                        <ul className='ques' key={`${question.id}topic`}> 
                                {'Câu ' + (j+1) +': ' + question.content}
                            {options[j]?.map(option =>
                                <form>
                                <li>
                                    <input  type='radio'
                                        value={false}
                                        name='options'
                                        id= {`q${option.id}-choice`}
                                    /> 
                                    <label htmlFor={`q${option.id}-choice`}>{option.content}</label>
                                    <div className="check checked"></div>
                                </li> 
                                </form>
                            )}              
                        </ul>
                    )}
                    </div>   
                </div>
            </div> 
            )}
        </div>
        <div className="grid">
            <button className='prev' onClick={insertData}>Submit</button>
        </div>      

        
     </div>
  )
}

export default Quiz 