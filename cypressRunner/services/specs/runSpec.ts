const cypress = require('cypress');
const config = require('../../config/cypressRunner.config.json');

export function runSpecs(specs:string, index:number):Promise<any>{
    console.log(`Running Cypress thread #${index+1}`);
    return cypress.run({
        spec: specs,
        quiet: true,
        reporter: 'mochawesome',
        browser: config.browser,
        headless: config.headless,
        config: {
            baseUrl: config.appUrl,
            video: config.video,
            defaultCommandTimeout: config.defaultCommandTimeout,
        },
        reporterOptions: {
            html: false,
            quiet: true,
            consoleReporter: 'dot',
            reportFilename: `reportBatch_${index}`,
            overwrite: false
        },
        env: {}
    })
}

