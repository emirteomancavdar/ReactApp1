import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 }
];

const initialRows = [
  { id: 1, name: 'John Doe', age: 25 },
  { id: 2, name: 'Jane Smith', age: 30 },
  // Add more initial rows as needed
];
const Apptt = () => {


  return (
   
    <div style={{ height: 300, width: '75%' }}>
      <DataGrid
        rows={initialRows}
        columns={columns}
        pageSize={5}
       //s checkboxSelection
      />
    </div>
  );
};

export default Apptt;


