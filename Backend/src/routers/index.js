const { Router } = require("express");
const { readdirSync } = require("fs");
const path = require("path");
const { logMiddleware } = require("../middleware/log");
const PATH_ROUTER = __dirname;

const router = Router();

const cleanFileName = (fileName) => {
    const file = fileName.split(".").shift();
    return file;
}

readdirSync(PATH_ROUTER).filter((filename) => {
    const cleanName = cleanFileName(filename);
    if(cleanName !== 'index'){
        const moduleRouter = require(`./${cleanName}`);
        router.use(`/${cleanName}`, logMiddleware, moduleRouter);
    }   
});

module.exports = { router };