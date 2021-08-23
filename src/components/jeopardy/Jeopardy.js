import React, { Component } from 'react';

class Jeopardy extends Component {

  state = {
    data: {},
    isLoading: true,
    currentAnswer: "",
    score: 0
  }

  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
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
                isLoading: false
            });
        })
        //handle any errors/failures with getting data from the API
        .catch((error) => {
            console.log(error)
        });
  }

  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }

handleChange = (event) => {
    this.setState({
        currentAnswer: event.target.value
    });
};

handleSubmit = (event) => {
    event.preventDefault();
}

  //display the results on the screen
  render() {
     return (
      <div>
        <div>Category: {!this.state.isLoading? this.state.data.category.title : null}</div>
        {/* Displaying the question to help you get started */}
        <div>Question: {this.state.data.question}</div>
        <div>Value: {this.state.data.value}</div>
      <form>
          <label>
                Answer: 
                <input type ="text" onChange={this.handleChange}  name="name"/>
          </label>
          <label>
              <input type="submit" name="submit"/>
          </label>
      </form>
        <div>User Score: {this.state.score}</div>
      </div>
    );
  }
}

export default Jeopardy;