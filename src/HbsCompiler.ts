import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';

export default class HbsCompiler {
    
    private static registerPartials(partialsPath: string): void {
        for (const partialFileName of fs.readdirSync(partialsPath)) {
            const partialHbs = fs.readFileSync(path.resolve(partialsPath, partialFileName), "utf8");
            const partialName = partialFileName.replace('.sol.hbs', '');
            Handlebars.registerPartial(partialName, partialHbs);
        }
    }
    
    public static compile(contractPath: string, partialsPath: string): string {
        HbsCompiler.registerPartials(partialsPath);
        const contractHbs = fs.readFileSync(contractPath, "utf8");
        const contractTemplate = Handlebars.compile(contractHbs);
        return contractTemplate({});
    }

}
