const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
let jwt;
const localPath = "https://polonska-diploma.herokuapp.com/api";

async function auth(){
    return await fetch(`${localPath}/auth/local`, {
        method: "POST",
        body: JSON.stringify({
            // TODO move to .env
            identifier: 'pro-german@ukr.net',
            password: 'Alexandria21'
        }),
        headers: {
            "content-type": "application/json"
        }
    });
}

function formatAnswer(str){
    console.log(str);
    let res = str.replace(/\s/g, "").toLowerCase();
    return res;
}

async function checkAnswers(taskID, currAnswer){
    /*
        1) get current answer and task ID from user (params)
        2) get right answers (array) from Strapi
        3) compare
    */
    let resp = await fetch(`${localPath}/platform-one-tasks/${taskID}?populate=*`, {
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    });
    let body = await resp.json();
    console.log(taskID, currAnswer, body);
    let rightAnswers = body.data.attributes.right_answers.data.map(el => formatAnswer(el.attributes.answer));
    currAnswer = formatAnswer(currAnswer);
    let res = rightAnswers.some(el => el == currAnswer);
    return res;
}

app.post('/', async function (req, res) {
    let resp = await auth();
    let body = await resp.json();
    console.log(body);
    jwt = body.jwt;

    let listAnswers = req.body.listAnswers;

    /*
        [
            {
                taskID, answer, answerID
            }
        ]
    */

    for(let i=0; i<listAnswers.length; i++){
        let {taskID, answer, answerID} = listAnswers[i];
        console.log(listAnswers)
        let isRight = await checkAnswers(taskID, answer);
        console.log(isRight);
        // if it is right - it is right
        // otherwise - it can be right, can be false
        if(isRight){
            resp = await fetch(`${localPath}/platform-answer-to-one-tasks/${answerID}`, {
                method: "PUT",
                body: JSON.stringify({
                    data: {
                        isRight: isRight
                    }
                }),
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "content-type": "application/json"
                }
            });
            console.log(JSON.stringify({
                IsRight: isRight
            }));
            body = await resp.json();
            console.log(body);
        }
    }

    res.send("ok");
})

app.get('/', async function (req, res) {
    res.send("yes, it's me");
})

let port = process.argv[2];

app.listen(port)