import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '100%',
        //padding: theme.spacing(1),
        margin: theme.spacing(3)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    header: {
        height: 6,
    }
}));

function PostsCard( props ) {

    const post = props.post
    const styles = useStyles();

    return (
        <Card className={styles.card}>
            <CardHeader
                action={
                    <IconButton aria-label="More">
                        <MoreVertIcon />
                    </IconButton>
                }
                subheader={timeConverter(post.time) + " " + "•" + " " + "Technology"}
            />
            {post.blocks.slice(0, 3).map((block) => {
                switch (block.type) {
                    case 'image':
                        return (
                            <CardMedia
                                className={styles.media}
                                image={block.data.file.url}
                                title={block.data.name}
                            />)
                        break
                    case 'embed':
                        return (<CardMedia><iframe width="100%" src={block.data.embed}
                                                   frameBorder="0"
                                                   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                   allowFullScreen></iframe></CardMedia>)
                        break
                }
            })}
            {post.blocks.slice(0, 3).map((block) => {
                switch (block.type) {
                    case 'header':
                        return (<CardContent className={styles.header}><Typography className={styles.textTitle}>
                            <b>{block.data.text.replace(/(<([^>]+)>)/ig,"")}</b>
                        </Typography></CardContent>)
                        break
                }
            })}
            {post.blocks.slice(0, 3).map((block) => {
                switch (block.type) {
                    case 'paragraph':
                        return (<CardContent><Typography variant='body2' dangerouslySetInnerHTML={{__html:  block.data.text.slice(0,260)+'...'}}>
                        </Typography></CardContent>)
                        break
                }
            })}
        </Card>
    );
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Нэгдүгээр сар','Хоёрдугаар сар','Гуравдугаар сар','Дөрөвдүгээр сар','Тавдугаар сар','Зургадугаар сар','Долдугаар сар','Наймдугаар сар','Есдүгээр сар','Аравдугаар сар','Арваннэгдүгээр сар','Арванхоёрдугаар сар'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

export default PostsCard;