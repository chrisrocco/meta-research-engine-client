angular.module("mre.auth", [])
    .factory("authService", function(){
        let mockUser = {
            "name": "Chris Mocko",
            "email": "chris.mocko7@mockemail.com",
            "image": "/assets/examples/images/dashboard-header.jpg"
        };
        let tmp_logged_in = Math.random() > .5;

        return {
            isLoggedIn: function(){
                return tmp_logged_in;
            },
            userName: function(){
                return mockUser.name;
            },
            userEmail: function(){
                return mockUser.email;
            },
            userImage: function(){
                return mockUser.image;
            }
        }
    });