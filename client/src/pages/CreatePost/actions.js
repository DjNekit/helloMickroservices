import axios from 'axios'
import { setPreloadData, setNewPost, setNewComment } from './slice'

export const getPreloadData = () => {
    return async dispatch => {
        const { data } = await axios.get('http://posts.com/posts')
        if (!data.result) {
            return dispatch(setPreloadData(data.data))
        }
    }
}

export const createPost = title => {
    return async dispatch => {
        const { data } = await axios.post('http://posts.com/posts/create', { title })
        if (!data.result) {
            return dispatch(setNewPost(data.data))
        }
    }
}

export const createComment = (comment, id) => {
    return async dispatch => {
        const { data } = await axios.post(`http://posts.com/posts/comments`, { id, comment })
        if (!data.result) {
            return dispatch(setNewComment({ id, comments: data.data }))
        }
    }
}