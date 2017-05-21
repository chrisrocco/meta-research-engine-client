angular
    .module("conflict-resolution")
    .factory("transaction.service", TransactionService);

TransactionService.$inject = [ 'encoding.service' ]
function TransactionService( EncodingService ) {
    var assignment = ASSIGNMENT_DEFAULT_MODEL;
    var transactions = [ TRANSACTION_DEFAULT_MODEL ];

    return {
        startTransaction    :   startTransaction,
        addTransaction      :   addTransaction,
        resolve             :   resolve
    };

    function startTransaction( assignmentObject ){
        assignment = assignmentObject;
    }
    function addTransaction( questionKey, newData ){
        transactions.push( {
            questionKey:    questionKey,
            newData:        newData
        } );
    }
    function resolve(){
        for (var i = 0; i < transactions.length; i++) {
            var transaction = transactions[i];
            EncodingService.write( assignment.encoding, transaction.questionKey, transaction.newData );
        }
        return assignment;
    }
}

const ASSIGNMENT_DEFAULT_MODEL = {
    encoding: {
        constants: [],
        branches : [[]]
    }
};
const TRANSACTION_DEFAULT_MODEL = {
    inputObject : {},
    newData     : {}
};