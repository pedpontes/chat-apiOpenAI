const bodyParser = require('body-parser')
const path = require('path')
const express = require('express')
const app = express()
var texto = ''
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: '', //insira sua api key
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use('/', express.static(path.join('client')))

app.post('/enviar', async (req,res) => {
    texto = texto + 'EU:' + req.body.text
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: texto,
        temperature: 0.5,
        n: 1,
        max_tokens: 2500,
        stop: ['EU:','IA:']
    });
    const resp = response.data.choices[0].text
    res.status(200).json({body: {text: resp}})
    texto = texto + 'IA:' + resp;
})

app.listen(3000,() => console.log('servidor aberto'), )



    
