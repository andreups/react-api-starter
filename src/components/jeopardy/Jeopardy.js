import React, { Component } from "react";
import JeopardyDisplay from "../jeopardyDisplay/jeopardyDisplay";

class Jeopardy extends Component {
  state = {
    data: {},
    isLoading: true,
    currentAnswer: "",
    score: 0,
  };

  //get a new random question from the API and add it to the data object in state
  getNewQuestion = (event) => {
    //use fetch to make an API call and get a random Jeopardy question (returns a promise)
    fetch(`https://jservice.io/api/random`)
      //on success of the fetch request, turn the response that came back into JSON
      .then((response) => response.json())
      //on success of turnig the response into JSON (data we can work with), lets add that data to state
      .then((data) => {
        //put the data in the console just so we can see it
        console.log("data from the api", data);

        //update state with the data from the API causing the page to re-render
        this.setState({
          data: data[0], //grab the first question from the array returned
          isLoading: false,
        });
      })
      //handle any errors/failures with getting data from the API
      .catch((error) => {
        console.log(error);
      });
  };

  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }

  handleChange = (event) => {
    this.setState({
      currentAnswer: event.target.value,
    });
  };

  handleSubmit = (event) => {
    // Preventing the page from reloading
    event.preventDefault();

    if (
      this.state.currentAnswer.toLowerCase() ===
      this.state.data.answer.toLowerCase()
    ) {
      this.setState((state, props) => ({
        score: state.score + this.state.data.value,
        currentAnswer: "",
      }));
    } else {
      this.setState((state, props) => ({
        score: state.score - this.state.data.value,
        currentAnswer: "",
      }));
    }
    this.getNewQuestion();
  };

  //display the results on the screen
  render() {
    return (
      <div>
        <JeopardyDisplay
          data={this.state.data}
          isLoading={this.state.isLoading}
          currentAnswer={this.state.currentAnswer}
          score={this.state.score}
          getNewQuestion={this.getNewQuestion}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Jeopardy;
