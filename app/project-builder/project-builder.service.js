angular
    .module("project-builder")
    .factory("project-builder.service", projectBuilderService);

function projectBuilderService() {
    var service = {
        createQuestion:     createQuestion,
        deleteQuestion:     deleteQuestion,
        updateQuestion:     updateQuestion,
        createDomain:   createDomain,
        updateDomain:   updateDomain,
        deleteDomain:   deleteDomain,
        openProject: openProject,
        getQuestions: getQuestions,
        getDomains: getDomains,
        subscribe: subscribe
    };
    return service;
    /*==============================*/
    var projectStructure = {
        domains: [],
        questions: []
    };

    function createQuestion( data ){
        projectStructure.questions.push( data );
    }
    function createDomain( data ){
        projectStructure.domains.push( data );
    }

    function getQuestions(){
        return projectStructure.questions;
    }
    function getDomains() {
        return projectStructure.domains;
    }

    function updateQuestion(){}
    function updateDomain(){}

    function deleteQuestion( question ){

    }
    function deleteDomain( domain ){

    }

    function openProject( structure ){
        projectStructure = structure;
    }

    var observers = [];
    function subscribe( callback ){
        observers.push(callback);
    }
    function notify(){
        for (var i = 0; i < observers.length; i++) {
            var cb = observers[i];
            cb();
        }
    }
}