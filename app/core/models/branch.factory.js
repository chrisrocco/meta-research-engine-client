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

            hasQuestion( question_id ){
                this.responses.forEach(function(response){
                    if(response.question === question_id ) return response;
                });
                return false;
            }
        }
        return Branch;
    }]);