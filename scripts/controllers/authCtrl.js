var authCtrl = (function () {
	return {
		_getToken: function(email, pass) {
			authService.getToken(email, pass)
						 .done(function (data) {
						 	console.log('success from authService.getToken', data);
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
						 });
		},
		register: function (e) {
			var self = this;

			e.preventDefault();
			var email = $('#email').val();
			var pass = $('#pass').val();
			var confirmPass = $('#confirm-pass').val();

			if (confirmPass !== pass) {
				console.log('password and confirm password are not matched');
				return;
			}

			authService.register(email, pass, confirmPass)
				.done(function() {
					self._getToken(email, pass);
				})
				.fail(function(data) {
					console.log('error from test', data);
				});
		},
		login: function (e) {
			var self = this;

            e.preventDefault();
            var email = $('#email').val();
            var pass = $('#pass').val();

            self._getToken(email, pass);
        },
        logout: function () {
            authService.logout();
        }
    }
})();



