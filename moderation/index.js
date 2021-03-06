const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.json())

app.post('/events', async (req, res) => {
    const { type, payload } = req.body

    if (type === 'COMMENT_CREATED') {
        const badWords = ['хуй', 'пизда', 'соси', 'член', 'сельдерей']
        const commentObj = payload
            
        for (let i = 0; i < badWords.length + 1; i++) {
            if (commentObj.comment.toLowerCase().includes(badWords[i])) {
                commentObj.status = 'rejected'
                break
            }
        }

        if (commentObj.status !== 'rejected') commentObj.status = 'approved' 
        return axios.post(
            'http://event-bus-srv:4000/events', 
            { type: 'COMMENT_MODERATED', payload: commentObj }
        )
        .catch(e => console.log(e))
    }
    res.json({})
})


app.listen(3004, () => console.log('moderation works on 3004'))