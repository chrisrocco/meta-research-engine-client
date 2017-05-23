/**
 * Created by Chris Rocco on 3/29/2017.
 */
angular
    .module('paper-coder')
    .directive('bdEditor', EditorDirective);

EditorDirective.$inject = ['editor.service'];
function EditorDirective( editorService ) {
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

                if (!$('#editor').is(':visible')) {
                    // if modal is not shown/visible then do something
                    $('#editor').modal('show');
                }
            };
            editorService.registerObserver(observer);
        },
        templateUrl: '../app/paper-coder/editor/editor.html',
    }
}