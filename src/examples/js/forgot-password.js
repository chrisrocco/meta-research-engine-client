$(document).ready(function($) {
    Site.run();
});

function submitRecoverForm(){
  var form = document.querySelector("form");
  var email = form.email.value;

  var promise = DataService.postForgotPassword( email );
  promise.success( function( res ){
      console.log( "response", res );
  });

  return false;
}