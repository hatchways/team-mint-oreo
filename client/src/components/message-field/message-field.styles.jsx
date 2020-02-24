import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    padding: '10px 30px',
    margin: '0px 40px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    backgroundColor: '#eee',
    borderRadius: 16,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
