const inquirer = require("inquirer");
const axios = require("axios");

// Begins the function that will take in the user's input for the bio
module.exports = function bio() {

    this.userInfo = {};

// This function sets the prompts for the user
    this.getBio = async function () {
        const userInput = await inquirer.prompt([
            {
                type: "input",
                message: "Please, enter your GitHub username. ",
                name: "userName"
            },
            {
                type: "input",
                message: "What is your favorite color? ",
                name: "color"
            }
            ]);

            // API call to get the user's GitHub bio based on their inputs
            let userInput = await axios.get(`https://api.github.com/users/${userInput.login}`);

            let getRepo = await axios.get(`https://api.github.com/users/${userInput.login}/repos`);

            // General practice - set default values to 0
            let numberOfStars = 0;
            for (let i = 0; i < getRepo.data.length; i++) {
                const stars = getRepo.data[i];
                numberOfStars += stars["star_count"];
                
            }

            this.userInfo = {
                userInput,
                userInfo.data,
                "star_count" : numberOfStars
            };

            return this.userInfo;
    }
}
