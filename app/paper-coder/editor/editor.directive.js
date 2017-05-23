/**
 * Created by Chris Rocco on 3/29/2017.
 */
angular
    .module('paper-coder')
    .directive('bdEditor', EditorDirective);

EditorDirective.$inject = ['editor.service', '$compile'];
function EditorDirective( editorService, $compile ) {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            scope.close = function(){
                $('#editor').modal("hide");
            };

            // Watch for updates in the viewer service using an observer pattern
            var observer = {};
            observer.notify = function(){
                scope.inputObject = editorService.getInput();
                scope.fieldObject = editorService.getField();

                var tag = "bd-input-"+scope.fieldObject.type;
                var dr = "<"+tag+" bind='inputObject.data' meta='fieldObject' >"
                        + "</"+tag+">";
                $("#inputOutlet").empty();
                angular.element(document.getElementById('inputOutlet'))
                    .append($compile(dr)(scope));

                var modal = $("#editor");
                if (!modal.is(':visible')) {
                    modal.modal('show');
                }
            };
            editorService.registerObserver(observer);
        },
        templateUrl: '../app/paper-coder/editor/editor.html',
    }
}