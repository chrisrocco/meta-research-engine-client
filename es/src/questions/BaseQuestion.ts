export abstract class BaseQuestion {
    type: string;
    name: string;
    desc: string;

    constructor(name: string, desc: string){
        this.name = name;
        this.desc = desc;
        this.type = this.getType();
    }

    abstract getType(): string;
}