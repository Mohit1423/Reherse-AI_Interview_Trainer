import React, { useEffect, useState } from 'react'
import Interview from './Interview';
import Interview_prep from './Interview_prep';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
function Main_Interview() {
    const [questions,setQuestions] = useState(null);
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    useEffect(() => {
        if(!user){
            navigate('/login');
        }
    })

  return (
    <>
    {
        questions ?<Interview questions={questions} setQuestions={setQuestions}/>: <Interview_prep setQuestions={setQuestions}/>
    }
    </>
  )
}

export default Main_Interview