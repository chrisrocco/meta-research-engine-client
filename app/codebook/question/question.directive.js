/**
 * A domain
 */
angular
    .module('codebook')
    .directive('bdQuestionReference', QuestionReference);

function QuestionReference() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            question: "=question"
        },
        link: function($scope, $element, $attrs, $ctrl) {

        },
        templateUrl: '../app/codebook/question/question.html'
    }
}