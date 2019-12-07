import React from 'react'
import * as ROUTES from '../../constants/routes'
import {withRouter} from 'react-router-dom'
import {compose} from 'recompose'
import {withFirebase} from "../../utils/Firebase"
import {connect} from 'react-redux';

const withAuthorization = (condition) => (Component) => {
    class withAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if(!condition(authUser)) {
                        this.props.history.push(ROUTES.LANDING);
                    }
                }
            )
        }
        componentWillUnmount() {
            this.listener();
        }

        render() {
            return condition(this.props.authUser) ? (<Component {...this.props}/>) : null

        }
    }
    const mapStateToProps = (state) => ({
        authUser: state.sessionState.authUser
    })
    return compose(
        withRouter,
        withFirebase,
        connect(mapStateToProps),
    )(withAuthorization)
}

export default withAuthorization