import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import {hideSignInDialogue} from "../../actions/page";
import {withStyles} from "@material-ui/styles";
import {compose} from "recompose";
import * as ROUTES from "../../constants/routes";
import {withFirebase} from "../../utils/Firebase";
import {withRouter} from 'react-router-dom'

const styles = {
      dialogAction: {
          margin: '14px',
      },
};
const INITIAL_STATE = {
    email: '',
    password: '',
    error_mail: false,
    error_pass: false,
};

class SignInDialogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE}
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.onHideSignInDialogue();
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.ADMIN_POSTS);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };
    render() {
        const {classes} = this.props;
        const {email, password, error_mail, error_pass} = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <Dialog open={this.props.showSignInDialogue} onClose={this.props.onHideSignInDialogue} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Нэвтэрч орох</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Зөвхөн тусгай эрхтэй хүмүүс нэвтэрч орно. Хэрэ та тусгай эрх авхыг хүсвэл бидэнтэй холбоо барина уу
                    </DialogContentText>
                    <TextField
                        id="outlined-email-input"
                        label="Цахим хаяг"
                        type="email"
                        fullWidth
                        name="email"
                        autoComplete="email"
                        onChange={this.onChange}
                        value={email}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-email-input"
                        label="Нууц үг"
                        type="password"
                        fullWidth
                        name="password"
                        onChange={this.onChange}
                        value={password}
                        autoComplete="password"
                        margin="normal"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions className={classes.dialogAction}>
                    <Button color='secondary' onClick={this.props.onHideSignInDialogue} >
                        Болих
                    </Button>
                    <Button onClick={this.onSubmit} disabled={isInvalid} color="secondary">
                        Нэвтрэх
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}


const mapStateToProps = (state) => ({
    showSignInDialogue: state.pageState.showSignInDialogue
});
const mapDispatchToProps = (dispatch) => ({
    onHideSignInDialogue: () => {
        dispatch(hideSignInDialogue());
    }
});


export default compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(SignInDialogue)