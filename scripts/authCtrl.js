

$('#login-form').submit(function(e) {
	e.preventDefault();
	var email = $('#email').val();
	var pass = $('#pass').val();
	console.log(config.token);
	authService.getToken(email, pass);
});

function logout() {
	authService.logout();
}



