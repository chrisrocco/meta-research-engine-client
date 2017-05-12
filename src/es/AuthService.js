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
    logout,
    getUser,
    getToken
}