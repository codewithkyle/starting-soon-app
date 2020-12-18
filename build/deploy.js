const ghPages = require("gh-pages");

const NAME = "Kyle Andrews";
const EMAIL = "codingwithkyle@gmail.com";
const USERNAME = "codewithkyle";
const PROJECT = "starting-soon-app";

ghPages.publish(
    "public",
    {
        user: {
            name: NAME,
            email: EMAIL,
        },
        repo: "https://" + process.env.ACCESS_TOKEN + "@github.com/" + USERNAME + "/" + PROJECT + ".git",
        silent: false,
    },
    (error) => {
        if (error) {
            console.log(error);
        }
    }
);