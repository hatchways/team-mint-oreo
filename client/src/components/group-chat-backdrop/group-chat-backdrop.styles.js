import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  backdrop: {
    // zIndex: theme.zIndex.tooltip + 100,
    zIndex: 2,
    color: '#fff',
  },
  autocomplete: {
    width: 500,
  },
  checkbox: {
    marginRight: 8,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
  },
}));

export default useStyles;
