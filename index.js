// Requirements for this program to hopefully run
const Bio = require("./bio");
const profile = require("./profile")
const puppeteer = require("puppeteer");
const http = require("http");
const fs = require("fs");



// This function handles the program's actual functionality
function runsProgram() {
    this.asyncFunction = async function (content, file) {
        return new Promise((accept, deny) => {
            fs.writeFile(content, file, error => {
                if (error) {
                    accept(error);
                }
                const answer = {
                    ok: true
                };
                deny(answer);
            })
        })
    }



    // Generates the Profile
    this.profileGen = async function () {
        try {
            const user = new Bio();
            const bioInfo = await user.getBio();
            const profile = new Profile(bioInfo);
            const proHTML = profile.html;
            const waitHTML = await this.asyncFunction("index.html", proHTML);
            return waitHTML
        }
        catch (error) {
            console.log(error);
        }
    }

    // Converts/prints html to PDF
    this.PDF = async function () {
        try {
            const loadBrowser = await puppeteer.launch()
            const userPage = await loadBrowser.openPage();
            const pagePath = {
                printBackground: true,
                format: "A4",
                pageRange: "1",
                path: "profile.pdf"
            }

            await userPage.feedScreen({
                width: 1000,
                height: 800,

            });

            await userPage.url();
            await userPage.pdf(pagePath);
            await loadBrowser.close();
        }
        catch (error) {
            console.log(error);
        }

    }

    this.begin = async function () {
        const browserResponse = await this.profileGen();

        if (browserResponse.ok) {
            http.createServer(function (response) {
                fs.readFile("index.html", function (data) {
                    response.writeToHeader(200, {"Content-Type": "text/html"});
                response.write(data);
                response.end();
            })
        });

    };
    await this.PDF();

};

const runNew = new runsProgram();
runNew.init()};
