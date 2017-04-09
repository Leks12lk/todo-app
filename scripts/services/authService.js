var authService = (function () {
	return {
		getToken: function (email, pass) {
		    var ajax = $.ajax({
		        url: config.tokenUrl,
		        type: 'POST',
		        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		        data: 'grant_type=password&username=' + email + '&password=' + pass
		    });
            
		    return ajax;
		},

		logout: function () {
		    $.ajax({
		        url: config.logoutUrl,
		        type: 'POST',
		        headers: config.headers,
		        success: function (data) {
		            mainCtrl.clearConfig();
		            config.isAuthorized = false;
		            mainCtrl.changeNavbar();
		            routeProvider.getPage('login');
		        },
		        error: function (data) {
		            console.log('logout error', data);
		        }
		    });
		}
	}
})();


