$(document).ready(function($) {
  Site.run();
});








function loadAssignments(){
    dataService.getAssignments( JSON.parse(localStorage.user)["id"] );
}