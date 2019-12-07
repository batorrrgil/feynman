import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import {connect} from "react-redux";
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes'

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(6),
    },
}));



function AddPostButton (props) {
    function onClickHandling() {
        return props.history.push(ROUTES.ADMIN_POSTS_CREATE)
    }
    const classes = useStyles();
    if (props.authUser === null) {
        return (<></>)
    } else {
        return (
            <Tooltip title="Шинэ нийтлэл оруулах" aria-label="Add">
                <Fab  position="sticky" onClick={onClickHandling} color="secondary" className={classes.absolute}>
                    <AddIcon/>
                </Fab>
            </Tooltip>
        )
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});

export default compose(
    connect(mapStateToProps),
    withRouter
)(AddPostButton)