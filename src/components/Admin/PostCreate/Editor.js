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
        "time": 1554920381017,
        "category": 0,
        "blocks": [
            {
                "type": "header",
                "data": {
                    "text": "Эндээс эхлэнэ үү",
                    "level": 1
                }
            },
        ],
        "version": "2.14"
    }
};

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE
    }

    render() {
        const {classes} = this.props;
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
            //Todo(1) clean up this code
            const post =  this.state.post;
            this.props.onShowLoading();
            firebase.createPost(post).then( ref => {
                const data = this.props.posts;
                post.blocks.splice(3);
                for(var i=0;i<post.blocks.length;i++) {
                    if(post.blocks[i].type === 'paragraph') {
                        post.blocks[i].data.text = post.blocks[i].data.text.slice(0,260)+'...';
                    }
                }
                data.unshift({key: ref.id, value: post});

                firebase.createPostInstance(data).then( () => {
                    data[0].value.views = 0;
                    data[0].value.comments = [];
                    firebase.createPostData(ref.id);
                    this.props.onAddPost(data);
                    this.props.onHideLoading();
                });
            });
        };

        return (
            <div>
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
                                Нийтлэх
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth='md'>
                    <EditorJS
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
                    />
                </Container>
            </div>
        )
    }
}

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

const mapStateToProps = (state) => ({
    posts: state.blogState.posts,
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withFirebase,
    withStyles(styles),
)(Editor);
