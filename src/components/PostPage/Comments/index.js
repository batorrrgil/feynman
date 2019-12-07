import React from 'react';
import Grid from '@material-ui/core/Grid';
import {styles} from "./styles";
import {withStyles} from "@material-ui/styles";
import {Typography} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {compose} from 'recompose'
import {withFirebase} from "../../../utils/Firebase";
import {addComment} from "../../../actions/blog";
import {timeConverter} from "../../../utils/HelperFunctions";
import Container from '@material-ui/core/Container';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
        }
    }



    handleOnChange = (value) => {
        this.setState({
            comment: value
        })
    };

    handleOnClick = (key) => {
        this.props.firebase.createPostComment(key, this.state.comment).then((ref) => {
            this.props.onAddComment(key, 1, this.state.comment)
            this.setState({
                comment: ''
            })
        })

    };

   componentWillMount() {
       this.setState({
           comments: this.props.comments
       })
   }

    render() {
        const id = this.props.id;
        const classes = this.props.classes;


        return (
            <Container maxWidth='sm'>
                    <Typography variant='h5' align='center' className={classes.title}>Сэтгэгдэлүүд ({this.state.comments.length})</Typography>
                    <Divider className={classes.divider}/>
                    <TextField
                        onChange={e=>this.handleOnChange(e.target.value)}
                        id="outlined-textarea"
                        label="Сэтгэгдэл"
                        placeholder="Та өөрийн сэтгэгдлээ бичнэ үү..."
                        multiline
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.comment}
                    />
                    <Grid container
                          justify="flex-end">
                        <Grid item>
                            <Button variant={"outlined"} color='secondary' onClick={()=>this.handleOnClick(id)}>Сэтгэгдэл үлдээх</Button>
                        </Grid>
                    </Grid>
                    {console.log(this.state.comments)}
                    {this.state.comments.sort((a,b)=>b.value.time-a.value.time).map(item => (
                        <div key={item.key}>
                            <Divider className={classes.commentDivider} />
                            <Typography variant='body2' color='secondary'><i>{timeConverter(item.value.time)}</i></Typography>
                            <Typography variant='body1'><i>{item.value.comment}</i></Typography>
                        </div>
                    ))}

            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onAddComment: (postKey, key, comment) => {
        return dispatch(addComment(postKey, key, comment))
    },
});
const mapStateToProps = (state, props) => {
    const id = props.id;
    const index = state.blogState.posts.findIndex((item)=> {
        return item.key === id
    });
    console.log(state.blogState.posts[index].value.blocks)
    return {
        comments: state.blogState.posts[index].value.comments
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    withFirebase
)(Comments)