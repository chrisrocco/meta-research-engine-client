import {BaseQuestion} from "./questions/BaseQuestion";

export class Category {
    name: string;
    desc: string = "Edit this description!";
    questions: BaseQuestion[];

    constructor(name: string, desc: string){
        this.name = name;
        this.desc = desc;
        this.questions = [];
    }

    addQuestion(question: BaseQuestion): void {
        this.questions.push(question);
    }
}