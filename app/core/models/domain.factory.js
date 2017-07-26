angular.module("models")
    .factory("Domain", [ function(){
        class Domain {
            constructor(  ){
                this._key = null;
                this.description = null;
                this.icon = null;
                this.name = null;
                this.tooltip = null;
                this.questions = [];
                this.subdomains = [];
            }

            addQuestion(Question){
                this.questions.push(Question);
            }

            addSubdomain(Subdomain){
                this.subdomains.push(Subdomain);
            }
        }
        return Domain;
    }]);