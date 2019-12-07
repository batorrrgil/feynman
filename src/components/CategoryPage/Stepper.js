import React from 'react';
import {Container, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {withStyles} from "@material-ui/styles";
import {connect} from "react-redux";
import * as ROUTERS from '../../constants/routes'
import * as CATEGORIES from  '../../constants/categories'
import {compose} from "recompose";
import {styles} from "./styles";
import Grid from "@material-ui/core/Grid";
import Post from "../Post";
import Button from "@material-ui/core/Button";

class Stepper extends React.Component {
    handleOnClickNext = () => {
        this.props.history.push(this.props.path+(parseInt(this.props.id)+1))
    };

    handleOnClickBack = () => {
        this.props.history.push(this.props.path+(parseInt(this.props.id)-1))
    };
    render() {
        const classes = this.props.classes;
        return (
            <Container maxWidth={"md"}>
                <br/>
                <br/>
                <Typography variant='h6' className={classes.topCatHeader}><i><b>Нийтлэлүүд</b></i></Typography>
                <Divider className={classes.divider}/>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        {this.props.posts.slice(0,10).map((post)=>(
                            <Post key={post.key}  post={post}/>
                        ))}
                        <Grid container justify='space-between'>
                            <Grid item>
                                <Button disabled={parseInt(this.props.id) === 0} onClick={this.handleOnClickBack} color='secondary' >Өмнөх</Button>
                            </Grid>
                            <Grid item>
                                <Button disabled={this.props.posts.length < 8} onClick={this.handleOnClickNext} color='secondary' variant="outlined">Дараах</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <img src='https://dummyimage.com/300x800/0aa/fff' width='100%'/>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = (state, props) => {
    const id =  props.match.params.id;
    let path = props.location.pathname;
    path = path.split("/");
    path.pop();
    path = path.join('/') + '/';
    let posts = state.blogState.posts;
    console.log(path);
    switch (path) {
        case ROUTERS.POSTS_TECHNOLOGY:
            posts = posts.filter((post)=>post.value.category===CATEGORIES.TECHNOLOGY.id).slice(id*8, (id*8)+8);
            break;
        case ROUTERS.POSTS_BUSINESS:
            posts =  posts.filter((post)=>post.value.category===CATEGORIES.BUSINESS.id).slice(id*8, (id*8)+8);
            break;
        case ROUTERS.POSTS_SOCIAL:
            posts = posts.filter((post)=>post.value.category===CATEGORIES.SOCIAL.id).slice(id*8, (id*8)+8);
            break;
        default:
            break;
    }
    return {
        id,
        path,
        posts
    }
};
export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(Stepper);