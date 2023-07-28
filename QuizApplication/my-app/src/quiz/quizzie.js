import { Button } from "@mui/material";
import './quizzie.css';
import { useState, useEffect } from "react";
import axios from 'axios';

function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState(new Map());
  const [score, setScore] = useState(null);

  useEffect(() => {
    getQuizData();
  }, []);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getQuizData = () => {
    axios.get('https://opentdb.com/api.php?amount=10&category=28&difficulty=medium&type=multiple')
      .then(function (response) {
        const data = [];
        response.data['results'].forEach((e, index) => {
          let answers = e.incorrect_answers;
          answers.push(e.correct_answer);
          e.answers = shuffle(answers);
          data.push(e);
        })
        setQuizData(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const changeQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  }

  const handleAnswerClick = (ans) => {
    const currentQuestionId = quizData[currentQuestion].id;
    const updatedUserAnswer = new Map(userAnswer);
    updatedUserAnswer.set(currentQuestionId, ans);
    setUserAnswer(updatedUserAnswer);
  }

  const calculateScore = () => {
    let score = 0;
    quizData.forEach((que) => {
      const userSelectedAnswer = userAnswer.get(que.id);
      if (userSelectedAnswer === que.correct_answer) {
        score = score + 1;
      }
    });
    return score;
  }

  const handleEndQuiz = () => {
    const finalScore = calculateScore();
    setScore(finalScore);

  }

  if (quizData.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuiz = quizData[currentQuestion];

  return (
    <div className="quizContainer">
      <div style={{ background: '#2e3244' }}>{currentQuestion + 1}</div>
      <div>
        <div className="quesTitle">{currentQuestion + 1}. {currentQuiz.question}</div>

        <div className="answerContainer">

          {currentQuiz.answers.map((ans, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
             <Button variant="contained" style={{width:'100%'}}
              color={userAnswer.get(currentQuiz.id) === ans ? "success" : "primary"}
              onClick={() => handleAnswerClick(ans)}
            >
              {ans}
            </Button>
            <hr/>
            </div>
         
          ))}

        </div>

        {currentQuestion < quizData.length - 1 ? (
          <Button variant="contained" color="primary" onClick={changeQuestion}>
            Next
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleEndQuiz}>
            Calculate The Score
          </Button>
        )}

<div class="scores">
      {score !== null && (
        <div class="displayScore" style={{marginTop:'45px'}}>
         <div class="score">
         <div class="circle">
         <h2>Your Score:{score}</h2>
         </div>
         </div>
         <div class="text">
         <h3>You have completed your quiz!</h3>
         </div>
        
         <div class="button">
         
    <Button variant="contained" style={{backgroundColor:'#2b6777',marginLeft:'10px' }}>PlayAgain</Button>
    <Button variant="contained" style={{backgroundColor:'red',marginLeft:'10px'}} >End Quiz</Button>
    </div>
    </div>
      
      )}
      </div>

      </div>
      <div style={{ background: '#2e3244' }}>
     
      </div>
      
    </div>
  )
}

export default Quiz;

