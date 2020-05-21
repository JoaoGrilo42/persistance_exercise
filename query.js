const dbPool = require('pg').Pool
const pool = new dbPool({
    user: 'ballard',
    host: 'localhost',
    database: 'persistant_exercise',
    password: 'ballard',
    port: 5432
})

const getStudents = (req, res) => {
    pool.query('SELECT * FROM students ORDER BY name ASC;', (err, results) => {
        if(err){
            throw err;
        }
        res.status(200).json(results.rows)
    })
}

const getStudentByID = (req, res) => {
    console.log(req.params.studentId)
    pool.query('SELECT id, name FROM students WHERE studentID = $1 ORDER BY name ASC;',
         [req.params.studentId], (err, results) => {
            if(err){
                throw err;
            }
            res.status(200).json(results.rows);
    })
}

const getStudentBySearch = (req, res) => {
    console.log(req.query.search)
    pool.query('SELECT id, name FROM students WHERE name = $1 ORDER BY name ASC;',
         [req.query.search], (err, results) => {
            if(err){
                throw err;
            }
            res.status(200).json(results.rows)
    })
}

const getGradesByID = (req, res) => {
    pool.query('SELECT id, name, grade FROM students WHERE studentID = $1 ORDER BY name ASC;',
         [req.params.studentId], (err, results) => {
            if(err){
                throw err
            }
            res.status(200).json(results.rows)
    })
}

const postGrade = (req, res) => {
    console.log(req.body.grade)
    console.log(req.body.studentId)
    pool.query('UPDATE students SET grade = $1 WHERE studentId = $2;',
         [req.body.grade, req.body.studentId],
         (err, result) => {
             if(err){
                 throw err
             }
             res.status(200).send('Grade updated successfully')
         })
}

const postCreateStudent = (req, res) => {
    console.log("creating student")
    pool.query('INSERT INTO students (name, studentID) VALUES($1, $2)',
         [req.body.name, req.body.studentID], (err, results) => {
             if(err){
                 throw err;                 
             }
             res.status(201).send('Student added successfully')
         })
}

module.exports = {getStudents, 
                  getStudentByID, 
                  getStudentBySearch, 
                  getGradesByID, 
                  postGrade, 
                  postCreateStudent
                }


