angular
    .module("paper-coder")
    .factory("paper-coder.service", paperCoderService);

function paperCoderService() {

    var assignment = defaultModel;

    var service = {
        toggleScope: toggleScope,
        deleteBranch: deleteBranch,
        loadAssignment: loadAssignment,
        newBranch: newBranch,
        calculateCompletion: calculateCompletion,
        toggleComplete: toggleComplete,
        getAssignment: getAssignment,
        branchContains: branchContains
    };
    return service;


    /**
     * Given a field input object, check where it exists ( constants or branches ).
     * If it is in constants -> move an instance into all branches. Delete from constants
     * If it is in branches -> move an instance into constants. Delete from branches
     * @param inputObject
     */
    function toggleScope(inputObject) {
        if (branchContains(assignment.constants, inputObject.question)) {		// If the field exists in constants
            branchRemove(assignment.constants, inputObject.question);				// Remove it from constants
            for (var i = 0; i < assignment.branches.length; i++) {			// Add it to all branches
                branchAdd(assignment.branches[i], inputObject.question);
            }
        } else {
            for (var i = 0; i < assignment.branches.length; i++) {
                branchRemove(assignment.branches[i], inputObject.question);
            }
            branchAdd(assignment.constants, inputObject.question);
        }
    }

    function branchRemove(branch, fieldName) {
        for (var i = 0; i < branch.length; i++) {
            var fieldObject = branch[i];
            if (fieldObject.question === fieldName) {
                branch.splice(i, 1);
                console.log( "removed question from a branch " );
                return true;
            }
        }
        return false;
    }

    function branchContains(branch, questionKey) {
        for (var i = 0; i < branch.length; i++) {
            var fieldObject = branch[i];
            if (fieldObject.question === questionKey) return true;
        }
        return false;
    }

    function branchAdd(branch, fieldName) {
        branch.push({
            question: fieldName,
            data: {
                value: ""
            }
        })
    }

    function deleteBranch(branchObject){
        var branches = assignment.branches;
        if(branches.length === 1) return;

        var index = branches.indexOf(branchObject);
        if(index == -1) return;
        branches.splice(index, 1);
    }

    function newBranch(){
        var cloneOfFirstBranch = JSON.parse(JSON.stringify(assignment.branches[0]));
        assignment.branches.push(cloneOfFirstBranch);
    }

    function calculateCompletion() {
        if( !assignment ) return 0;

        var totalInputs = assignment.constants.length + ( assignment.branches.length * assignment.branches[0].length );
        var filledInputs = 0;

        /* Rocco Algorithm */
        for(var i = 0; i < assignment.constants.length; i++){
            var inputObject = assignment.constants[i];
            if( isFilled(inputObject) ){
                filledInputs++;
            }
        }
        for(var i = 0; i < assignment.branches.length; i++){
            for(var j = 0; j < assignment.branches[i].length; j++){
                var inputObject = assignment.branches[i][j];
                if( isFilled(inputObject) ){
                    filledInputs++;
                }
            }
        }

        var completion = (filledInputs/totalInputs * 100).toFixed(2);
        assignment.completion = completion;
        return completion;

        function isFilled(input){
            if( input.data.value ){
                return input.data.value !== "";
            }
            if( input.data.rangeMin && input.data.rangeMin ){
                return input.data.rangeMin !== "" &&
                    input.data.rangeMin !== ""
            }
            return false;
        }
    }

    function toggleComplete(){
        assignment.done = !assignment.done;
    }


    /**
     * Initializes this service's assignment object
     * @param assignmentObject
     */
    function loadAssignment(assignmentObject) {
        assignment = assignmentObject;
        console.log( "loaded: ", assignmentObject);
    }
    function getAssignment(){
        return assignment;
    }
}



const defaultModel = {
    done: false,
    completion: 0,
    encoding: {
        constants: [],
        branches:  [[]]
    }
};