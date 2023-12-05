import winston from "winston";
import dotenv from 'dotenv';
dotenv.config()

const customWinstonLevels = {
    levels: {
        error: 0,
        info: 1,
        debug: 2,
        http: 3,
        warning: 4,
        fatal: 5
    },

    colors: {
        error: "red",
        debug: "green",
        http: "blue",
        info: "white",
        warning: "yellow",
        fatal: "purple"
    }
}

winston.addColors(customWinstonLevels.colors)


const createLogger = env => {
    if (env === 'PROD') {
        return winston.createLogger({
            levels: customWinstonLevels.levels,
            transports: [
                new winston.transports.File({
                    filename: 'server.log',
                    level: 'info',
                    format: winston.format.json()
                }),
                new winston.transports.File({
                    filename: 'errors.log',
                    level: 'error'
                })
            ]
        })
    } else {
        return winston.createLogger({
            levels: customWinstonLevels.levels,
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                }),
                new winston.transports.Console({
                    level: 'error',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.simple()
                    )  
                })
            ]
        })  
    }
} 




const logger = createLogger(process.env.ENVIRONMENT)

export default logger 