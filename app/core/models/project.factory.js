angular.module("models")
    .factory("Project", Project);
Project.$inject = ['Domain', 'Question'];
function Project(Domain, Question){
    class Project {
        constructor(  ){
            this.name = null;
            this.domains = [];
        }

        addDomain(Domain){
            this.domains.push(Domain);
        }

        static parseFromJson(projectData){
            var project = new Project();
            var hash_map = {};
            projectData.forEach(function(_domain){
                var domain = new Domain();
                extractDomain(domain, _domain, hash_map);
                project.addDomain(domain);
            });
            project.question_map = hash_map;
            return project;

            function extractDomain(model, src, question_map){
                // set properties
                model._key = src._key;
                model.description = src.description;
                model.icon = src.icon;
                model.name = src.name;
                model.tooltip = src.tooltip;
                // add the questions
                src.variables.forEach(function(_question){
                    var question = new Question();
                    angular.extend(question, _question);
                    question_map[question.key()] = question;
                    model.addQuestion(question);
                });
                // add the subdomains
                src.subdomains.forEach(function(_subdomain){
                    var subdomain = new Domain();
                    extractDomain(subdomain, _subdomain, question_map);
                    model.addSubdomain(subdomain);
                });
            }
        }
    }
    return Project;
}