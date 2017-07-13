/**
 * Created by Chris Rocco on 5/15/2017.
 */
angular.module("project-builder")
    .controller("ProjectBuilderController", ProjectBuilderController);

ProjectBuilderController.$inject = ['$scope'];
function ProjectBuilderController( $scope ){
    $scope.questionTypes = [
        {
            id: "text",
            name: "Text"
        },
        {
            id: "number",
            name: "Number"
        },
        {
            id: "boolean",
            name: "True | False"
        },
        {
            id: "range",
            name: "Range Slider"
        },
        {
            id: "select",
            name: "Multiple Choice"
        },
        {
            id: "multiselect",
            name: "Multi-Select"
        }
    ];

    /**
     * Business Logic
     * ========================
     */
    $scope.project = DEFAULT_MODEL.project;
    $scope.domains = [];
    $scope.questions = [];
    function createDomain( data ){
        data.id = $scope.project._key + "." + makeid();
        $scope.domains.push( data );
    }
    function deleteDomain( domain ){
        for (var i = $scope.domains.length-1; i >= 0; i--) {
            if( $scope.domains[i].parent === domain.id ){
                $scope.domains[i] = domain.parent;
            }
        }
        for (var i = $scope.questions.length-1; i >= 0; i--) {
            var q = $scope.questions[i];
            if( q.parent == domain.id ){
                if( domain.parent === "#"){
                    deleteQuestion( q );
                    continue;
                }
                q.parent = domain.parent;
            }
        }
        var ind = $scope.domains.indexOf(domain);
        $scope.$apply(function(){
            $scope.domains.splice( ind, 1 );
        });
    }
    function createQuestion( data ){
        data.id = $scope.project._key + "." + makeid();
        $scope.questions.push( data );
    }
    function deleteQuestion( question ){
        var ind = $scope.questions.indexOf(question);
        $scope.$apply(function(){
            $scope.questions.splice( ind, 1);
        });
    }

    /**
     * Action Handlers
     * =========================
     */
    $scope.handleEditDomain = handleEditDomain;
    $scope.handleEditQuestion = handleEditQuestion;
    $scope.handleDeleteDomain = handleDeleteDomain;
    $scope.handleDeleteQuestion = handleDeleteQuestion;
    $scope.handleCreateDomain = handleCreateDomain;
    $scope.handleCreateQuestion = handleCreateQuestion;
    function handleCreateDomain(){
        var newDomainObject = parseDomainForm();
        createDomain( newDomainObject );
        refresh();
    }
    function handleDeleteDomain( domain ){
        var msg = "This data cannot be recovered!";
        if( domain.parent === "#" ){
            msg = "This is root domain. All of its variables will be deleted!";
        } else {
            msg = "Questions and sub-domains will be moved to this domain's parent";
        }
        swal({
            title: "Are you sure?",
            text: msg,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function(){
            for (var i = $scope.domains.length-1; i >= 0; i--) {
                var obj = $scope.domains[i];
                if( obj.parent === domain.id ) obj.parent = domain.parent;
            }
            for (var i = $scope.questions.length-1; i >= 0; i--) {
                var q = $scope.questions[i];
                if( q.parent == domain.id ){
                    if( domain.parent === "#"){
                        deleteQuestion( q );
                        continue;
                    }
                    q.parent = domain.parent;
                }
            }
            deleteDomain( domain );
            refresh();
            swal("Deleted!", domain.name + " has been deleted.", "success");
        });
    }
    function handleCreateQuestion(){
        var newQuestionObject = parseQuestionForm();
        if( !newQuestionObject ) return;
        createQuestion( newQuestionObject );
        refresh();
    }
    function handleDeleteQuestion( question ){
        swal({
                title: "Are you sure?",
                text: "This data cannot be recovered!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
            function(){
                deleteQuestion( question );
                refresh();
                swal("Deleted!", question.name + " has been deleted.", "success");
            });
    }
    function handleEditDomain( domain ){
        console.log( "editing", domain );
        $scope.modalDomain = domain;
        $("#editDomainModal").modal("show");
    }
    function handleEditQuestion( question ){
        $scope.modalQuestion = question;
        resetEditTokenField();
        loadEditTokenField( question );
        resetEditMultiselectTokenField();
        loadEditMultiselectTokenField( question );
        $("#editQuestionModal").modal("show");
    }

    /*
    * Event/Lifecycle Handlers
    * ==========================
    */
    function init(){
        var promise = DataService.getProjectBuilderData( localStorage.projectKey );
        promise.success( function( data ){
            console.log( "from server", data );
            var structure = data.structure;
            if( structure ){
                $scope.$apply(function(){
                    $scope.domains = structure.domains;
                    $scope.questions = structure.questions;
                });
            }
            /* Display the project name */
            $scope.$apply(function(){
                $scope.project = data.project;
            });
            renderTree();
        });

        $("#editDomainModal").on('hidden.bs.modal', function () {
            refresh()
        });
        $("#editQuestionModal").on('hidden.bs.modal', function () {
            refresh()
        });
    }
    function refresh(){
        renderTree();
        save();
    }
    function renderTree(){
        var treeData = [];
        for (var i = 0; i < $scope.domains.length; i++) {
            var domain = $scope.domains[i];
            var node = {
                id          : domain.id,
                parent      : domain.parent,
                text        : domain.name,
                icon        : domain.icon,
                state       : {
                    opened    : true
                }
            };
            if( node.parent === "" ) node.parent = "#";
            treeData.push( node );
        }
        for (var i = 0; i < $scope.questions.length; i++) {
            var question = $scope.questions[i];
            var node = {
                id          : question.id,
                parent      : question.parent,
                text        : question.name,
                icon        : question.icon,
                state       : {
                    opened    : true
                }
            };
            if( node.parent === "" ) node.parent = "#";
            treeData.push( node );
        }
        $('#projectStructure').jstree(true).settings.core.data = treeData;
        $('#projectStructure').jstree(true).refresh();
    }
    function save(){
        var structure = {
            domains: $scope.domains,
            questions: $scope.questions
        };
        var req = {
            "structure": JSON.stringify( structure )
        };
        var promise = DataService.postProjectStructure( localStorage.projectKey, req );
        promise.success( function( res ){
            console.log( "saved!", res );
        });
        promise.error(function(err){
            alert("Something went wrong :(");
        });
    }

    /**
     * Document Controllers
     * ========================
     */
    $scope.selectedQuestionType = $scope.questionTypes[0].id;
    function parseQuestionForm(){
        var form        = document.forms.questionForm;
        var name        = form.name.value;
        var parent      = form.parent.value;
        var question    = form.question.value;
        var tooltip     = form.tooltip.value;
        var icon        = form.icon.value;
        var type        = $scope.selectedQuestionType;

        if( parent == "" ){
            alert("Questions must have a parent domain"); return false;
        }

        var questionObject = {
            parent: parent,
            type: type,
            name: name,
            question: question,
            tooltip: tooltip,
            icon: icon
        };

        if( type == "text" ){
            questionObject.placeholder = form.placeholder.value;
        }
        if( type == "number" ){
            questionObject.min = parseInt( form.min.value );
            questionObject.max = parseInt( form.max.value );
            questionObject.unit = form.unit.value;
        }
        if( type == "boolean" ){
            /* Init true/false if blank */
            questionObject.trueOption = form.trueOption.value;
            questionObject.falseOption = form.falseOption.value;
            if( questionObject.trueOption == "" ){
                questionObject.trueOption = "true";
            }
            if( questionObject.falseOption == "" ){
                questionObject.falseOption = "false";
            }
        }
        if( type == "range" ){
            questionObject.rangeMin = parseInt( form.rangeMin.value );
            questionObject.rangeMax = parseInt( form.rangeMax.value );
            questionObject.rangeUnit = form.rangeUnit.value;
        }
        if( type == "select" ){
            questionObject.options = [];
            extractQuestions( $('#multipleChoiceInput'), questionObject.options );
        }
        if( type == "multiselect" ){
            questionObject.options = [];
            extractQuestions( $('#multiselectInput'), questionObject.options );
        }

        form.parent.value   =   "";
        form.name.value     =   "";
        form.question.value =   "";
        form.tooltip.value  =   "";
        form.icon.value = icon;

        if( form.min ) form.min.value = "";
        if( form.max ) form.max.value = "";
        if( form.unit ) form.unit.value = "";
        if( form.trueOption ) form.trueOption.value = "";
        if( form.falseOption ) form.falseOption.value = "";
        if( form.rangeMin ) form.rangeMin.value = "";
        if( form.rangeMax ) form.rangeMax.value = "";
        if( form.rangeUnit ) form.rangeUnit.value = "";

        return questionObject;
    }
    function parseDomainForm(){
        var form            = document.forms.domainForm;
        var name            = form.name.value;
        var parent          = form.parent.value;
        var description     = form.description.value;
        var tooltip         = form.tooltip.value;
        var icon            = form.icon.value;

        // form.parent.value       =   "";
        form.name.value         =   "";
        form.description.value  =   "";
        form.tooltip.value      =   "";
        form.icon.value         =   "";
        form.icon.value = icon;

        if( parent === "" ){
            parent = "#";
        }

        var domainObject = {
            parent: parent,
            name: name,
            description: description,
            tooltip: tooltip,
            icon: icon
        };

        return domainObject;
    }

    /**
     * Bootstrap Tokenfield Angular Adapter
     * ========================================
     */
    function extractQuestions( tokenFieldElement, target ){
        var tokens = tokenFieldElement.tokenfield('getTokens');

        for (var i = 0; i < tokens.length; i++) {
            var option = tokens[i];
            target.push( option.value );
        }
    }
    function resetEditTokenField(){
        var tf = $('#editMultipleChoiceInput');
        tf.tokenfield('setTokens', []);
        tf.val('');
    }
    function loadEditTokenField( questionObject ){
        if( questionObject.options ){
            var tf = $('#editMultipleChoiceInput');
            tf.tokenfield('setTokens', questionObject.options );
        }
    }
    function resetEditMultiselectTokenField(){
        var tf = $('#editMultiselectInput');
        tf.tokenfield('setTokens', []);
        tf.val('');
    }
    function loadEditMultiselectTokenField( questionObject ){
        if( questionObject.options ){
            var tf = $('#editMultiselectInput');
            tf.tokenfield('setTokens', questionObject.options );
        }
    }
    window.updateMultipleChoice = function(){
        $scope.modalQuestion.options = [];
        extractQuestions( $('#editMultipleChoiceInput'), $scope.modalQuestion.options );
    }
    window.updateMultiselect = function(){
        $scope.modalQuestion.options = [];
        extractQuestions( $('#editMultiselectInput'), $scope.modalQuestion.options );
    }

    init();
}

const DEFAULT_MODEL = {
    project: {
        _key: 123,
        name: "Loading..."
    }
};

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}