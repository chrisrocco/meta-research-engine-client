angular
    .module("paper-coder")
    .controller("PaperCoderController", PaperCoderController);

PaperCoderController.$inject = ['$scope', '$sce', 'paper-coder.service', 'Project', 'Domain', 'Question', 'Response', 'Assignment', 'Branch'];
function PaperCoderController($scope, $sce, paperCoderService, Project, Domain, Question, Response, Assignment, Branch) {
    // setup default models
    $scope.assignment = paperCoderService.getAssignment();
    $scope.structure = [];
    // functions
    $scope.newBranch = paperCoderService.newBranch;
    $scope.calculateCompletion = paperCoderService.calculateCompletion;
    $scope.toggleComplete = function(){
        if( $scope.assignment.done == true ){
            swal({
                title: "Still Working?",
                text: "We'll hold off on using your data.",
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-success",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
        }
        if( $scope.assignment.done == false ){
            swal({
                title: "Assignment Complete!",
                text: "We'll put your data to good use!",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-success",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
        }

        paperCoderService.toggleComplete();
    };
    $scope.save = function( silent ){
        if( silent == true ){

        } else {
            swal({
                title: "Saving...",
                text: "Just a sec!",
                type: "info",
                showCancelButton: true,
                showConfirmButton: false,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            });
        }

        var p = DataService.putAssignment( $scope.assignment );
        p.success( function( res ){
            console.log( "from server: ", res);
            swal({
                title: "Work Saved!",
                text: "Your work has been uploaded to the database!",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-success",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
        });
        p.error( function( err ){
            swal({
                title: "Opps..",
                text: "Something went wrong :(",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-error",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
            console.log( err );
        })
    };
    $scope.popOut = function( paperObject ){
        window.open( paperObject.url,
            "Research Coder | "+paperObject.title,
            "height=700,width=500"
        );
    };

    var p = DataService.loadPaperCoder( localStorage.assignmentKey );
    p.success( function(data){
        console.log( "Data from server", data );

        /* Initialize Data */
        data.assignment.done == "true" ? data.assignment.done = true : data.assignment.done = false ;
        data.assignment.completion = parseFloat( data.assignment.completion );

        // NULL encoding? -> Initialize a blank one: add all project questions in the assignment's encoding. load the structure into activity as a global.
        if( data.assignment.encoding == null || data.assignment.encoding == "" ){
            var encoding = {
                constants: [],
                branches: [[]]
            };
            addToAssignment( encoding, data.questions );
            data.assignment.encoding = encoding;
            console.log( data.assignment );
        }

        // If constants property was removed during the encoding / decoding
        if( !data.assignment.encoding.constants ){
            data.assignment.encoding.constants = [];
        }
        // If branches property was removed during encoding / decoding
        if( !data.assignment.encoding.branches){
            data.assignment.encoding.branches = [[]];
        }

        // Because there might be new questions
        addToAssignment( data.assignment.encoding, data.questions );

        /* Allows loading outside resources into iframe with angular */
        data.paper.url = $sce.trustAsResourceUrl(data.paper.url);
        // Hook into angular digest cycle
        $scope.$apply( function(){
            $scope.paper = data.paper;
            $scope.assignment = data.assignment;
            $scope.structure = data.structure;
            paperCoderService.loadAssignment( $scope.assignment );
        });

        /* Start Testing */
        var assignment = parseAssignment( data.assignment );
        var project = parseProject( data.structure );
        console.log(assignment);
        console.log(project);
        /* End Testing */
    });
    $( window ).unload(function() {
        DataService.putAssignment( $scope.assignment, false );
    });

    // adds questions from project into an encoding branch IF they are not already there.
    function addToAssignment( encoding, questionsArray ){
        for( var i = 0; i < questionsArray.length; i++ ){
            var qKey = questionsArray[i]['_key'];
            var existsInEncoding = false;
            // in constants?
            if( paperCoderService.branchContains( encoding.constants, qKey ) ) existsInEncoding = true;
            // in branches?
            encoding.branches.forEach( function( branch ){
                if( paperCoderService.branchContains( branch, qKey ) ) existsInEncoding = true;
            });

            if( existsInEncoding == false ){
                var input = {
                    question: qKey,
                    data: {
                        dont_flatten_me: ""
                    }
                };
                encoding.constants.push( input );
            }

        }
    }
    function parseAssignment( assignmentData ){
        // make assignment model
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
    function parseProject( projectData ){
        var project = new Project();
        projectData.forEach(function(_domain){
            var domain = new Domain();
            extractDomain(domain, _domain);
            project.addDomain(domain);
        });
        return project;

        function extractDomain(model, src){
            // set properties
            model._key = src._key;
            model.description = src.description;
            model.icon = src.icon;
            model.name = src.name;
            model.tooltip = src.tooltip;
            // add the questions
            src.variables.forEach(function(_question){
                var question = new Question();
                angular.extend(question, _question);
                model.addQuestion(question);
            });
            // add the subdomains
            src.subdomains.forEach(function(_subdomain){
                var subdomain = new Domain();
                extractDomain(subdomain, _subdomain);
                model.addSubdomain(subdomain);
            });
        }
    }
}