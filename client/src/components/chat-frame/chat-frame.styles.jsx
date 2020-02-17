import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  messageBoxHeight: {
    height: '74vh',
    [theme.breakpoints.down('sm')]: {
      height: '80vh',
    },
  },
}));
