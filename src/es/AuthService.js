const TOKEN_PROVIDER = "http://35.184.147.35/users/login";
const REGISTER = "http://35.184.147.35/users/register";

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