import React from 'react'

function JeopardyDisplay(props) {
    return(
        <div>
              <div>Category: {!props.isLoading ? props.data.category.title : null}</div>
        {/* Displaying the question to help you get started */}
        <div>Question: {props.data.question}</div>
        <div>Value: {props.data.value}</div>
      <form onSubmit={props.handleSubmit}>
          <label>
                Answer: 
                <input type ="text" onChange={props.handleChange} value={props.currentAnswer} name="userAnswer"/>
          </label>
          <label>
              <input type="submit" name="submit"/>
          </label>
      </form>
        <div>User Score: {props.score}</div>
        </div>
    )
}

export default JeopardyDisplay