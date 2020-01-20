const Handlebars = require("handlebars");
const fs = require('fs-extra');
const path = require('path');

class HbsCompiler {
    constructor() {
        this.contractDir = path.resolve(__dirname, 'contracts');

        this.registerPartials();
        const choreographyContractFilePath = path.resolve(this.contractDir, 'choreography.sol.hbs');
        this.contract = this.compile(choreographyContractFilePath);
        console.log(this.contract);
    }

    registerPartials() {
        const partialsDir = path.resolve(this.contractDir, 'partials');
        for (const partialFileName of fs.readdirSync(partialsDir)) {
            const partialHbs = fs.readFileSync(path.resolve(partialsDir, partialFileName), "utf8");
            Handlebars.registerPartial(partialFileName.replace('.sol.hbs', ''), partialHbs);
        }
    }

    compile(contractFilePath) {
        const contractHbs = fs.readFileSync(contractFilePath, "utf8");
        const contractTemplate = Handlebars.compile(contractHbs);
        return contractTemplate({});
    }
}

new HbsCompiler();