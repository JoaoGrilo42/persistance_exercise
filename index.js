const express = require('express');
const app = express();
const port = 8080;
const db = require('./query')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.json({info: 'Student Exercise'})
})

app.get('/student', (req, res) => {
    if(req.query.search){
        db.getStudentBySearch(req, res)
    }
    else{
        db.getStudents(req, res)
    }
})

app.get('/student/:studentId', db.getStudentByID)
app.get('/grade/:studentId', db.getGradesByID)
app.post('/grade', db.postGrade)
app.post('/register', db.postCreateStudent)

app.listen(port, () => {
    console.log("Listening on port:" + port)
})