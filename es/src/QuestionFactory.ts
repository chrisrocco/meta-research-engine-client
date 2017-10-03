class QuestionFactory {

    types: string[] = [
        "text",
        "number"
    ];

    make(type: string, name: string, desc: string, data: object){
        if(this.types.indexOf(type) === -1) throw "Illegal Type";
        if(type === "text"){
            return new TextQuestion(name, desc);
        }
    }

}