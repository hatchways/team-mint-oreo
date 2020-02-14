import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  unselected: {
    backgroundColor: '#F5F8FA',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  selected: {
    backgroundColor: '#fff',
  },
  rounded: {
    borderRadius: 16,
  },
  padddd: {
    padding: 10,
  },
  componentStyle: {
    borderRadius: 16,
    backgroundColor: 'white',
  },
  chipStyle: {
    backgroundColor: '#3A8DFF',
    color: '#fff',
  },
}));
