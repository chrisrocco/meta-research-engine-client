angular
    .module("paper-coder")
    .factory("paper-coder.service", paperCoderService);

function paperCoderService() {

    var assignment;

    var service = {
        toggleScope: toggleScope,
        deleteBranch: deleteBranch,
        loadAssignment: loadAssignment,
        newBranch: newBranch,
        calculateCompletion: calculateCompletion,
        toggleComplete: toggleComplete
    };
    return service;


    /**
     * Given a field input object, check where it exists ( constants or branches ).
     * If it is in constants -> move an instance into all branches. Delete from constants
     * If it is in branches -> move an instance into constants. Delete from branches
     * @param inputObject
     */
    function toggleScope(inputObject) {
        if (branchContains(assignment.encoding.constants, inputObject.field)) {		// If the field exists in constants
            branchRemove(assignment.encoding.constants, inputObject.field);				// Remove it from constants
            for (var i = 0; i < assignment.encoding.branches.length; i++) {			// Add it to all branches
                branchAdd(assignment.encoding.branches[i], inputObject.field);
            }
        } else {
            for (var i = 0; i < assignment.encoding.branches.length; i++) {
                branchRemove(assignment.encoding.branches[i], inputObject.field);
            }
            branchAdd(assignment.encoding.constants, inputObject.field);
        }
    }

    function branchRemove(branch, fieldName) {
        for (var i = 0; i < branch.length; i++) {
            var fieldObject = branch[i];
            if (fieldObject.field === fieldName) {
                branch.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    function branchContains(branch, fieldName) {
        console.log( "contains?", branch, fieldName );
        for (var i = 0; i < branch.length; i++) {
            var fieldObject = branch[i];
            if (fieldObject.field === fieldName) return true;
        }
        return false;
    }

    function branchAdd(branch, fieldName) {
        branch.push({
            field: fieldName,
            content: {
                value: ""
            }
        })
    }

    function deleteBranch(branchObject){
        var branches = assignment.encoding.branches;
        if(branches.length === 1) return;

        var index = branches.indexOf(branchObject);
        if(index == -1) return;
        branches.splice(index, 1);
    }

    function newBranch(){
        var cloneOfFirstBranch = JSON.parse(JSON.stringify(assignment.encoding.branches[0]));
        assignment.encoding.branches.push(cloneOfFirstBranch);
    }

    function calculateCompletion() {
        var encoding = assignment.encoding;
        var totalInputs = encoding.constants.length + ( encoding.branches.length * encoding.branches[0].length );
        var filledInputs = 0;

        /* Rocco Algorithm */
        for(var i = 0; i < encoding.constants.length; i++){
            var inputObject = encoding.constants[i];
            if( isFilled(inputObject) ){
                filledInputs++;
            }
        }
        for(var i = 0; i < encoding.branches.length; i++){
            for(var j = 0; j < encoding.branches[i].length; j++){
                var inputObject = encoding.branches[i][j];
                if( isFilled(inputObject) ){
                    filledInputs++;
                }
            }
        }

        var completion = (filledInputs/totalInputs * 100).toFixed(2);
        assignment.completion = completion;
        return completion;

        function isFilled(input){
            if( input.content.value ){
                return input.content.value !== "";
            }
            if( input.content.min && input.content.max ){
                return input.content.min !== "" &&
                    input.content.max !== ""
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
    }
}