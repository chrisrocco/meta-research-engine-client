/**
 * Created by Chris Rocco on 3/29/2017.
 */
angular
    .module("paper-coder")
    .factory("editor.service", EditorService)


function EditorService() {
    var service = {
        setView: setView,
        getInput: getInput,
        getField: getField,
        registerObserver: registerObserver,
        getInputForm: getInputForm
    }
    return service;

    //////////////////////////////////////////////////////
    var fieldObject;
    var inputObject;
    var observer;
    function setView(fieldBinding, inputBinding){
        fieldObject = fieldBinding;
        inputObject = inputBinding;
        console.log("Viewing Object: ", fieldObject);
        console.log("Binded Input: ", inputObject);
        observer.notify();
    }
    function getInput(){
        return inputObject;
    }
    function getField(){
        return fieldObject;
    }
    function registerObserver(observerObject){
        observer = observerObject;
    }
    function getInputForm(type){
        return '../app/paper-coder/editor/input/input-' + type + '.html'
    }
}