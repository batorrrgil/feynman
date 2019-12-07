import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
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
        bottom: theme.spacing(14),
        right: theme.spacing(6),
    },
}));



function EditPostsButton (props) {
    function onClickHandling() {
        return props.history.push(ROUTES.ADMIN_POSTS)
    }
    const classes = useStyles();
    if (props.authUser === null) {
        return (<></>)
    } else {
        return (
            <Tooltip title="Нийтлэлүүдийг засах" aria-label="Edit">
                <Fab position="sticky" onClick={onClickHandling} color="primary" className={classes.absolute}>
                    <EditIcon/>
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
)(EditPostsButton)