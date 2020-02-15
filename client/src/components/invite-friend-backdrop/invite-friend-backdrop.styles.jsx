import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.tooltip + 100,
    color: '#fff',
  },
}));
