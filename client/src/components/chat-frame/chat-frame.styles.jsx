import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  messageBoxHeight: {
    height: '78vh',
    overflow: 'auto',
    overflowX: 'hidden',
    [theme.breakpoints.down('sm')]: {
      height: '84vh',
    },
  },

  typingStatus: {
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.6)',
    margin: '0 40px',
    padding: '0 1rem',
  },
}));

export default useStyles;
