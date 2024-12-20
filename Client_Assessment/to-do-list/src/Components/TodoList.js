/**
 * The provided code is a React class component for a To-Do List application
 * that lets users add and display tasks. It employs React's state management to 
 * track tasks in an array and a user's input in a text field.
 */

// Importing the necessary functionalities from the 'react' package.
import React, { Component } from 'react';

// Defining the TodoList class
class TodoList extends Component {
  constructor(props) {
    super(props);
    // Setting the initial state with two properties: 'items' (an array) and 'newItem' (a string).
    this.state = {
      items: [],
      newItem: ''
    };
  }

  // function to adds a new item to the todo list.
  handleAddItem = () => {
    // Destructuring 'newItem' and 'items' from the state.
    const { newItem, items } = this.state;
    if (newItem.trim() !== '') {
      // Updating the state with the new item added to the 'items' array and resetting 'newItem'.
      this.setState({
        items: [...items, newItem],
        newItem: ''
      });
    }
  };

  // render method to describe what to display on the UI.
  render() {
    const { items, newItem } = this.state;

    // Returning the JSX structure.
    return (
      <div>
        <h2>To-Do List</h2>
        <ul>
          {/* Mapping over the 'items' array to render each item in an li element. */}
          {items.map((item, index) => (
            <li key={index}>{item}</li> // Using the index as a key for each list item.
          ))}
        </ul>
        <div>
          <input
            type="text"
            value={newItem} // The value of the input is controlled by the 'newItem' state.
            onChange={(e) => this.setState({ newItem: e.target.value })} // Updating 'newItem' in the state as the user types.
            placeholder="Add new item"
          />
          <button onClick={this.handleAddItem}>Add</button> // Button to add the new item.
        </div>
      </div>
    );
  }
}

export default TodoList;
