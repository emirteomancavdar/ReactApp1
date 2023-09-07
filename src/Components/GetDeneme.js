import React, { useState } from 'react';
import axios from 'axios';

function GetDeneme() {
  const [tasks, setTasks] = useState([]);
  const [fetching, setFetching] = useState(false);  // State to track fetching status
  const [filteredTasks, setFilteredTasks] = useState([]);  // State to hold filtered tasks

  const fetchTasks = () => {
    setFetching(true);
    axios.get('https://my-json-server.typicode.com/typicode/demo/posts')  // Use JSONPlaceholder endpoint
      .then(response => {
        setTasks(response.data);
        setFetching(false);
        setFilteredTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setFetching(false);
      });
  };

  const filterTasks = (category) => {
    if (category === 'all') {
      setFilteredTasks(tasks);  // Show all tasks
    } else if(category === 'Category A') {
      const filtered = tasks.filter(task => task.title === 'Post 1');
      setFilteredTasks(filtered);
    }

  };

  return (
    <div>
      <h2>Task List</h2>
      <button onClick={fetchTasks} disabled={fetching}>
        {fetching ? 'Fetching...' : 'Fetch Tasks'}
      </button>
      <div>
        <button onClick={() => filterTasks('all')}>All Tasks</button>
        <button onClick={() => filterTasks('Category A')}>Category A</button>
        <button onClick={() => filterTasks('Category B')}>Category B</button>
        {/* Add more buttons for other categories */}
      </div>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default GetDeneme;