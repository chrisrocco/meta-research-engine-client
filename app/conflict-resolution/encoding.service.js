angular
    .module("conflict-resolution")
    .factory("encoding.service", EncodingService);


function EncodingService() {

    return {
        write: write
    };

    function write( encoding, questionKey, data ){
        writeBranch( encoding.constants, questionKey, data );
        if( !encoding.branches ) return;
        for (var brs = 0; brs < encoding.branches.length; brs++) {
            var branch = encoding.branches[brs];
            writeBranch( branch, questionKey, data );
        }
    }

    function writeBranch( branch, questionKey, data ){
        for (var b = 0; b < branch.length; b++) {
            var input = branch[b];
            if( input.question == questionKey ){
                input.data = data;
                return true;
            }
        }
    }
}