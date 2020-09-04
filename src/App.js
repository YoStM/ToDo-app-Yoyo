import React, {useState} from 'react';
import './App.css';

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
  const [todos, setTodos] = useState(['Take dogs for a walk', 'Take the rubbish out', 'Do the homeworks']);

  // a hook
  const [input, setInput] = useState('');
  console.log(input);

  // add todo function
  const addTodo = (event) => {

    event.preventDefault();
      //this will fire off when we click the button
      console.log('I am clicking ');
      // Pushing via the "spread" the last input at the end of the todos array
      // We append the last input to the todos array
      setTodos([...todos, input]);
      // Resets the input field
      setInput('');
  }

  // This is an arrow function that loops into the todos array and displays what is in the array
  // {todos.map(todo => (
  //    <li>{todo}</li>
  // ))}
  return (
    <div className="App">
      <h1>Hello World! {22+11}</h1>

      <form>
      <input value={input} onChange={event => setInput(event.target.value)}/>
      <button type="submit" onClick={addTodo}>Add Todo</button>
      </form>
      <ul>
        
        {todos.map(todo => (
          <li>{todo}</li>
        ))}
        
      </ul>

    </div>
  );
}

export default App;
