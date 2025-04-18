import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf } = format;

// Define the custom format for log messages using arrow function
const customFormat = printf(({ level, message, timestamp }) => 
  `${timestamp} : ${level}: ${message}`
);

// Create the logger
export const logger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' })
  ]
});
