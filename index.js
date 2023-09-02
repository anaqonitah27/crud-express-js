const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

// database connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'utilitykjyn',
    port:3306
});

// check database connection
db.connect(err=>{
    if(err) {console.log(err, 'error');}
    console.log('database connected...');
});

// get data in postman
app.get('/kpi-utility', (req,res)=>{
    // console.log('get-kpi-utility');
    let query = `select * from kpi_utility`;
    db.query(query, (err, result)=>{
        if(err){
            console.log(err, 'error');
        }if(result.length>0){
            res.send({
                message:'all data in kpi-utility',
                data:result
            })
        }
    })
})

app.listen(3000, () => {
    console.log('server-running');
})