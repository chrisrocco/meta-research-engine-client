angular.module("mre.auth", [])
    .factory("authService", function(){
        let mockUser = {
            "name": "Chris Mocko",
            "email": "chris.mocko7@mockemail.com",
            "image": "/assets/examples/images/dashboard-header.jpg"
        };

        return {
            isLoggedIn: function(){
                return Math.random() > .5;
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