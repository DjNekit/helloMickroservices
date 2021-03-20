const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    const { id } = req.params
    if (!commentsByPostId[id]) {
        commentsByPostId[id] = []
    }
    res.status(200).json({ data: commentsByPostId[id], result: 0 })
})

app.post('/posts/comments', async (req, res) => {
    const { id, comment } = req.body
    const commentId = randomBytes(4).toString('hex')

    const commentData = {
        id: commentId, 
        postId: id, 
        comment,
        status: 'pending'
    }

    commentsByPostId[id] 
        ? commentsByPostId[id].push(commentData)
        : commentsByPostId[id] = [commentData]

    await axios.post('http://event-bus-srv:4000/events', {
        type: 'COMMENT_CREATED', payload: commentData
    })
    
    res.status(201).json({ data: commentsByPostId[id], result: 0 })
})

app.post('/events', (req, res) => {
    const { type, payload } = req.body
    
    
    if (type === 'COMMENT_MODERATED') {
        const { id, postId, status, comment } = payload
        const commentObj = commentsByPostId[postId].find(c => c.id === id)
        commentObj.status = status
        commentObj.comment = comment
        
        axios.post('http://event-bus-srv:4000/events', { 
            type: 'COMMENT_UPDATED', payload: commentObj 
        })
        .catch(e => console.log(e))

        return
    }

    res.json({})

})

app.listen(3002, () => console.log('comment service has been started on port 3002'))