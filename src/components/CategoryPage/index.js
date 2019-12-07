import React from 'react';
import {Container, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import TopPost from "../Post/TopPost";
import {withStyles} from "@material-ui/styles";
import {connect} from "react-redux";
import * as ROUTERS from '../../constants/routes'
import * as CATEGORIES from  '../../constants/categories'
import {compose} from "recompose";
import {styles} from "./styles";
import Grid from "@material-ui/core/Grid";
import Post from "../Post";
import Button from "@material-ui/core/Button";
import {withRouter} from 'react-router-dom';

class CategoryPage extends React.Component {

    state = {
        i: 0
    };

    handleOnClickMore = () => {
        this.setState((currentState) => ({
          i: currentState.i + 1
        }))
          // this.props.history.push(this.props.path+1);
    };
    render() {
        const classes = this.props.classes;
        console.log(this.props.posts);
        return (
          <Container maxWidth={"md"}>
              <br/>
              <Typography variant='h6'><i><b>Топ нийтлэл</b></i></Typography>
              <Divider className={classes.divider}/>

              <TopPost post={this.props.posts[0]}/>
              <br/>
              <br/>

              <Typography variant='h6' align={'center'} className={classes.topCatHeader}><i><b>Сүүлд нэмэгдсэн</b></i></Typography>
              <Container maxWidth="sm">
                  <Divider className={classes.divider}/>

                  {this.props.posts.slice(0,8 + this.state.i*8).map((post)=>(
                          <Post key={post.key}  post={post}/>
                      ))}
                      <Button fullWidth disabled={this.props.posts.length < 8+(this.state.i*8)}  onClick={this.handleOnClickMore} color='secondary' variant="outlined">Цааш үзэх</Button>
              </Container>


          </Container>
        )
    }
}

const mapStateToProps = (state, props) => {
    const path = props.location.pathname;
    let posts = state.blogState.posts;
    switch (path) {
        case ROUTERS.POSTS_TECHNOLOGY:
                posts = posts.filter((post)=>post.value.category===CATEGORIES.TECHNOLOGY.id);
                break;
        case ROUTERS.POSTS_BUSINESS:
                posts =  posts.filter((post)=>post.value.category===CATEGORIES.BUSINESS.id);
                break;
        case ROUTERS.POSTS_SOCIAL:
                posts = posts.filter((post)=>post.value.category===CATEGORIES.SOCIAL.id);
                break;
        default:
                break;
    }
    return {
        path,
        posts
    }
};
export default compose(
    withRouter,
    connect(mapStateToProps),
    withStyles(styles)
)(CategoryPage);