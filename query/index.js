const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

const postsAndComments = {}

const handleEvent = (type, payload) => {
    if (type === 'POST_CREATED') {
        const { id } = payload
        postsAndComments[id] = payload
        return 
    }

    if (type === 'COMMENT_CREATED') {
        const { postId } = payload
        postsAndComments[postId].comments.push(payload)
    }

    if (type === 'COMMENT_UPDATED') {
        const { id, postId, comment, status } = payload
        postsAndComments[postId].comments.find(c => c.id === id).status = status
        return
    }
}

app.get('/posts', (req, res) => {
    res.status(200).json({
        data: Object.values(postsAndComments),
        result: 0
    })
})

app.post('/events', (req, res) => {
    const { type, payload } = req.body

    handleEvent(type, payload)

    res.json({})
})

app.listen(3003, async () => {
    console.log('query listen on 3003')
    const { data } = await axios.get('http://localhost:4000/events')

    data.events.forEach(event => {
        handleEvent(event.type, event.payload)
    })
})