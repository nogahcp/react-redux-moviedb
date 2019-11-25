import { makeStyles } from '@material-ui/core/styles';

// export const useStyles = makeStyles({
//   card: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });

export const useStyles = makeStyles({
  // style rule
  foo: props => ({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
}),
})


// export const classes = useStyles();
