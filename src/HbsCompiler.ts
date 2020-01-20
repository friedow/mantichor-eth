import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';

export default class HbsCompiler {

    public contractPath: string;
    public partialsPath: string;

    constructor(contractPath: string, partialsPath: string) {
        this.contractPath = contractPath;
        this.partialsPath = partialsPath;

        this.registerPartials();
    }

    private registerPartials(): void {
        for (const partialFileName of fs.readdirSync(this.partialsPath)) {
            const partialHbs = fs.readFileSync(path.resolve(this.partialsPath, partialFileName), "utf8");
            const partialName = partialFileName.replace('.sol.hbs', '');
            Handlebars.registerPartial(partialName, partialHbs);
        }
    }

    public compile(): string {
        const contractHbs = fs.readFileSync(this.contractPath, "utf8");
        const contractTemplate = Handlebars.compile(contractHbs);
        return contractTemplate({});
    }
}
