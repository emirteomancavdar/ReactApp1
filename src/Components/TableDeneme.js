import React from 'react';
import DenseTable from './DenseTable'; // Assuming you named the above component file "DenseTable.js"
import jsonData from './data.json'; // Import your JSON data

function App() {
  return (
    <div>
      {/* Other components or elements */}
      <DenseTable data={jsonData} />
    </div>
  );
}

export default App;
