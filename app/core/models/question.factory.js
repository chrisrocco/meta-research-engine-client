angular.module("models")
    .factory("Question", [ function(){
        class Question {
            constructor(  ){
                this.name = null;
                this.question = null;
                this.domain = null;
                this.options = null;
                this.min = null;
                this.max = null;
            }
        }
        return Question;
    }]);