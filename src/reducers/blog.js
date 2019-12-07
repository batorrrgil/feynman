import {POST_ADD_COMMENT, POSTS_RECEIVE} from "../actions/blog";



export default function blogReducer (state={ posts: []}, action) {

    switch (action.type) {
        case POSTS_RECEIVE:
            return {
                ...state,
                posts: action.posts,
            };

        case POST_ADD_COMMENT:
            let posts = state.posts;
            const comment = {
                key: action.key,
                value: {
                    comment: action.comment,
                    time: Date.now()
                }
            };
            const index = posts.findIndex((item)=> {
                return item.key === action.postKey
            });
            posts[index].value.comments.push(comment);
            return  {
                ...state,
                posts: posts
            };
        default:
            return state

    }
}