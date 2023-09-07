import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function PopupErrorExample(props) {
  const { setIsPopUpShown, isPopUpShown } = props


  return (
    <div>
      <Dialog open={isPopUpShown} >
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPopUpShown(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopupErrorExample;