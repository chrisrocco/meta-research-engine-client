import {Branch} from "./Branch";

export class Assignment {
    published: boolean;
    completion: number;
    branches: Branch[];

    constructor(published: boolean, completion: number){
        this.published = published;
        this.completion = completion;
        this.branches = [];
    }

    addBranch(branch: Branch){
        this.branches.push(branch);
    }
}