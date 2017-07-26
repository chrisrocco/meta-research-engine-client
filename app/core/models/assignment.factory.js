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

        static parseFromJson(){

        }
    }
    return Assignment;
}