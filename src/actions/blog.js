export const POSTS_RECEIVE = 'POSTS_RECEIVE';
export const POST_ADD_COMMENT = 'POST_ADD_COMMENT';

export function addPosts(posts) {
    return {
        type: POSTS_RECEIVE,
        posts
    }
}
export function addComment(postKey, key, comment) {
    return {
        type: POST_ADD_COMMENT,
        postKey: postKey,
        key: key,
        comment: comment,
    }
}

export function handleInitialData(firebase) {
    return (dispatch) => {
        let posts = {};
        let out = [];
        firebase.getPostInstance().then(data => {
            posts = {
                ...data.data()
            };
            out = Object.entries(posts).map(([key, value]) => ({key,value}));
            out.sort(function(a,b) {
                return b.value.time - a.value.time;
            })
        }).then(() => {
            /**
             * Dangerous code (Update this code when you find another solution)
             */
            firebase.getAllPostData().then((snapshot)=> {
                for(var i=0;i<out.length;i++) {
                    snapshot.val()[out[i].key].comments !== undefined
                        ? out[i].value.comments =  Object.entries(snapshot.val()[out[i].key].comments).map(([key, value]) => ({key,value}))
                        : out[i].value.comments = [];
                    out[i].value.views = snapshot.val()[out[i].key].views
                }
                dispatch(addPosts(out));
            })
        })

    }
}