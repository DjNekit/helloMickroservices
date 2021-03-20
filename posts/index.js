const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

const posts = []

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body
    const postData = { id, title, comments: [] }

    posts.push(postData)
    await axios.post('http://event-bus-srv:4000/events', {
        type: 'POST_CREATED', payload: postData
    })
    .catch(e => console.log(e))

    res.status(201).json({ data: postData, result: 0 })
})

app.post('/events', (req, res) => {
    res.json({})
})

app.listen(3001, () => {
    console.log('v4')
    console.log('post service has been started on port 3001')
})