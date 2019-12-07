import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import {styles} from './styles';
import {withStyles} from "@material-ui/styles";

class Post extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
            <div>
            {this.props.post.blocks.map((block)=> {
                    switch (block.type) {
                        case 'header':
                            return  (
                                    <Typography variant={'h'+(block.data.level+3)} className={classes.textTitle}>{block.data.text.replace(/(<([^>]+)>)/ig,"")}</Typography>
                            );
                        case 'paragraph':
                            return (
                                    <Typography variant='body1' className={classes.textPara} dangerouslySetInnerHTML={{__html:  block.data.text}}></Typography>
                            );
                        case 'image':
                            return (
                                <div>
                                    <img src={block.data.file.url} className={classes.image}/>
                                    <Typography className={classes.imageCaption}><i>{block.data.caption}</i></Typography>
                                </div>
                            );
                        case 'embed':
                            return (
                                        <iframe className={classes.embed} src={block.data.embed}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen></iframe>
                            );
                        case 'delimiter':
                            return (
                                <div className={classes.divider}>---*---*---</div>
                            );
                        case 'quote':
                            return (
                                        <div className={classes.quote}>
                                            <Typography variant={"body2"} className={classes.quoteText}>
                                                <i>"{block.data.text}"</i>
                                            </Typography>
                                            <div className={classes.quoteCaption}>
                                                {block.data.caption}
                                            </div>
                                        </div>
                            );
                    }
                })}
            </div>
        )
    }
}

export default withStyles(styles)(Post)