angular
    .module("conflict-resolution")
    .factory("transaction.service", TransactionService);


function TransactionService() {
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
        // TODO
        transactions.push( {
            questionKey:    questionKey,
            newData:        newData
        } );
    }

    function resolve(){
        // TODO
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