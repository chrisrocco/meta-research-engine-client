import * as URLs from 'src/es/URLs';

const TOKEN_PROVIDER = URLs.getUrl( "login" );
const REGISTER = URLs.getUrl( "register" );
const RENEW = URLs.getUrl( "renew" );

function login( email, password, win, fail ){
    return $.ajax({
        url: TOKEN_PROVIDER,
        method: "POST",
        data: {"email": email, "password": password},
        dataType: "json",
    }).success(function( data ){
            localStorage['api_token']   =   data.token;
            localStorage['user']        =   JSON.stringify(data.user);
            win();
        })
}

function register( firstName, lastName, email, password ){
    return $.ajax({
        url: REGISTER,
        method: "POST",
        data: {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": password
        }
    });
}

function renew(){
    $.ajax({
        url: RENEW,
        headers: {
            Authorization: "Bearer " + getToken()
        },
        method: "POST",
        dataType: "json"
    }).success( function( res ){
        console.log( "Renewing Token.." );
        console.log( "Old: ", getToken() );
        console.log( "New: ", res.token );
        localStorage['api_token']   =   res.token;
    } );
}

function logout(){
    delete localStorage['api_token'];
    // delete localStorage['user'];
}
function getUser(){
    if( ! localStorage['user'] ) throw 'Tried to access user details when they were not logged in!';
    var json = localStorage['user'];
    return JSON.parse(json);
}
function isLoggedIn(){
    if( localStorage['user'] && localStorage['api_token'] ) return true;
    return false;
}
function getToken(){
    return localStorage['api_token'];
}

export {
    login,
    register,
    renew,
    logout,
    isLoggedIn,
    getUser,
    getToken
}