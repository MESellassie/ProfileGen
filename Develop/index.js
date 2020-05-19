// function writeToFile(fileName, data) {
 
// }

// function init() {

// init();

const fs = require("fs");
const axios = require("axios");
const inquirer = require ("inquirer");
const convertFactory = require(`electron-html-to`);

const conversion = convertFactory({ converterPath: convertFactory.converters.PDF });

let data = {};

let questions = [
    {
        message: `What is your github username?`,
        name: `username`,
    },
    {
        message: `What is your favorite color`,
        name: `color`,
        type: `list`,
        choices: [`blue`, `red`, `black`, `green`]
    }
]

function init() {
    inquirer
    .prompt(questions)
    .then(function ({username, color}) {
        const queryUrl = `https://api.github.com/users/${username}`;
    })
}