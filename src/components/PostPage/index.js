import React from 'react';
import {withFirebase} from '../../utils/Firebase';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import LoadingBar from './LoadingBar';
import Container from '@material-ui/core/Container';
import {Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {styles} from './styles';
import {timeConverter, categoryConverter} from "../../utils/HelperFunctions";
import Post from './Post';
import Recommendation from "./Recommendation";
import Comments from '../PostPage/Comments';
import { Helmet } from "react-helmet";

const INITIAL_STATE = {
    post: null,
};

class PostPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE
    }

    componentDidMount() {


        this.props.firebase.incrementViews(this.props.id);
        this.props.firebase.getPost(this.props.id).then(doc => {
            this.setState({
                post: doc.data()
            })
        });

    }

    render() {
        const posts = this.props.blogState.posts;
        const post = this.state.post;
        const classes = this.props.classes;

        return (
            <div key={this.props.id}>
                <Helmet>
                    <title>My seo app</title>
                    <meta name="description" content="testing react helmet" />
                    <meta name="keywords" content="react,seo,helmet" />
                    <meta property="og:url"                content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
                    <meta property="og:type"               content="article" />
                    <meta property="og:title"              content="When Great Minds Don’t Think Alike" />
                    <meta property="og:description"        content="How much does culture influence creative thinking?" />
                    <meta property="og:image"              content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
                </Helmet>
                {post === null || posts.length < 1
                    ? <LoadingBar/>
                    : <Container maxWidth="md">
                        <Typography color='secondary' className={classes.textCategory}>{categoryConverter(post.category).toUpperCase()}</Typography>
                        <Typography variant='body2' className={classes.textDate}>{timeConverter(post.time)}</Typography>
                        <Post post={post}/>
                        <Recommendation posts={this.props.blogState.posts}/>
                        <Comments id={this.props.id}/>
                        <br/>
                      </Container>
                    }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        id: props.match.params.id,
        blogState: state.blogState
    }
};
export default compose(
    withStyles(styles),
    withFirebase,
    connect(mapStateToProps)
)(PostPage)