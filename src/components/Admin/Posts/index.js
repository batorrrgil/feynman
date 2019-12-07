import React from 'react'
import {withAuthorization} from '../../../components/Session'
import {compose} from "recompose";
import {connect} from "react-redux";
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Post from '../Post'

class AdminPosts extends React.Component {
    render() {
        const posts = this.props.posts.posts;
        return (
            <Container maxWidth='md'>

                    <Grid container>
                        <Grid item xs={2}>
                        </Grid>

                        <Grid item xs={8}>
                            <br/>
                            { posts.map((post, index)=>(<Post key={post.key} index={index} post={post}/>))}
                        </Grid>

                        <Grid item xs={2}>
                            
                        </Grid>
                    </Grid>

            </Container>
        )
    }
}

const condition = authUser => !!authUser;

const mapStateToProps = (state) => ({
    posts: state.blogState
});

export default compose(
    withAuthorization(condition),
    connect(mapStateToProps)
)(AdminPosts);