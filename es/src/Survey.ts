import {Category} from "./Category";

export class Survey {
    name: string;
    desc: string;
    categories: Category[];

    constructor(name: string, desc: string){
        this.name = name;
        this.desc = desc;
        this.categories = [];
    }

    addCategory(category: Category): void {
        this.categories.push(category);
    }
}