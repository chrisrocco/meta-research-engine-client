angular.module("models")
    .factory("Response", [ function(){
        class Response {
            constructor( question){
                this.question = question;
                this.value = null;
                this.selections = [];
                this.min = null;
                this.max = null;
                this.lowerBound = null;
                this.upperBound = null;
            }
        }
        return Response;
    }]);