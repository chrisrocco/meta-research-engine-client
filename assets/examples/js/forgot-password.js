/*!
 * bigdata (https://uab-energetics.github.io/bigdata-app/html/)
 * Copyright 2017 chrisrocco
 * Licensed under the Themeforest Standard Licenses
 */
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