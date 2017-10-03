import {BaseQuestion} from "./BaseQuestion";

export class TextQuestion extends BaseQuestion {
    getType(): string {
        return "text";
    }

    constructor(name: string, desc: string){
        super(name, desc);
    }
}