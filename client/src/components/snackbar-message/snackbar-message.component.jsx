import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import { useStyles } from './snackbar-message.styles';

export default function SnackbarMessage({ messageInfo, open, handleExited, handleClose, status }) {
  const classes = useStyles();

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      //onExited={handleExited}
      /*message={messageInfo ? messageInfo.message : undefined}
      action={
        <React.Fragment>
          <IconButton
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </React.Fragment>
      }*/
    >
      {messageInfo ?
          <Alert onClose={handleClose} variant="filled" severity={messageInfo.status}>
            { messageInfo ? messageInfo.message : undefined }
          </Alert> : undefined
      }
    </Snackbar>
  );
}
