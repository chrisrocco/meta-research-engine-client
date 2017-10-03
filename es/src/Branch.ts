import {BaseResponse} from "./responses/BaseResponse";
import {Survey} from "./Survey";

export class Branch {
    name: string;
    desc: string = "Edit this description!";
    responses: BaseResponse[];
    survey: Survey;

    constructor(name: string, desc: string, survey: Survey){
        this.name = name;
        this.desc = desc;
        this.responses = [];
        this.survey = survey;
    }

    addResponse(response: BaseResponse){
        this.responses.push(response);
    }
}