import axios from 'axios'
import { setPreloadData, setNewPost, setNewComment } from './slice'

export const getPreloadData = () => {
    return async dispatch => {
        const { data } = await axios.get('http://localhost:3003/posts')
        if (!data.result) {
            return dispatch(setPreloadData(data.data))
        }
    }
}

export const createPost = title => {
    return async dispatch => {
        const { data } = await axios.post('http://localhost:3001/posts', { title })
        if (!data.result) {
            return dispatch(setNewPost(data.data))
        }
    }
}

export const createComment = (comment, id) => {
    return async dispatch => {
        const { data } = await axios.post(`http://localhost:3002/posts/${id}/comments`, { comment })
        if (!data.result) {
            return dispatch(setNewComment({ id, comments: data.data }))
        }
    }
}