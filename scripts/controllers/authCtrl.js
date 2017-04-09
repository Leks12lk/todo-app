var authCtrl = (function () {
    return {
        login: function (e) {
            e.preventDefault();
            var email = $('#email').val();
            var pass = $('#pass').val();
            
            authService.getToken(email, pass)
                .done(function (data) {
                    console.log('success from test', data)
                    var token = data.access_token;
                    var userName = data.userName;

                    if (token && token.trim() != '') {
                        localStorage.setItem('token', token);
                        localStorage.setItem('userName', userName);


                        config.token = token;
                        config.headers = {
                            'Authorization': 'Bearer ' + config.token
                        }
                        config.userName = userName;
                        config.isAuthorized = true;
                        mainCtrl.changeNavbar();

                        routeProvider.getPage('tasks');                        
                    }
                })
                .fail(function (data) {
                    console.log('error from test', data);
                })
        },
        logout: function () {
            authService.logout();
        }
    }
})();



