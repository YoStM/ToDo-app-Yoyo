import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';


// In REACT everything is Component based
// This "App" component - which is referring to the entire component on the page - returns some HTML
// This is special HTML, this is called JSX. This means that we can run some javascript within the HTML code by adding {}
// Inside of these {} there will be our javascript code - So we can run dynanmic javascript with JSX
function App() {

  // Setting up a piece of STATE
  // State has a short term memory
  // State gets cleared after refresh
  // 1- we add the import React, {useState} from 'react';
  // 2- we create a constant
  // In this instance we create an array of TO DOs and initiate it empty
  // This will be a little record - short term memory - of what the todos are
  const [todos, setTodos] = useState([]);

  // a hook
  const [input, setInput] = useState('');
  //console.log(input);

  //When the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // This is what gets triggered when the app.js loads
    //This piece of code is doing all of the listening. It's alwayls going to listen wether or not there is a change in database
    db.collection('todos').onSnapshot(snapshot => {
      //console.log(snapshot.docs.map(doc => doc.data().text));
      setTodos(snapshot.docs.map(doc => doc.data().text))
    })
  }, []);
  

  // add todo function
  const addTodo = (event) => {

    event.preventDefault();
      //this will fire off when we click the button
      //console.log('I am clicking ');
      
      db.collection('todos').add({
        text: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      
      // Pushing via the "spread" the last input at the end of the todos array
      // We append the last input to the todos array
      // setTodos([...todos, input]);
      // Resets the input field
      setInput('');
  }

  // This is an arrow function that loops into the todos array and displays what is in the array
  // {todos.map(todo => (
  //    <li>{todo}</li>
  // ))}
  return (
    <div className="App">
      <h1>ToDo-YoYo {22+11}</h1>

      <form>
      {/*<input value={input} onChange={event => setInput(event.target.value)}/>*/}
      {/* **|<FormControl>|** imported from material ui again
      Improving the visual over the previous **|<input/>|** above*/}
      <FormControl>
        <InputLabel>Write a todo</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
      </FormControl>
      {/*This a material ui/css google styles button. Been able to get this style by running the command
      **| npm install @material-ui/core |** in terminal and then importing the library into the file
      **| disable={!input} |** prevent the button from inserting a blank input.*/}
      <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
        Add Todo
      </Button>
      {/* <button type="submit" onClick={addTodo}></button> */}
      </form>
      <ul>
        {/*This is rendering a list of ToDos*/}
        {todos.map(todo => (
          <Todo text={todo} />
          //<li>{todo}</li>
        ))}
        
      </ul>

    </div>
  );
}

export default App;
