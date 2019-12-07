import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    progress: {
        marginTop: '20px',
        textAlign: 'center'
    },
}));

export default function LoadingBar() {
    const classes = useStyles();

    return (
        <div className={classes.progress}>
            <CircularProgress color='secondary' />
        </div>
    );
}