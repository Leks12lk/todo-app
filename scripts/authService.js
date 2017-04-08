var authService = (function () {
	return {
		getToken: function(email, pass) {
			$.ajax({
				url: config.tokenUrl,
				type: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: 'grant_type=password&username=' + email + '&password=' + pass,
				success: function (data) {
				    debugger;
					console.log('success', data);

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
						config.isAuthorize = true;
						mainCtrl.changeNavbar();

						
						routeProvider.getTasksPage();
					    // get tasks from server
						//taskService.getTasks();
						
						
					}


				},
				error: function (data) {
					console.log('error', data);
				}
			});
		},
		logout: function() {
			$.ajax({
				url: config.logoutUrl,
				type: 'POST',
				headers: config.headers,
				success: function (data) {
					mainCtrl.clearConfig();
					config.isAuthorize = false;
					mainCtrl.changeNavbar();
					routeProvider.getLoginPage();
				},
				error: function(data) {
					console.log('logout error', data);
				}
			});
		}
	}
})();


