import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const ExerciseCard = (props) => {
  let history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);

  let activeChoice = "";

  //===========creating options============//

  let items = [];
  let options = [];

  for (let i = 0; i < props.flashcards.length; i++) {
    items.push(props.flashcards[i].sign);
  }

  const createOptions = (choices, answer) => {
    let options = [];
    let uniqueOptions = [];
    for (let i = 0; i < 4; i++) {
      let index = Math.floor(Math.random() * choices.length);
      options.push(choices[index]);
    }
    if (!options.includes(answer)) {
      options[Math.floor(Math.random() * choices.length)] = answer;
    }
    do {
      uniqueOptions = [...new Set(options)];
      options.push(choices[Math.floor(Math.random() * choices.length)]);
    } while (uniqueOptions.length < 4);
    return uniqueOptions;
  };

  options = createOptions(items, props.exerciseData[currentIndex].sign);
  console.log("options", options, props.exerciseData[currentIndex].sign);

  //============end of creating options============//

  function nextHandler(choice, correctAnswer) {
    if (choice === correctAnswer) {
      setCurrentIndex(currentIndex + 1);
      if (currentIndex === props.exerciseData.length - 1) {
        history.push("/ExerciseSuccess");
        //put axios
      }
    } else {
      setLives(lives - 1);
      if (lives === 0) {
        history.push("/ExerciseFail");
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }
  }
  return (
    <>
      {console.log("CURRENT INDEX", currentIndex)}
      <div className="livesBar">
        <img
          className="progressBarExercise"
          src={process.env.PUBLIC_URL + "/images/icons/progressBarColor.png"}
          alt="A progress Bar"
        />
        <img
          className="heartExercise"
          src={process.env.PUBLIC_URL + "/images/exercises/heart.png"}
          alt="A heart"
        />
        <h2>{lives}</h2>
      </div>
      <div className="exerciseCards">
        {props.exerciseData[currentIndex].showImage ? (
          <>
            <h2>Which letter is this?</h2>
            <img
              src={props.exerciseData[currentIndex].visual}
              alt="picture of sign"
            ></img>
            {options.map((character) => {
              return (
                <button
                  onClick={() => {
                    activeChoice = character;
                    console.log("activeChoice: ", activeChoice);
                  }}
                >
                  {character}
                </button>
              );
            })}
          </>
        ) : (
          <>
            <p>Which of these is "{props.exerciseData[currentIndex].sign}"</p>
            {options.map((character) => {
              let localVar = props.flashcards.filter((each) => {
                return each.sign === character;
              })[0].visual;
              console.log("localVar", localVar);
              return (
                <img
                  src={localVar}
                  onClick={() => {
                    activeChoice = character;
                    console.log("activeChoice: ", activeChoice);
                  }}
                />
              );
            })}
          </>
        )}

        <button
          onClick={() =>
            nextHandler(activeChoice, props.exerciseData[currentIndex].sign)
          }
        >
          SUBMIT
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseCard);
