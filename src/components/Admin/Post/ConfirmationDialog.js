import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmationDialog extends React.Component {

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Та энэ постыг устгахдаа итгэлтэй байна уу?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Хэрэв та устгасаг тохиолдолд нөхөн сэргээр боломжгүй болхыг ойгоорой. Та "ТИЙМ" товч нь дээр дарж баталгаажуулна уу
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="secondary">
                        Үгүй
                    </Button>
                    <Button onClick={this.props.handleAgreed} color="secondary" autoFocus>
                        Тийм
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default ConfirmationDialog