import React from 'react';
import {makeStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {withFirebase} from '../../utils/Firebase'

const useStyles = makeStyles({
    signOutButton: {
        color: '#515052',
        marginLeft: '16px',
    },
});

const SignOutButton = ({firebase}) => {

    const classes = useStyles();

    return (
        <Button type='button' className={classes.signOutButton} onClick={firebase.doSignOut}>
            Гарах
        </Button>
    )

};
export default withFirebase(SignOutButton)