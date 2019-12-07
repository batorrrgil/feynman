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
import Button from '@material-ui/core/Button'
import {withRouter} from 'react-router-dom'
import * as ROUTERS from '../../constants/routes'

class Stepper extends Component {

    handleOnClickNext = () => {
        this.props.history.push(ROUTERS.POSTS_ALL+(parseInt(this.props.id)+1))
    };

    handleOnClickBack = () => {
        this.props.history.push(ROUTERS.POSTS_ALL+(parseInt(this.props.id)-1))
    };
    render() {


        const classes = this.props.classes;
        return (
            <Container maxWidth='md'>
                <br/>
                <Typography variant='h6'><i><b>Нийтлэлүүд</b></i></Typography>
                <Divider className={classes.divider}/>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        {console.log(this.props.posts.length)}
                        {this.props.posts.slice(0,8).map((post)=>(
                            <Post key={post.key}  post={post}/>
                        ))}
                        {console.log(this.props.posts.length)}

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
    return {
        id,
        posts: state.blogState.posts.slice(id*8, (id*8)+8)
    }
};

export default compose(
    connect(mapStateToProps),
    withStyles(styles),
    withRouter
)(Stepper);