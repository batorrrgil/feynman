import React from 'react'
import Editor from '../../Admin/PostCreate/Editor'
import {withAuthorization} from "../../Session";

class PostCreate extends React.Component {
    render() {
        return (
            <div><Editor/></div>
        )
    }
}
const condition = authUser => !!authUser
export default withAuthorization(condition)(PostCreate);