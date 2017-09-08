
var config = {};
config.token = localStorage.getItem('token');
config.userName = localStorage.getItem('userName');
config.headers = {
	'Authorization': 'Bearer ' + config.token
}
config.baseUrl = '//learn-todo.gear.host/api/tasks';
config.registerUrl = '//learn-todo.gear.host/api/account/register';
config.tokenUrl = '//learn-todo.gear.host/token';
config.logoutUrl = '//learn-todo.gear.host/api/account/logout';
config.isAuthorized = false;
config.rootFolderName = 'todo-app';

var routeProvider = (function() {
    return {
        getPage: function(pageTitle) {
            $.ajax({
                url: '/' + config.rootFolderName + '/views/'+ pageTitle +'.html',
                type: 'GET',
                success: function (data) {
                    $('#main').html(data);
                },
                error: function (data) {
                    console.log('get page error', pageTitle);
                }
            });
        }		
	}
})();





