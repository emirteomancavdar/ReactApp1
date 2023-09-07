import React, { useState } from 'react';
import axios from 'axios';

function AddTaskForm() {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('https://my-json-server.typicode.com/typicode/demo/posts', { title: newTaskTitle })  // Update with your actual endpoint
      .then(response => {
        console.log('Task added successfully:', response.data);
        // You can update the task list or perform other actions here
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          placeholder="Task title"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTaskForm;