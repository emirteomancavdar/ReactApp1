import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function PopupErrorExample(props) {
  const { setIsPopUpShown, isPopUpShown } = props //These props allow this component to be controlled from the outer components.


  return (
    <div>
      <Dialog open={isPopUpShown} > {/*When isPopUpShown is true, dialog box appears on the screen and shows the message.*/}
        <DialogTitle>Error</DialogTitle> {/*Message is sent by the controlling component.*/}
        <DialogContent>
          <DialogContentText>
           {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPopUpShown(false)} color="primary"> {/*There is a button in the dialog box. When clicked
          it sets the status of isPopUpShown to false so that the dialog box disappears.*/}
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopupErrorExample;