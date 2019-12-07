import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {styles} from "./styles";
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom'
import Post from '../Post';
import Container from "@material-ui/core/Container";
import {Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";


class SearchPage extends Component {


    render() {

        return(
            <Container maxWidth='sm'>
                <br/>
                <br/>
                <Typography variant='h6'><i><b>Хайлтын үр дүн</b></i></Typography>
                <Divider/>
                {this.props.posts.length !== 0
                    ? (this.props.posts.slice(0, this.props.posts.length).map((post)=>(
                     <Post key={post.key}  post={post}/>
                    )))
                    :  <Typography variant='h5' align={'center'}><i><b>Хайлтын үр дүн олдсонгүй</b></i></Typography>
                }
            </Container>
        )
    }



}

// const mapStateToProps = (state) => ({
//         blogState: state.blogState,
//         searchQuery: state.pageState.searchQuery
// });

const mapStateToProps = (state) => {
        const posts = [];
        state.blogState.posts.find(post => {
            var title;
            post.value.blocks.map((block) => {
                if (block.type === 'header') {
                    title = block.data.text;
                    if (title.includes(state.pageState.searchQuery) === true) {
                        posts.push(post);
                        {console.log('daraagiin n = ' + ' ' + posts.length)}
                        return post;
                    } else return null;
                }
            });
        });
        return ({
            posts: posts.slice(0,10),
            blogState: state.blogState
        })
}



export default compose(
    connect(mapStateToProps),
    withStyles(styles),
    withRouter
)(SearchPage);