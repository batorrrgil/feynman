import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import * as ROUTER from '../constants/routes';
import Navigation from '../components/Navigation';
import LandingPage from './LandingPage';
import LandingPageStepper from './LandingPage/Stepper'
import PostPage from '../components/PostPage'
import SearchPage from '../components/SearchPage';
import SignUp from '../components/SignUp';
import CategoryPage from '../components/CategoryPage'
import CategoryPageStepper from '../components/CategoryPage/Stepper'
import AdminPosts from '../components/Admin/Posts';
import AdminPostCreate from '../components/Admin/PostCreate';
import AdminPostEdit from '../components/Admin/PostEdit';
import AddPostButton from '../components/HelperComponents/AddPostButton';
import EditPostsButton from '../components/HelperComponents/EditPostsButton';
import SignInDialogue from '../components/SignInDialogue';
import {withAuthentication} from '../components/Session'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {compose} from 'recompose';
import {connect} from "react-redux";
import Loading from '../components/HelperComponents/Loading'
import {withFirebase} from "../utils/Firebase";
import {handleInitialData} from "../actions/blog";
import {showLoading, hideLoading} from "../actions/page";

class App extends Component {

    componentDidMount() {
        this.props.onGetInitialData(this.props.firebase);
    }


    render() {
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#ffffff',
                },
                secondary: {
                    main: '#0054ff',
                },
                third: {
                    main: '#0054ff',
                },
            }
        });
        return (
            <Router>
                <ThemeProvider theme={theme}>
                    <Navigation/>
                    {this.props.showLoading || this.props.blogState.posts < 1 ? <Loading /> : <div>
                        {this.props.searchQuery !== ''
                            ? <SearchPage />
                            : <div>
                                <Route exact path={ROUTER.LANDING} component={LandingPage}/>
                                <Route exact path={ROUTER.POSTS_ALL} component={LandingPage}/>
                                <Route exact path={ROUTER.POSTS_ALL+':id'} component={LandingPageStepper}/>
                                <Route exact path={ROUTER.POSTS_TECHNOLOGY} component={CategoryPage}/>
                                <Route exact path={ROUTER.POSTS_TECHNOLOGY+':id'} component={CategoryPageStepper}/>
                                <Route exact path={ROUTER.POSTS_BUSINESS} component={CategoryPage}/>
                                <Route exact path={ROUTER.POSTS_BUSINESS+':id'} component={CategoryPageStepper}/>
                                <Route exact path={ROUTER.POSTS_SOCIAL} component={CategoryPage}/>
                                <Route exact path={ROUTER.POSTS_SOCIAL+':id'} component={CategoryPageStepper}/>
                                <Route exact path={ROUTER.POST+':id'} render={(props) => (
                                    <PostPage key={props.match.params.id} {...props} />)
                                } />
                                <Route exact path={ROUTER.SIGN_UP} component={SignUp}/>
                                <Route exact path={ROUTER.ADMIN_POSTS} component={AdminPosts}/>
                                <Route exact path={ROUTER.ADMIN_POSTS_CREATE} component={AdminPostCreate}/>
                                <Route exact path={ROUTER.ADMIN_POSTS_EDIT+':id'} component={AdminPostEdit}/>
                            </div>}
                    </div>}
                    <SignInDialogue/>
                    <AddPostButton/>
                    <EditPostsButton/>
                </ThemeProvider>
            </Router>
        );
    }
}

const mapStateToProps = (state) => ({
    showSignInDialogue: state.pageState.showSignInDialogue,
    showLoading: state.pageState.showLoading,
    blogState: state.blogState,
    searchQuery: state.pageState.searchQuery,
});

const mapDispatchToProps = (dispatch) => ({
    onShowLoading: () => {
        dispatch(showLoading())
    },
    onHideLoading: () => {
        dispatch(hideLoading())
    },
   onGetInitialData: (firebase) => {
      dispatch(handleInitialData(firebase))
   },
});
export default compose(
    withFirebase,
    withAuthentication,
    connect(mapStateToProps, mapDispatchToProps)
)(App);
