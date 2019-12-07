import React from 'react'
import {Typography} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {connect} from "react-redux";
import {compose} from 'recompose';
import ConfirmationDialog from './ConfirmationDialog';
import {addPosts} from '../../../actions/blog';
import {timeConverter} from "../../../utils/HelperFunctions";
import {styles} from './styles'
import {withFirebase} from "../../../utils/Firebase";
import {withRouter} from 'react-router-dom';
import * as ROUTER from '../../../constants/routes';
import {hideLoading, showLoading} from "../../../actions/page";

class Post extends React.Component {

    state = {
        open: false
    };
    handleClose = () => {
        this.setState({open: false})
    };
    showConfirmationDialog = () => {
        this.setState({open: true})
    };
    handleAgreed = () => {
        //Todo(2) fix this code

        const posts = this.props.posts;
        posts.splice(this.props.index, 1);
        this.props.firebase.createPostInstance(posts).then(()=> {
            this.props.firebase.deletePost(this.props.post.key);
            this.props.onDeletePost(posts);
            this.handleClose();
        });
    };
    handleEditButton = () => {
        const id = this.props.post.key;
        this.props.history.push(ROUTER.ADMIN_POSTS_EDIT + id)
    };

    render() {
        const post = this.props.post.value;
        const {classes} = this.props;
        return (

            <div key={this.props.post.key}>

                <Typography variant='body2' className={classes.textDate}>{timeConverter(post.time)}</Typography>
                {post.blocks.map((block)=>{
                    switch (block.type) {
                        case 'header':
                            return <Typography variant='h5' className={classes.textTitle}><b>{block.data.text.replace(/(<([^>]+)>)/ig,"")}</b></Typography>
                            break
                        case 'paragraph':
                            return <Typography variant='body1' className={classes.textPara} dangerouslySetInnerHTML={{__html:  block.data.text}}></Typography>
                            break
                        case 'image':
                            return <img src={block.data.file.url} width='100%'/>
                            break
                        case 'embed':
                            return <iframe width="100%" src={block.data.embed}
                                           frameBorder="0"
                                           allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                           allowFullScreen></iframe>
                            break
                    }
                })}

                <Grid container justify='space-between'>
                    <Grid item>
                        <Grid container justify='flex-start'>
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={this.handleEditButton} className={classes.button}>
                                    Өөрчлөх
                                    <EditIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container justify='flex-end'>

                            <Grid item>
                                <Button variant="outlined" color="secondary" onClick={this.showConfirmationDialog} className={classes.button}>
                                    Устгах
                                    <DeleteIcon  />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider className={classes.dividerStyle}/>

                <ConfirmationDialog open={this.state.open} handleAgreed={this.handleAgreed} handleClose={this.handleClose}/>

            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    posts: state.blogState.posts,
});
const mapDispatchToProps = (dispatch) => ({
    onDeletePost: (posts) => {
        console.log(posts)
        dispatch(addPosts(posts))
    },
    onShowLoading: () => {
        dispatch(showLoading());
    },
    onHideLoading: () => {
        dispatch(hideLoading());
    },
});
export default compose(
    withRouter,
    withFirebase,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Post)