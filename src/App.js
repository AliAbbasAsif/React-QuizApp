import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Button, Chip, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';


function App() {
  const [Questions, setQuestions] = useState([
    {
      id: 1,
      question: "Father of computer ______________?",
      options: ["Charlesbabage", "Jeffbezoz", "Thomas Edison", "Bill Gate"],
      correctoption: "Charlesbabage",
    },
    {
      id: 2,
      question: "Full Form of HTML ______________?",
      options: ["HyperTextmarkUplanguage", "hypertext", "html", "stylishshett"],
      correctoption: "HyperTextmarkUplanguage",
    },
    {
      id: 3,
      question: "Full form of Js ______________?",
      options: ["JavaScript", "java", "jquery", "JavaSheet"],
      correctoption: "JavaScript",
    },
    {
      id: 4,
      question: "What is Css ______________?",
      options: ["CascadeStylishSheet", "css", "Stylesheet", "styling"],
      correctoption: "CascadeStylishSheet",
    },
  ]);
  const [indexnumber, setindexnumber] = useState(0)
  const [score, setscore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  let checkQuestion = (a, b) => {
    if (a == b) {
      setscore(score + 1);
    }
    if (indexnumber + 1 == Questions.length) {
      setShowResult(true);
    } else {
      setindexnumber(indexnumber + 1);
    }
  }

  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)

  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1)
      if (seconds === 59) {
        setMinutes(minutes + 1)
        setSeconds(0)
      }
    }, 1000);
    if (indexnumber + 1 === Questions.length) {
      clearInterval(timer)
      setShowResult(true);
    }
    return () => clearInterval(timer)
  })

  return (

    <div className="App">
      <header className="App-header">
        {showResult || indexnumber == Questions.length ? <Typography variant='h5' sx={{ border: "2px solid white", padding: "15px", borderRadius: "15px" }}>Your Percetage is {(score / Questions.length) * 100} and you complete the quiz in {minutes} Minutes and {seconds} Seconds</Typography> :
          <Box >
           
            <Typography variant='h3' >Quiz App</Typography>
            <Box className="deco" sx={{ marginTop: "80px" }} >

              <Box >
                <Typography variant='h5'  >Question # {indexnumber} / {Questions.length}</Typography>
              </Box>
              <Box> <Typography sx={{ display: "flex", justifyContent: "end" }}>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</Typography> </Box>
              <Box>
                <Typography variant='h5' sx={{ marginBottom: "10px" }}>{Questions[indexnumber].question}</Typography>
                <Grid container>

                  {Questions[indexnumber].options.map((x, i) => (
                    <Grid item md={6}>
                      <Chip sx={{ color: "white", backgroundColor: "purple", marginX: "10px", marginY: "5px" }} key={i} label={x} onClick={() => {
                        checkQuestion(x, Questions[indexnumber].correctoption)
                      }} />
                    </Grid>
                  ))}

                </Grid>
              </Box>
            </Box>
          </Box>}

      </header>
    </div>
  );
}

export default App;
