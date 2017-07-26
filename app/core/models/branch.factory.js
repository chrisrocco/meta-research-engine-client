angular.module("models")
    .factory("Branch", [function(){
        class Branch {
            constructor( name ){
                this.name = name;
                this.responses = [];
            }

            addResponse( Response ){
                this.responses.push(Response);
            }
        }
        return Branch;
    }]);