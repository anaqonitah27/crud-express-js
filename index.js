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

// get data by id
app.get('/kpi-utility/:id',(req,res)=>{
    // console.log('get data by id');
    let getId =  req.params.id;
    let queryID = `select * from kpi_utility where id = ${getId}`;
    db.query(queryID,(err,result)=>{
        if (err) {
            console.log(err);
        }
        if (result.length>0) {
            res.send({
                message:'get kpi utility by id',
                data: result
            });
        }else{
            res.send({
                message: 'data not found'
            })
        }
    })
})

// create data
app.post('/kpi-utility', (req, res)=>{
    // console.log('create data in kpi utility');
    console.log(req.body, 'created_data');

    let id = req.body.id;
    let month = req.body.month;  
    let create_date = req.body.create_date;  
    let last_update = req.body.last_update;  
    let user_create = req.body.user_create;
    let Index_Electricity = req.body.Index_Electricity;
    let Index_Steam = req.body.Index_Steam;
    let Index_Water = req.body.Index_Water;
    let utility_downtime = req.body.utility_downtime;
    let mtbf = req.body.mtbf;
    let mttr = req.body.mttr;
    let crp = req.body.crp;
    let Index_Low_Pres_Compresor = req.body.Index_Low_Pres_Compresor;
    let Index_High_Pres_Compresor = req.body.Index_High_Pres_Compresor;

    let queryCreated = `insert into kpi_utility(id, month, create_date, last_update, user_create, Index_Electricity, Index_Steam, Index_Water, utility_downtime, mtbf, mttr, crp, Index_Low_Pres_Compresor,Index_High_Pres_Compresor) 
    values ('${id})','${month}','${create_date}','${last_update}','${user_create}','${Index_Electricity}','${Index_Steam}','${Index_Water}','${utility_downtime}','${mtbf}','${mttr}','${crp}','${Index_Low_Pres_Compresor}','${Index_High_Pres_Compresor}')`;
    console.log(queryCreated, 'query-created-data');

    db.query(queryCreated, (err, result) =>{
        if(err){
            console.log(err);
        }
        console.log(result, 'result');
        res.send({
            message: 'data inserted'
        })
    })

})

app.listen(3000, () => {
    console.log('server-running');
})