import { Survey } from "../src/Survey";
import { TextQuestion } from "../src/questions/TextQuestion";
import { Category } from "../src/Category";
import { Assignment } from "../src/Assignment";
import {Branch} from "../src/Branch";
import {TextResponse} from "../src/responses/TextResponse";

describe("TS Classes", function(){
    it("Survey classes should work", function(){

        let survey: Survey = new Survey("Test", "A test survey");
        let category: Category = new Category("Test", "A test category");
        let question: TextQuestion = new TextQuestion("Test", "A test Question");

        survey.addCategory(category);
        category.addQuestion(question);

        expect(survey.name).toEqual("Test");
        expect(survey.categories.length).toEqual(1);
        expect(survey.categories[0].questions.length).toEqual(1);
    });

    it("Assignment classes should not explode", function(){

        let assignment: Assignment = new Assignment(false, 0.0);
        let branch: Branch = new Branch("Test", "Test Branch");
        let response: TextResponse = new TextResponse(
            new TextQuestion("Test", "A test Question")
        );

        assignment.addBranch(branch);
        branch.addResponse(response);

        console.log(JSON.stringify(assignment));
    })
});