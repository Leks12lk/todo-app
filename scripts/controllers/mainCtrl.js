var mainCtrl = (function () {
    return {
        changeNavbar: function () {
            var isAuthorized = config.isAuthorized;

            //var anonElement =
			//	'<li><a href="javascript: routeProvider.getPage(\'register\');"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>';
            //anonElement +=
			//	'<li><a href="javascript: routeProvider.getPage(\'login\');"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>';

            //var authElement =
			//	'<li><a href="#"> ' + config.userName + '</a></li>';
            //authElement +=
			//	'<li><a href="javascript: authCtrl.logout();"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>';

            //var element = isAuthorized ? authElement : anonElement;

        	//$(".change-nav").html(element);
	        var _url = isAuthorized ? '/views/navbar/auth.navbar.html' : '/views/navbar/anon.navbar.html';
	        $.ajax({
	        	url: _url,
	        	type: 'GET',
				success: function(data) {
					$('.navbar').html(data);
					$('.username').text(config.userName);
				},
				error: function(data) {
					console.log('changeNavbar error', data);
				}
	        });
        },

        clearConfig: function () {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            config.token = '';
            config.userName = '';
        },

        initialize: function () {            
            if (!config.token) {
                config.isAuthorized = false;
                routeProvider.getPage('login');
                mainCtrl.changeNavbar();
            } else {
                config.isAuthorized = true;
                routeProvider.getPage('tasks');                
                mainCtrl.changeNavbar();
            }
        }
    }
})();

mainCtrl.initialize();