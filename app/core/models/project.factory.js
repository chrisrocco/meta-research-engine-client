angular.module("models")
    .factory("Project", [ function(){
        class Project {
            constructor(  ){
                this.name = null;
                this.domains = [];
            }

            addDomain(Domain){
                this.domains.push(Domain);
            }

            static parseFromJson(){

            }
        }
        return Project;
    }]);