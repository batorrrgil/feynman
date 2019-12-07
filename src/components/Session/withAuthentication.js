import React from 'react'
import {withFirebase} from "../../utils/Firebase";
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {applySetAuthUser} from "../../actions/session";

const withAuthentication = Component => {
    class withAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.props.onSetAuthUser(JSON.parse(localStorage.getItem('authUser')));
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    this.props.onSetAuthUser(authUser);
                },
                () => {
                    localStorage.removeItem('authUser');
                    this.props.onSetAuthUser( null);
                },
            )
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <Component {...this.props}/>
            )
        }
    }
    const mapDispatchToProps = (dispatch) => ({
        onSetAuthUser: authUser => {
            dispatch(applySetAuthUser(authUser))
        },
    });
    return compose(
        withFirebase,
        connect(null, mapDispatchToProps),
        )(withAuthentication);
};
export default withAuthentication;