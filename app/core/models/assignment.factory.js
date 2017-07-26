angular.module("models")
    .factory("Assignment", Assignment );

Assignment.$inject = [ 'Branch', 'Response' ];
function Assignment ( Branch, Response ){
    class Assignment {
        /**
         *
         * @param data.done done status
         */
        constructor( data ){
            this.done = data.done;
            this.completion = data.completion;
            this.constants = null;
            this.branches = [];
        }
        setDone( done ){
            this.done = done;
        }
        addBranch( Branch ){
            this.branches.push(Branch);
        }
        setConstantsBranch( Branch ){
            this.constants = Branch;
        }
        removeBranch( Branch ){
            var ind = this.branches.indexOf(Branch);
            if(ind === -1) return;
            this.branches.splice(ind,1);
        }

        static parseFromJson(assignmentData){
            var assignment = new Assignment({
                done: assignmentData.done,
                completion: assignmentData.completion
            });
            // load the constants branch
            assignment.setConstantsBranch(new Branch("Constants"));
            // load constants data
            assignmentData.encoding.constants.forEach(function(_input){
                var response = new Response(_input.question);
                angular.extend(response, _input.data);
                assignment.constants.addResponse( response );
            });
            assignmentData.encoding.branches.forEach(function(_branch, _index){
                var branch = new Branch("Branch " + _index);
                _branch.forEach(function(_input){
                    var res = new Response(_input.question);
                    angular.extend(res, _input.data);
                    branch.addResponse(res);
                });
                assignment.addBranch(branch);
            });
            return assignment;
        }
    }
    return Assignment;
}