import React from 'react'
import {Typography} from "@material-ui/core";
import {categoryConverter, timeConverter} from "../../utils/HelperFunctions";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {compose} from 'recompose';
import {withStyles} from "@material-ui/styles";
import {styles} from './styles';
import {withRouter} from 'react-router-dom';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import Sms from '@material-ui/icons/Sms';
import * as ROUTERS from  '../../constants/routes'
import {connect} from "react-redux";
import {changeQuery} from "../../actions/page";

class Post extends React.Component {
    onClick = () => {
        this.props.onClearSearchQuery();
        this.props.history.push(ROUTERS.POST+this.props.post.key)
    };
    render() {
        const classes = this.props.classes;
        const post = this.props.post;
        return (
            <div onClick={this.onClick} className={classes.root}>

                <Typography variant='body2' color='secondary'><span>{categoryConverter(post.value.category).toUpperCase()}</span>  <span className={classes.textDate}> - {timeConverter(post.value.time)}</span></Typography>
                    {post.value.blocks.map((block)=>{
                        switch (block.type) {
                            case 'header':
                                return <Typography variant='h5' className={classes.textTitle}><b>{block.data.text.replace(/(<([^>]+)>)/ig,"")}</b></Typography>
                            case 'paragraph':
                                return <Typography variant='body1' className={classes.textPara} dangerouslySetInnerHTML={{__html:  block.data.text}}></Typography>
                            case 'image':
                                return <img src={block.data.file.url} width='100%'/>
                            case 'embed':
                                return <iframe width="100%" src={block.data.embed}
                                               frameBorder="0"
                                               allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                               allowFullScreen></iframe>
                        }
                    })}
                <Typography variant="body2" className={classes.textReadMore}>Цааг унших...</Typography>

                <Grid container justify='space-between'>
                    <Grid item>
                        <Grid container justify='flex-start'>
                            <Grid item>
                                <RemoveRedEye className={classes.icon}/>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" className={classes.iconText}>{post.value.views}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container justify='flex-end'>
                            <Grid item>
                                <Typography variant="body2" className={classes.iconText}>{post.value.comments.length}</Typography>
                            </Grid>
                            <Grid item>
                                <Sms className={classes.icon}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                    <Divider className={classes.dividerStyle}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onClearSearchQuery: () => {
        dispatch(changeQuery(''))
    }
});

export default compose(
    connect(null, mapDispatchToProps),
    withRouter,
    withStyles(styles)
)(Post)