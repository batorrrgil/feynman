import React from 'react';
import {withRouter} from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import * as CATEGORIES from '../../constants/categories';
import * as MENUS from '../../constants/menus';
import {connect} from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import {Toolbar} from "@material-ui/core";
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import {compose} from 'recompose';
import {changeQuery, showSignInDialogue} from "../../actions/page";
import {withFirebase} from "../../utils/Firebase";
import SignOutButton from "../SignOut";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';


const Navigation = (props) => {

    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    function handleOnClick (link) {
        props.onClearSearchQuery();
        props.history.push(link);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }

    function handleMobileMenuOpen(event) {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                {props.authUser === null || props.authUser === undefined
                    ? <Tab className={classes.signInButton} onClick={props.onShowSighIn} label={MENUS.SIGN_IN} />
                    :  <SignOutButton>{MENUS.SIGN_OUT}</SignOutButton>}
            </MenuItem>
            <MenuItem>
                {props.location.pathname === ROUTES.LANDING || props.location.pathname.includes(ROUTES.POSTS_ALL)
                    ? <Tab className={classes.menuButtonActive} label={CATEGORIES.ALL.name} />
                    : <Tab onClick={() => handleOnClick(ROUTES.LANDING)} className={classes.menuButton}
                           label={CATEGORIES.ALL.name} />
                }
            </MenuItem>
            <MenuItem>
                {props.location.pathname.includes(ROUTES.POSTS_TECHNOLOGY)
                    ? <Tab className={classes.menuButtonActive} label={CATEGORIES.TECHNOLOGY.name}/>
                    : <Tab onClick={() => handleOnClick(ROUTES.POSTS_TECHNOLOGY)} className={classes.menuButton}
                           label={CATEGORIES.TECHNOLOGY.name}/>
                }
            </MenuItem>
            <MenuItem>
                {props.location.pathname.includes(ROUTES.POSTS_BUSINESS)
                    ? <Tab className={classes.menuButtonActive} label={CATEGORIES.BUSINESS.name}/>
                    : <Tab onClick={() => handleOnClick(ROUTES.POSTS_BUSINESS)} className={classes.menuButton}
                           label={CATEGORIES.BUSINESS.name}/>
                }
            </MenuItem>
            <MenuItem>
                {props.location.pathname.includes(ROUTES.POSTS_SOCIAL)
                    ? <Tab  className={classes.menuButtonActive} label={CATEGORIES.SOCIAL.name}/>
                    : <Tab onClick={() => handleOnClick(ROUTES.POSTS_SOCIAL)} className={classes.menuButton}
                           label={CATEGORIES.SOCIAL.name}/>
                }
            </MenuItem>
        </Menu>
    );

    return (
        <div>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <img src={process.env.PUBLIC_URL + '/logo.png'} className={classes.logo}/>
                    </Typography>
                    <div className={classes.sectionDesktop}>
                        {props.location.pathname === ROUTES.LANDING || props.location.pathname.includes(ROUTES.POSTS_ALL)
                            ? <Tab className={classes.menuButtonActive} label={CATEGORIES.ALL.name} />
                            : <Tab onClick={() => handleOnClick(ROUTES.LANDING)} className={classes.menuButton}
                                   label={CATEGORIES.ALL.name} />
                        }
                        {props.location.pathname.includes(ROUTES.POSTS_TECHNOLOGY)
                        ? <Tab className={classes.menuButtonActive} label={CATEGORIES.TECHNOLOGY.name}/>
                        : <Tab onClick={() => handleOnClick(ROUTES.POSTS_TECHNOLOGY)} className={classes.menuButton}
                               label={CATEGORIES.TECHNOLOGY.name}/>
                        }
                        {props.location.pathname.includes(ROUTES.POSTS_BUSINESS)
                            ? <Tab className={classes.menuButtonActive} label={CATEGORIES.BUSINESS.name}/>
                            : <Tab onClick={() => handleOnClick(ROUTES.POSTS_BUSINESS)} className={classes.menuButton}
                                   label={CATEGORIES.BUSINESS.name}/>
                        }
                        {props.location.pathname.includes(ROUTES.POSTS_SOCIAL)
                            ? <Tab  className={classes.menuButtonActive} label={CATEGORIES.SOCIAL.name}/>
                            : <Tab onClick={() => handleOnClick(ROUTES.POSTS_SOCIAL)} className={classes.menuButton}
                                   label={CATEGORIES.SOCIAL.name}/>
                        }
                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder={MENUS.SEARCH}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'Search' }}
                            onChange={(event) => props.onShowSearchPage(event.target.value)} // (event) => setSearchValue(event.target.value)
                            value={props.searchQuery}
                        />
                    </div>
                    <div className={classes.sectionDesktop}>
                    {props.authUser === null || props.authUser === undefined
                        ? <Button className={classes.signInButton} onClick={props.onShowSighIn}>{MENUS.SIGN_IN}</Button>
                        :  <SignOutButton>{MENUS.SIGN_OUT}</SignOutButton>}
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="Show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            </div>

)};

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    searchQuery: state.pageState.searchQuery
});

const mapDispatchToProps = (dispatch) => ({
    onShowSighIn: () => {
        dispatch(showSignInDialogue());
    },
    onShowSearchPage: (searchValue) => {
        dispatch(changeQuery(searchValue)); // { type: 'CHANGE_QUERY'}
        console.log('search value: ' + searchValue)
    },
    onClearSearchQuery: () => {
        dispatch(changeQuery(''))
    },
});

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(Navigation)