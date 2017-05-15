import * as AuthService from 'AuthService';

const API_BASE_PATH = "https://coursebooks.xyz";
// const API_BASE_PATH = "http://localhost:8080";

function getUsersAssignments( id ){
    return http({
        url:    "/users/"+id+"/assignments",
        method: "GET",
        dataType: "json"
    })
}

function getAssignment( key ){
    return http({
        url: "/assignments/" + key,
        method: "GET",
        dataType: "json"
    });
}

function putAssignment( assignmentObject ){
    return http({
        url: "/assignments/" + assignmentObject._key,
        method: "PUT",
        data: {
            "done": assignmentObject.done,
            "completion": assignmentObject.completion,
            "encoding": assignmentObject.encoding
        }
    });
}

function getPaperCoderData( assignmentKey ){
    return http({
        url: "/loadAssignment?key="+assignmentKey,
        method: "GET",
        dataType: "json"
    });
}

function http( config ){
    config['url'] = API_BASE_PATH + config['url'];
    config['headers'] = {
        "Authorization": "Bearer " + AuthService.getToken() // token here
    };
    return $.ajax(config);
}

export {
    http,
    getAssignment,
    putAssignment,
    getUsersAssignments,
    getPaperCoderData
}