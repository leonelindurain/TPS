const log4 = require('log4js')

log4.configure({
    appenders: {
        console: { type: 'console' },
        errorFile: { type: 'file', filename: './src/logger/logs/error.log' },
        warningFile: { type: 'file', filename: './src/logger/logs/warn.log' },

        loggerConsole: { type: 'logLevelFilter', appender: 'console', level: 'info' },
        loggerErrorFile: { type: 'logLevelFilter', appender: 'errorFile', level: 'error' },
        loggerWarningFile: { type: 'logLevelFilter', appender: 'warningFile', level: 'warn' }
    },
    categories: {
        default: {
            appenders: ['loggerConsole'], level: 'all'
        },
        prod: {
            appenders: ['loggerConsole','loggerErrorFile', 'loggerWarningFile'], level: 'all'
        }
    }
})

logger = log4.getLogger('prod')

module.exports = logger