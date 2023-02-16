const bodyParser = require('body-parser');

const express = require('express');

const path = require('path');

const db = require('./config');

const port = parseInt(process.env.port) || 4000;

const app = express();

const route = express.Router();

app.use(
    route,
    express.json,
    bodyParser.urlencoded({extended: false}),
)

route.get('/', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, './view/index.html'))
})

route.get('/smartphone', (req, res)=>{
    const strQry =
    `
    SELECT id, prodName, color, price 
    FROM Products
    ;`;

    db.query(strQry, (err, data)=>{
        if(err) throw err;
        res.status(200).json({result:data});
    })
})

route.post('/record', bodyParser.json(), (req, res)=>{
    let info = req.body;
    console.log(info);

    const strQry = 
    `
    INSERT INTO Products
    SET ?;`;

    db.query(strQry, [info], (err)=>{
        if(err){
            res.status(400).json({err});

        }
        else{
            res.status(200).json({msg: "New smartphone was added."})
        }
    })
})

route.put('/smartphone/:id', bodyParser.json(), (req, res)=>{
    let records = req.body;
    console.log(records);

    const strQry =
    `
    UPDATE Products
    SET ?
    WHERE id = ?;`;

    db.query(strQry, [records, req.params.id], (err)=>{
        if(err) throw err;
        res.status(200).json({msg:"Record was updated."});
    })
})

route.delete('/smartphone/:id', (req, res)=>{
    const strQry =
    `
    DELETE FROM Products
    WHERE id = ?;`;

    db.query(strQry, [req.params.id], (err)=>{
        if(err) throw err;
        res.status(200).json({msg:"Info was deleted from database."})
    })
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})