angular
    .module("project-builder")
    .factory("project-builder.service", projectBuilderService);

function projectBuilderService() {
    var service = {

    };
    return service;
    /*==============================*/
    var projectStructure = {
        domains: [],
        questions: []
    };

    function createQuestion(){}
    function deleteQuestion(){}
    function updateQuestion(){}
    function createDomain( domain ){

    }
    function updateDomain(){}
    function deleteDomain(){}

    function openProject( structure ){
        projectStructure = structure;
    }
}



const defaultModel = {
    domains: [],
    questions: []
};