import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  chatPaper: {
    background: 'linear-gradient(90deg, rgba(64,144,255,1) 0%, rgba(124,179,255,1) 100%)',
    borderRadius: '5px 20px 20px 20px',
  },
  senderPaper: {
    backgroundColor: '#dfdfdf',
    borderRadius: 20,
    marginLeft: '20px 20px 5px 20px',
  },
}));
