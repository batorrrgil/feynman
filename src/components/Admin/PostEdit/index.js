import React, {Component} from 'react';
import * as CATEGORIES from '../../../constants/categories'
import EditorJS from '@stfy/react-editor.js'
import Paragraph from '@editorjs/paragraph'
import ImageTool from '@editorjs/image';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import {withFirebase} from "../../../utils/Firebase";
import {compose} from 'recompose';
import {withStyles} from "@material-ui/styles";
import {connect} from "react-redux";
import {showLoading, hideLoading} from "../../../actions/page";
import {addPosts} from "../../../actions/blog";

const styles = {
    topBar: {
        marginTop: '20px',
    },
    formControl: {
        minWidth: '100%',
    },
};

const INITIAL_STATE = {
    post: {
    }
};

class PostEdit extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE
    };

    componentDidMount() {
        this.props.firebase.getPost(this.props.id).then(doc => {
            this.setState({
                post: doc.data()
            })
        });
    }



    render() {
        const {classes} = this.props
        const {firebase} = this.props;

        const onChange = (data) => {
            this.setState((currentState) => {
                const post = data;
                post.category = currentState.post.category
                return ({
                    post
                })
            })
        };

        const onPublish = () => {
            this.props.onShowLoading();

            const id = this.props.id;
            const post =  this.state.post;
            const posts =  this.props.posts;

            //Finds index of post
            const index = posts.findIndex((item)=> {
                return item.key === id
            });

            post.time = posts[index].value.time;//<---Not to update timestamp
            const views = posts[index].value.views;
            const comments = posts[index].value.comments;
            firebase.updatePost(id, post).then( () => {

                const data = posts;

                //----Data cleaning logic
                post.blocks.splice(3);
                for(var i=0;i<post.blocks.length;i++) {
                    if(post.blocks[i].type === 'paragraph') {
                        post.blocks[i].data.text = post.blocks[i].data.text.slice(0,260)+'...';
                    }
                }
                //----Data cleaning ending

                data[index].value = post;

                firebase.createPostInstance(data).then( ref => {
                    data[index].value.views = views;
                    data[index].value.comments = comments;
                    this.props.onAddPost(data);
                    this.props.onHideLoading();
                });
            });
        };

        return (
            <div>
                {console.log(this.state.post)}
                <Container maxWidth='md' className={classes.topBar} >
                    <Grid container justify="space-around" spacing={3}>
                        <Grid item xs={4}>
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel htmlFor="filled-age-simple">Ангилал</InputLabel>
                                <Select
                                    value={this.state.post.category === undefined ? 0 : this.state.post.category}
                                    onChange={e => this.setState((currentState) =>{
                                        const post = currentState.post;
                                        post.category = e.target.value;
                                        return ({
                                            post
                                        })
                                    } )}
                                    input={<FilledInput name="category" id="category" />}
                                >
                                    <MenuItem value="">
                                        <em>Ангилал</em>
                                    </MenuItem>
                                    <MenuItem value={CATEGORIES.TECHNOLOGY.id}>{CATEGORIES.TECHNOLOGY.name}</MenuItem>
                                    <MenuItem value={CATEGORIES.BUSINESS.id}>{CATEGORIES.BUSINESS.name}</MenuItem>
                                    <MenuItem value={CATEGORIES.SOCIAL.id}>{CATEGORIES.SOCIAL.name}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button align='right' disabled={!(this.state.post.category > 0)} variant="outlined" color="secondary" onClick={()=>onPublish()} size='large'>
                                Засварлах
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth='md'>
                    {this.state.post.time !== undefined &&   <EditorJS
                        autofocus
                        holderId="editorjs-container"
                        onChange={(data) => onChange(data)}
                        customTools={{
                            inlineToolbar: true,
                            paragraph: {
                                class: Paragraph,
                            },
                            image: {
                                class: ImageTool,
                                config: {
                                    uploader: {
                                        uploadByFile(file) {
                                            return firebase.uploadPostImage(file).then((url) => {
                                                return {
                                                    success: 1,
                                                    file: {
                                                        url: url,
                                                    }
                                                };
                                            }).catch(()=>{
                                                return {
                                                    success: 0,
                                                }
                                            })
                                        },
                                        uploadByUrl(url) {
                                            return {
                                                success: 1,
                                                file: {
                                                    url: url
                                                }
                                            };
                                        }
                                    }
                                }
                            }
                        }}
                        onReady={() => console.log('Start!')}
                        data={this.state.post}
                    />}

                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state, props) =>
{
    const id  = props.match.params.id;
    return ({
        id: id,
        posts: state.blogState.posts
    })
};

const mapDispatchToProps = (dispatch) => ({
    onShowLoading: () => {
        dispatch(showLoading());
    },
    onHideLoading: () => {
        dispatch(hideLoading());
    },
    onAddPost: (posts) => {
        dispatch(addPosts(posts))
    }
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withFirebase,
    withStyles(styles),
)(PostEdit);