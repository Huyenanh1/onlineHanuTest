import React, { useState, useEffect } from 'react'
import '../QuizRead/Quiz.css'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import  Timer from '../../components/timer/Timer';

const QuizSpeak = () => {
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
    const [questions2, setQuestions2] = useState([]);
    const [questions3, setQuestions3] = useState([]);

    const insertData = async (e) => {
        e.preventDefault();
        let params={
            exam: id,
            user: user.sub
        };
    
        axios.post(`http://localhost:5000/history`,params )
        .then(res => {
        console.log(res);
        })
        navigate('/')
    }
  
    useEffect(()=> {
        getUser();
        axios.get(`http://localhost:5000/speak/${id}/1`).then((resp1) => {
            setQuestions(resp1.data); 
        }).catch((error) => { console.log(error) });
        axios.get(`http://localhost:5000/speak/${id}/2`).then((resp1) => {
            setQuestions2(resp1.data); 
        }).catch((error) => { console.log(error) });
        axios.get(`http://localhost:5000/speak/${id}/3`).then((resp1) => {
            setQuestions3(resp1.data); 
        }).catch((error) => { console.log(error) });
    }, [])
    
  return (
     <div className="container-quiz">
        <Timer time = {3600}/>
        <div className="question">
            <h2 className="text-light">KỸ NĂNG: NÓI</h2>
                <div className="grid-1">
                <div className="grid-test">
                    <div className="list-ques">
                    <h4 style={{textAlign:"left"}}>PHẦN I. Tương tác xã hội (3 phút – không có thời gian chuẩn bị)
                    Thí sinh trả lời một số câu hỏi của giám khảo. Chẳng hạn các câu hỏi sau:</h4>
                    <ul className='list-of-ques' >    
                        {questions.map((question,j) =>
                            <li>  
                            {'Câu ' + (j+1) +': ' + question.content}
                            </li>            
                        )}
                    </ul>
                    <h4 style={{textAlign:"left"}}>PHẦN II. Thảo luận giải pháp (5 phút: gồm 1 phút chuẩn bị)</h4>
                    <p style={{textAlign:"left"}}><i>Thí sinh đưa ra một lựa chọn (về tình huống mà giám khảo đưa ra) và thuyết minh về lựa
                    chọn đó. Chẳng hạn:</i></p>
                    <ul className='list-of-ques' >    
                        {questions2.map((question,j) =>
                            <li>  
                            {'Quan điểm ' + (j+1) +': ' + question.content}
                            </li>            
                        )}
                    </ul>
                    <h4 style={{textAlign:"left"}}>PHẦN III. Phát triển chủ đề (7 phút: gồm 1 phút chuẩn bị)</h4>
                    <p style={{textAlign:"left"}}><i>Thí sinh lựa chọn và trình bày về một trong những chủ đề dưới đây. Sau đó trả lời một số câu
                    hỏi của giám khảo</i></p>
                    <ul className='list-of-ques' >    
                        {questions3.map((question,j) =>
                            <li>  
                            {'Chủ đề ' + (j+1) +': ' + question.content}
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

export default QuizSpeak 