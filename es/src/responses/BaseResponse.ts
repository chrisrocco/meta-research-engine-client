import {BaseQuestion} from "../questions/BaseQuestion";

export abstract class BaseResponse {
    type: string;
    question: BaseQuestion;

    constructor(question: BaseQuestion){
        this.question = question;
        this.type = this.getType();
    }

    abstract isComplete(): boolean;
    abstract getType(): string;

    // TODO: hide question property from JSON.stringify()
}