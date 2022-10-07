import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Button, Chip, Grid, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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

  const [seconds, setSeconds] = useState(15)
  const [minutes, setMinutes] = useState(0)

  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
        if (minutes == 0) {
          setSeconds(59);
        }
      }
    }, 1000);
    if (minutes == 0 && seconds == 0) {
      clearInterval(timer)
      setShowResult(true);
    }
    return () => clearInterval(timer)
  })

  return (

    <div className="App">
      <header className="App-header">
        {showResult ? (
          <Box sx={{padding:"25px" , border:"2px solid white",borderRadius:"15px"}}>
            <Typography variant='h4' sx={{margin:"10px"}}>Report Card</Typography>
            <Typography variant='h5'>Your Score : {score}</Typography>
            <Typography variant='h5'>Percentage : {((score / Questions.length )* 100 ).toFixed(1)}%</Typography>
            <Typography variant='h5'>Attemped Questions : {score}</Typography>
            <Typography variant='h5'>Wrong Questions :{Questions.length - score}</Typography>
            <Button variant="outlined" startIcon={<RestartAltIcon />} sx={{margin:"8px"}} color="inherit" onClick={() => {
              setindexnumber(0);
              setShowResult(false);
              setscore(0)
              setMinutes(1);
              setSeconds(30);
              clearInterval(timer);
            }}>
              Reattempt Quiz
            </Button>
          </Box>
        ) : null}
        {!showResult ? (
          <Box >

            <Typography variant='h3' >Quiz App</Typography>
            <Box className="deco" sx={{ marginTop: "80px" }} >

              <Box >
                <LinearProgress 
                 variant="determinate"
                 color='inherit'
                 value={(indexnumber + 1) * 20}
                 sx={{ height: "8px", borderRadius: "10px", marginBottom: "20px" }}
                />
                <Typography variant='h5'  >Question # {indexnumber} / {Questions.length}</Typography>
              </Box>
              <Box> <Typography sx={{ display: "flex", justifyContent: "end" }}>Time  {minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</Typography> </Box>
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
          </Box>
        ) : null}

      </header>
    </div>
  );
}

export default App;
