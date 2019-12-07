import app from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
        this.realdb = app.database();
    }
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    doSignOut = () => this.auth.signOut();

    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    createPost = (post) => {
        return this.db.collection("blog").add({
            ...post
        });
    };
    createPostData = (id) => {
        const data = {
            views: 0,
            comments: [],
        };
        return this.realdb.ref('posts/'+ id).set(data);
    };

    deletePost = (key) => {
        this.realdb.ref('posts/'+ key).remove();
        return this.db.collection('blog').doc(key).delete();
    };
    getPost = (key) => {
        return this.db.collection('blog').doc(key).get();
    };
    updatePost = (key, post) => {
        return this.db.collection('blog').doc(key).update({
            blocks: post.blocks,
            category: post.category
        });
    };

    /**
     * This method creates instances of posts
     * @param posts is array of posts
     * @return {Promise<void>}
     */
    createPostInstance = posts => {
        const postsObject = {};
        for(var i=0;i<posts.length;i++) {
            const post = posts[i];
            postsObject[post.key] = post.value;
        }
        return this.db.collection("posts").doc("1").set(postsObject);
    };

    getPostInstance = () => {
        return this.db.collection("posts").doc("1").get()
    };

    uploadPostImage = (file) => {
        console.log("Function is starting");
        return new Promise((resolve, reject) => {
            console.log("Promise started");
            const uploadTask = this.storage.ref(`blog/${file.name}`).put(file);
            uploadTask.then(
                () => {
                   this.storage.ref('blog').child(file.name).getDownloadURL().then((url) => resolve(url))
                }
            ).catch(() => {
                reject('error')
            })
        })
    };

    createPostComment = (key, comment) => {
        const data = {
            comment: comment,
            time: Date.now()
        };
        return this.realdb.ref('posts/'+key+'/comments').push().set(data);
    };


    getAllPostData = () => {
        return this.realdb.ref('posts/').once('value')
    };


    incrementViews = (key) => {
        const postRef =  this.realdb.ref('posts/'+key);
        postRef.transaction((post) => {
            if (post) {
                    post.views++;
            }
            return post;
        });
    }
}
export  default Firebase;