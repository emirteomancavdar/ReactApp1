import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function DenseDataGrid({ data }) {
  const columns = [
    { field: 'Tag', headerName: 'Tag', width: 500 },
    { field: 'Type', headerName: 'Type', width: 200 },
    { field: 'Value', headerName: 'Value', width: 150 },
  ];

  // Custom getRowId function to specify the row ID
  const getRowId = (row) => row.Tag; // Replace "customId" with the field in your data

  return (
    <div style={{ height: 630, width: '100%' }}>
     
      <DataGrid
        rows={data}
        columns={columns}
       // density="compact"
       initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[5]}
        disableSelectionOnClick
        getRowId={getRowId}
      />
    </div>
  );
}

export default DenseDataGrid;