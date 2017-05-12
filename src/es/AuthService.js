import * as DataService from 'DataService';

function login( email, password, win, fail ){
    DataService.postUsersLogin( email, password )
        .success(function( data ){
            localStorage['api_token']   =   data.token;
            localStorage['user']        =   JSON.stringify(data.user);
            win();
        })
        .error(function(){
            fail();
        })
}

function register( firstName, lastname, email, password ){
    return DataService.postUsersRegister( firstName, lastname, email, password );
}

function logout(){
    delete localStorage['api_token'];
    delete localStorage['user'];
}
function getUser(){
    let json = localStorage['user'];
    return JSON.parse(json);
}
function getToken(){
    return localStorage['api_token'];
}

export {
    login,
    register,
    logout,
    getUser,
    getToken
}