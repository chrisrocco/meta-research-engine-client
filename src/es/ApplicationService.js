import $ from 'jquery';
import * as AuthService from 'AuthService';
import * as DataService from 'DataService';

const emailSelector = ".bdEmail";
const firstNameSelector = ".bdFirstName";
const lastNameSelector = ".bdLastName";

const managerOnlySelector = ".bdManagerOnly";

function joinStudy(  ){
    var userKey = AuthService.getUser()._key;

    swal({
        title: "Join Project!",
        text: "Enter a registration code:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Ask your project manager",
        showLoaderOnConfirm: true
    },
    function(inputValue){
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError("You need to write something!");
            return false;
        }
        var promise = DataService.postProjectEnrollments( inputValue, userKey );
        promise.success( function( res ){
            var projectName = res.studyName;
            swal({
                title: "Success!",
                text: "You have joined " + projectName,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-success",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
            console.log( "Success", res );
        });
        promise.fail( function (res) {
            console.log( "Fail", res );

            if( res.status === 409 ){
                swal({
                    title: "Wait a Minute!",
                    text: "You're already in that study",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonClass: "btn-warning",
                    confirmButtonText: 'OK',
                    closeOnConfirm: false
                });
                return;
            }
            if( res.status === 404 ){
                swal({
                    title: "Invalid Code",
                    text: "That doesn't look like an active registration code!",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: 'OK',
                    closeOnConfirm: false
                });
                return;
            }

            swal({
                title: "Opps...",
                text: "Something went wrong.",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
        });
    });


}

function renderSession(){
    $(managerOnlySelector).hide();
    var user = AuthService.getUser();
    if( ! user ){
        return;
    }

    $(emailSelector).html( user.email );
    $(firstNameSelector).html( user.first_name );
    $(lastNameSelector).html( user.last_name );
    if( user.role === "manager" ){
        $(managerOnlySelector).show();
    }
}

export {
    joinStudy,
    renderSession
}