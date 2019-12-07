import React from 'react'
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import {categoryConverter, timeConverter} from "../../utils/HelperFunctions";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/styles";
import * as ROUTERS from "../../constants/routes";
import {styles} from "./styles";
import Hidden from '@material-ui/core/Hidden';

class TopPost extends React.Component {
    
    render() {
        const post = this.props.post;
        const classes = this.props.classes;
        return (
            <Grid container spacing={3}>
                <Hidden xsDown>
                    <Grid item xs={6}>
                        <Typography variant='h6' color='secondary'>{categoryConverter(post.value.category).toUpperCase()}</Typography>
                        <Typography variant='body2' className={classes.topDate}>{timeConverter(post.value.time)}</Typography>
                        <Link to={ROUTERS.POST+post.key} className={classes.topTitle}>
                            <Typography variant='h4' >
                                <b>{post.value.blocks.map(block => {
                                    if(block.type === 'header') return block.data.text
                                })}</b>
                            </Typography>
                        </Link>
                        <Typography variant='body1'>
                            {post.value.blocks.map(block => {
                                if(block.type === 'paragraph') return block.data.text.replace(/(<([^>]+)>)/ig,"")
                            })}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {post.value.blocks.map(block => {
                            if(block.type === 'image')
                                return <img className={classes.topImage} src={block.data.file.url}/>
                            else if (block.type == 'embed')
                                return <iframe className={classes.topEmbed} src={block.data.embed}
                                               frameBorder="0"
                                               allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                               allowFullScreen></iframe>
                        })}
                    </Grid>
                </Hidden>
                <Hidden smUp>
                    <Grid item xs={12}>
                        {post.value.blocks.map(block => {
                            if(block.type === 'image')
                                return <img className={classes.topImage} src={block.data.file.url}/>
                            else if (block.type == 'embed')
                                return <iframe className={classes.topEmbed} src={block.data.embed}
                                               frameBorder="0"
                                               allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                               allowFullScreen></iframe>
                        })}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6' color='secondary'>{categoryConverter(post.value.category).toUpperCase()}</Typography>
                        <Typography variant='body2' className={classes.topDate}>{timeConverter(post.value.time)}</Typography>
                        <Link to={ROUTERS.POST+post.key} className={classes.topTitle}>
                            <Typography variant='h4' >
                                <b>{post.value.blocks.map(block => {
                                    if(block.type === 'header') return block.data.text
                                })}</b>
                            </Typography>
                        </Link>
                        <Typography variant='body2'>
                            {post.value.blocks.map(block => {
                                if(block.type === 'paragraph') return block.data.text.replace(/(<([^>]+)>)/ig,"").slice(0,120)+'...'
                            })}
                        </Typography>
                    </Grid>

                </Hidden>
            </Grid>
        )
    }
}
export default withStyles(styles)(TopPost);