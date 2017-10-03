class ResponseFactory {

    types: string[] = [
        "text",
        "number"
    ];

    make(type: string, data: object, question: BaseQuestion){
        if(this.types.indexOf(type) === -1) throw "Illegal Type";
        if(type === "text"){
            return new TextAnswer(question, data['str_val']);
        }
    }

}