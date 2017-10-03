import {TextQuestion} from "../questions/TextQuestion";
import {BaseResponse} from "./BaseResponse";

export class TextResponse extends BaseResponse {

    question: TextQuestion;
    str_val: string;

    constructor(question: TextQuestion, str_val: string = ""){
        super(question);
        this.str_val = str_val;
    }

    isComplete(): boolean {
        return this.str_val !== "";
    }

    getType(){
        return "text";
    }
}