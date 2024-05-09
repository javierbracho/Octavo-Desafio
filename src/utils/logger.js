import winston from "winston";
import configObject from "../config/config.js"

const {log_level} = configObject

const customLevel = {
    levels: {
        fatal:0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5

    },
    colors: {
        fatal: "magenta",
        error: "red",
        warning: "yellow",
        info: "green",
        http: "cyan",
        debug: "gray",
    },
}

const logger = winston.createLogger({
    levels: customLevel.levels,
    transports: [
        new winston.transports.Console({
            level: log_level,
            format: winston.format.combine(
                winston.format.colorize({colors: customLevel.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "./src/errorLog/errors.log",
            level: "error",
            format: winston.format.simple()
        })
    ]
})

const addLogger = (req,res,next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

export {logger ,addLogger}