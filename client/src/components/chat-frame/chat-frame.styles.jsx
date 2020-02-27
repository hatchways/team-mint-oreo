import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  messageBoxHeight: {
    height: '78vh',
    [theme.breakpoints.down('sm')]: {
      height: '84vh',
    },
  },
}));
