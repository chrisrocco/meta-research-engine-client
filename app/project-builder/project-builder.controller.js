/**
 * Created by Chris Rocco on 5/15/2017.
 */
angular.module("project-builder")
    .controller("ProjectBuilderController", ProjectBuilderController);

ProjectBuilderController.$inject = ['$scope'];
function ProjectBuilderController( $scope ){
    init();

    // Data Models
    $scope.domains = defaultModel.domains;
    $scope.questions = defaultModel.questions;
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
        }
    ];

    // Function Binding
    $scope.editDomain = editDomain;
    $scope.editQuestion = editQuestion;
    $scope.handleDeleteDomain = handleDeleteDomain;
    $scope.handleDeleteQuestion = handleDeleteQuestion;
    $scope.handleSubmitDomain = handleSubmitDomain;
    $scope.handleSubmitQuestion = handleSubmitQuestion;

    // Property Binding
    $scope.selectedQuestionType = $scope.questionTypes[0].id;

    /*-----------------------------------------------------------------*/
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
            id: (Math.floor( Math.random() * 99999) ).toString(),
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
            extractQuestions( $('#multipleChoiceInput'), questionObject.options );
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

        var domainObject = {
            id: ( Math.floor( Math.random() * 99999 )).toString(),
            parent: parent,
            name: name,
            description: description,
            tooltip: tooltip,
            icon: icon
        };

        return domainObject;
    }
    function handleSubmitDomain(){
        var newDomainObject = parseDomainForm();
        $scope.domains.push( newDomainObject );
        refresh();
        console.log( $scope.selectedQuestionType );
        console.log( newDomainObject );
    }
    function handleSubmitQuestion(){
        var newQuestionObject = parseQuestionForm();
        if( !newQuestionObject ) return;

        $scope.questions.push( newQuestionObject );
        refresh();
        console.log( newQuestionObject );
    }

    function editDomain( domain ){
        console.log( "editing", domain );
        $scope.modalDomain = domain;
        $("#editDomainModal").modal("show");
    }
    function editQuestion( question ){
        $scope.modalQuestion = question;
        resetEditTokenField();
        loadEditTokenField( question );
        $("#editQuestionModal").modal("show");
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
        },
        function(){
            deleteDomain( domain );
            for (var i = 0; i < $scope.domains.length; i++) {
                var obj = $scope.domains[i];
                if( obj.parent === domain.id ) obj.parent = domain.parent;
            }
            for (var i = 0; i < $scope.questions.length; i++) {
                var obj = $scope.questions[i];
                if( obj.parent === domain.id ) obj.parent = domain.parent;
            }
            refresh()
            swal("Deleted!", domain.name + " has been deleted.", "success");
        });
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
    function deleteDomain( domain ){
        $scope.$apply( function(){
            $scope.domains.splice( $scope.domains.indexOf(domain), 1 );
        });
    }
    function deleteQuestion( question ){
        $scope.$apply( function() {
            $scope.questions.splice($scope.domains.indexOf(question), 1);
        } );
    }

    // Third party angular adapter
    window.updateMultipleChoice = function(){
        $scope.modalQuestion.options = [];
        extractQuestions( $('#editMultipleChoiceInput'), $scope.modalQuestion.options );
    }

    function init(){
        var promise = DataService.getProjectBuilderData( localStorage.projectKey );
        promise.success( function( data ){
            console.log( "from server", data );
            var structure = data.structure;
            if( structure ){
                $scope.$apply( function(){
                    $scope.domains = structure.domains;
                    $scope.questions = structure.questions;
                });
            }
            /* Display the project name */
            var spanElement = document.getElementById("project-name");
            spanElement.innerHTML = data.projectName;
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
    }
}

const defaultModel = {
    domains: [],
    questions: []
};

/* Bootstrap tokenfield adapter */
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