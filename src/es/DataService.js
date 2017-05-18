import * as AuthService from 'AuthService';

const API_BASE_PATH = "https://coursebooks.xyz";
// const API_BASE_PATH = "http://localhost:8080";

function getAssignmentDashboard( key ){
    return http({
        url: "/loadAssignmentDashboard" + "?userkey=" + key,
        method: "GET",
        dataType: "json"
    })
}
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
function getProjectsData(){
    return http({
        url: "/loadProjects",
        method: "GET",
        dataType: "json"
    });
}
function getProjectBuilderData( studyKey ){
    return http({
        url: "/loadProjectBuilder",
        method: "GET",
        data: {
            'studyKey': studyKey
        },
        dataType: "json"
    })
}
function postProjectStructure( projectKey, structure ){
    return http({
        url: "/studies/"+projectKey+"/structure",
        method: "POST",
        data: structure
    })
}
function postProject( projectObject ){
    return http({
        url: "/studies",
        method: "POST",
        data: projectObject,
        dataType: "json"
    })
}
function postStudyEnrollments( registrationCode, userKey){
    return http({
        url: "/studies/members",
        method: "POST",
        data: {
            "userKey": userKey,
            "registrationCode": registrationCode
        }
    })
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
    getPaperCoderData,
    getProjectsData,
    postProject,
    getAssignmentDashboard,
    getProjectBuilderData,
    postProjectStructure,
    postStudyEnrollments
}