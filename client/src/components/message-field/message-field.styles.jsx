import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    padding: '10px 30px',
    margin: '8px 40px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    backgroundColor: '#eee',
    borderRadius: 16,
    height: '70px',
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

export default useStyles;
