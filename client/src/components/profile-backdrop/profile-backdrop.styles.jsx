import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.tooltip + 100,
    color: '#fff',
  },
  padBox: {
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  avatarLarge: {
    width: 100,
    height: 100,
  },
}));
