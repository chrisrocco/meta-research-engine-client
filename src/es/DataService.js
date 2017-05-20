import * as AuthService from 'AuthService';

var API_BASE_PATH = "https://coursebooks.xyz";
if (localStorage.hostOverride) {
    API_BASE_PATH = localStorage.hostOverride;
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
    }).complete( function(res){
        console.log( "put assignment response", res );
    });
}
function loadPaperCoder( assignmentKey ){
    return http({
        url: "/loadPaperCoder?key="+assignmentKey,
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
function getProjectBuilderData( projectKey ){
    return http({
        url: "/loadProjectBuilder",
        method: "GET",
        data: {
            'projectKey': projectKey
        },
        dataType: "json"
    })
}
function postProjectStructure( projectKey, structure ){
    return http({
        url: "/projects/"+projectKey+"/structure",
        method: "POST",
        data: structure
    })
}
function postProject( projectObject ){
    return http({
        url: "/projects",
        method: "POST",
        data: projectObject,
        dataType: "json"
    })
}
function postProjectEnrollments( registrationCode, userKey){
    return http({
        url: "/projects/members",
        method: "POST",
        data: {
            "userKey": userKey,
            "registrationCode": registrationCode
        },
        dataType: "json"
    })
}
function postForgotPassword( email ){
    return http({
        url: "/users/recover",
        method: "POST",
        data: {
            "email": email,
            "callback": "https://uab-energetics.github.io/bigdata-app/html/reset-password.html"
        }
    })
}
function postResetPassword( newPassword, hash_code ){
    return http({
        url: "/users/reset",
        method: "POST",
        data: {
            "hash_code": hash_code,
            "newPassword": newPassword
        }
    });
}
function loadAssignments(){
    return http({
        url: "/loadAssignments" + "?userKey=" + AuthService.getUser()._key,
        method: "GET",
        dataType: "json"
    })
}
function loadManageProject( projectKey ){
    return http({
        url: "/loadManageProject" + "?projectKey=" + projectKey,
        method: "GET",
        dataType: "json"
    });
}
function uploadPapersCSV( projectKey, formData ){
    return http({
        url: "/projects/"+projectKey+"/papers",
        method: "POST",
        data: formData,
        dataType: "json",
        processData: false,
        contentType: false
    })
}
function http( config ){
    config['url'] = API_BASE_PATH + config['url'];
    config['headers'] = {
        "Authorization": "Bearer " + AuthService.getToken() // token here
    };
    return $.ajax(config);
}
/* Development */
function setHost( url ){
    localStorage.hostOverride = url;
}

export {
    setHost,
    http,
    getAssignment,
    putAssignment,
    getUsersAssignments,
    loadPaperCoder,
    getProjectsData,
    postProject,
    getProjectBuilderData,
    postProjectStructure,
    postProjectEnrollments,
    postForgotPassword,
    postResetPassword,
    loadAssignments,
    loadManageProject,
    uploadPapersCSV
}