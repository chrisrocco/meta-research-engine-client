// const API_BASE_PATH = "http://localhost:8080";
const API_BASE_PATH = "https://coursebooks.xyz";
const TOKEN_PROVIDER = API_BASE_PATH + "/users/login";
const REGISTER = API_BASE_PATH + "/users/register";

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