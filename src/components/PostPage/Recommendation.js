import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from "@material-ui/styles";
import {styles} from "./styles";
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
import CardPost from '../Post/CardPost'
import Hidden from '@material-ui/core/Hidden'

//Todo(3) clean this code using for loop
class Recommendation extends React.Component {
    handleOnClick = (key) => {
        this.props.history.push(ROUTES.POST+key)
    };
    render() {
        const posts = this.props.posts;
        const classes = this.props.classes;
        const index1 = Math.floor(Math.random() * posts.length);
        const index2 = Math.floor(Math.random() * posts.length);
        const index3 = Math.floor(Math.random() * posts.length);

        return (
            <div>
                <br/>
                <Typography variant='h5'>Санал болгож буй нийтлэлүүд</Typography>
                <Divider className={classes.dividerStyle} />
                <Hidden xsDown>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <CardPost post={posts[index1]}/>
                        </Grid>
                        <Grid item xs={4}>
                            <CardPost post={posts[index2]}/>
                        </Grid>
                        <Grid item xs={4}>
                            <CardPost post={posts[index3]}/>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden smUp>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <CardPost post={posts[index1]}/>
                        </Grid>
                        <Grid item xs={12}>
                            <CardPost post={posts[index2]}/>
                        </Grid>
                        <Grid item xs={12}>
                            <CardPost post={posts[index3]}/>
                        </Grid>
                    </Grid>
                </Hidden>

            </div>

        )
    }
}

export default withRouter(withStyles(styles)(Recommendation));