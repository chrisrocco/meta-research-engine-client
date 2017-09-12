angular.module("mre.sidebar", [])
    .service("sidebarService", function(){

        let $el = $("body");
        let SIDEBAR_OPEN = "site-menubar-fixed site-menubar-open";
        let SIDEBAR_CLOSED = "site-menubar-hide";

        function open(){
            $el.addClass(SIDEBAR_OPEN);
            $el.removeClass(SIDEBAR_CLOSED);
        }
        function close(){
            $el.addClass(SIDEBAR_CLOSED);
            $el.removeClass(SIDEBAR_OPEN);
        }

        function toggle(){
            let state = ($el.hasClass(SIDEBAR_OPEN))? "opened" : "closed";
            if(state === "opened") close();
            if(state === "closed") open();
        }

        return {
            openSidebar: open,
            closeSidebar: close,
            toggleSidebar: toggle
        }
    })
    .directive("sidebar", function(authService){
        return {
            templateUrl: 'app/shared/sidebar/sidebar.html',
            controller: function($scope){
                $scope.authService = authService;
            },
            controllerAs: "sidebarCtrl"
        }
    });