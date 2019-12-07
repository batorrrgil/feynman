import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {styles} from "./styles";
import Divider from '@material-ui/core/Divider';
import {Typography} from "@material-ui/core";
import Post from '../Post';
import {compose} from 'recompose';
import TopPost from '../Post/TopPost';
import CatPost from '../Post/CatPost';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';
import * as ROUTERS from '../../constants/routes';
import Hidden from '@material-ui/core/Hidden';

class LandingPage extends Component {

    state = {
        i: 0,
    };
    handleOnClickNext = () => {
        this.setState((currentState) => ({
            i: currentState.i + 1
        }));
        // this.props.history.push(ROUTERS.POSTS_ALL+1);
    };

    render() {
        let topPost = {
            value: {
                views: -1,
            }
        };
        let topPostTechnology = {
            value: {
                views: -1,
            }
        };
        let topPostBusiness = {
            value: {
                views: -1,
            }
        };

        let topPostSocial = {
            value: {
                views: -1,
            }
        };
        this.props.blogState.posts.slice(0,20).map(post => {
            if(post.value.views > topPost.value.views)
                topPost = post;
            if(post.value.views > topPostTechnology.value.views && post.value.category === 1)
                topPostTechnology = post;
            if(post.value.views > topPostBusiness.value.views && post.value.category === 2)
                topPostBusiness = post;
            if(post.value.views > topPostSocial.value.views && post.value.category === 3)
                topPostSocial = post;
        });


        const classes = this.props.classes;
        return (
            <Container maxWidth='md'>
                <br/>
                <Typography variant='h6'><i><b>Топ нийтлэл</b></i></Typography>
                <Divider className={classes.divider}/>

                <TopPost post={topPost}/>

                <Grid container className={classes.topCategories} spacing={3}>
                    <Hidden xsDown>
                        <CatPost post={topPostTechnology} size={4}/>
                        <CatPost post={topPostBusiness} size={4}/>
                        <CatPost post={topPostSocial} size={4}/>
                    </Hidden>
                    <Hidden smUp>
                        <CatPost post={topPostTechnology} size={12}/>
                        <CatPost post={topPostBusiness} size={12}/>
                        <CatPost post={topPostSocial} size={12}/>
                    </Hidden>
                </Grid>
                <br/>
                <br/>
                <Container maxWidth='sm'>
                    <Typography variant='h6' className={classes.topCatHeader}><i><b>Сүүлд нэмэгдсэн</b></i></Typography>
                    <Divider className={classes.divider}/>
                    {this.props.blogState.posts.slice(0, 8+(this.state.i*8)).map((post)=>(
                        <Post key={post.key}  post={post}/>
                    ))}
                    {console.log(this.props.blogState.posts.length)}

                    <Button fullWidth disabled={this.props.blogState.posts.length <  8+(this.state.i*8)}  onClick={this.handleOnClickNext} color='secondary' variant="outlined">Цааш үзэх</Button>

                </Container>

            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    blogState: state.blogState
});

export default compose(
    connect(mapStateToProps),
    withStyles(styles),
    withRouter
    )(LandingPage);