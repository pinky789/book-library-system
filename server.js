const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const filePath = require('./client/database/data.json');
const fs = require('fs');

app.use(bodyParser.json());
app.get('/api/books', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Connection", "keep-alive");
    res.send(JSON.stringify(filePath));
});

app.post('/api/books', (req, res) => {
    const finished = (error) => {
        if(error){
            console.log(error);
            return;
        }
    }
    res.send(JSON.stringify(req.body));
    let jsonData, jsonFileData;

    fs.readFile('./client/database/data.json', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        jsonFileData = JSON.parse(data);
        req.body.id = jsonFileData.length + 1;

        jsonData = jsonFileData.push(req.body);
        fs.writeFile('./client/database/data.json', JSON.stringify(jsonFileData), finished);
    })

});

app.put('/api/books/:id', (req, res) => {
    const finished = (error) => {
        if(error){
            console.log(error);
            return;
        }
    }
    res.send(JSON.stringify(req.body));

     fs.readFile('./client/database/data.json', 'utf8' , (err, data) => {
         if (err) {
             console.error(err)
             return
         }
         let jsonFileData = JSON.parse(data);

         let updatedJsonFileData = jsonFileData.map(book => {
             let returnValue = {...book};

             if (book.id == req.body.id) {
                 returnValue.title = req.body.title;
                 returnValue.description = req.body.description;
                 returnValue.author = req.body.author;
                 returnValue.count = req.body.count;
             }

             return returnValue;
         })

         fs.writeFile('./client/database/data.json', JSON.stringify(updatedJsonFileData), finished);
     })

});

app.listen(port, () => console.log(`Listening on port ${port}`));
