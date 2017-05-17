/**
 * Created by Chris Rocco on 3/29/2017.
 */
angular
    .module('paper-coder')
    .directive('bdEditor', EditorDirective);

EditorDirective.$inject = ['editor.service'];
function EditorDirective(editorService,) {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            scope.getContent = function(){
                if(editorService.getField()){
                    return editorService.getInputForm(editorService.getField().type);
                }
            };
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

            /* After the modal has rendered */
            $('#editor').on('shown.bs.modal', function () {
                var type = scope.fieldObject.type;

                if(type === "range"){
                    $('.example').asRange({
                        range: true,
                        step: 1,
                        onChange: function(data){
                            scope.$apply(function(){
                                scope.inputObject.content.min = data[0];
                                scope.inputObject.content.max = data[1];
                            });
                        },
                        ready: function(){
                            $(".example").style("display", "initial")
                        },
                        format: function(value){
                            return value + "";
                        }
                    });
                }
                if(type === "text" || type === "number"){
                    document.getElementById("inputElement").focus();    // autofocus
                }
            });
        },
        templateUrl: '../app/paper-coder/editor/editor.html',
    }
}