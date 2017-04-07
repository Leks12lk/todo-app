var taskService = (function () {
    return {
    	baseUrl: config.baseUrl,
        getTasks: function () {
        	console.log('config.headers', config.headers);
            var self = this;
	        $.ajax({
		        url: self.baseUrl,
		        type: 'GET',
		        headers: config.headers,
		        success: function(response) { // response - an array of objects                  
			        console.log('Success', response);
			        for (var i = 0; i < response.length; i++) {
				        buildTask(response[i]);
			        }
			        $('.task-row.completed').find('.done-checkbox').prop('checked', true);
		        },
		        error: function(response) {
			        console.log('Error', response);
			        showErrorAlert("Data cannot be received");
		        }
	        });
        },
        addTask: function (task) {
        	console.log('config.headers', config.headers);
            var self = this;
	        $.ajax({
		        url: self.baseUrl,
		        type: 'POST',
		        headers: config.headers,
		        data: task,
		        success: function(response) { // response - just added task
			        console.log('Success', response);
			        buildTask(response);
		        },
		        error: function(response) {
			        console.log('Error', response);
			        showErrorAlert();
		        }
	        });
        },
        deleteTask: function (taskId) {
        	console.log('config.headers', config.headers);
            var self = this;
	        $.ajax({
		        url: self.baseUrl + '/' + taskId,
		        type: 'DELETE',
		        headers: config.headers,
		        success: function(response) { // response - status code only
			        console.log('Success', response);
		        },
		        error: function(response) {
			        console.log('Error', response);
			        showErrorAlert();
		        }
	        });
        },
        updateTask: function (task) {
        	console.log('config.headers', config.headers);
            console.log(task);
            var self = this;
	        $.ajax({
		        url: self.baseUrl,
		        type: 'PUT',
		        headers: config.headers,
		        data: task,
		        success: function(response) {
			        console.log('success', response);
		        },
		        error: function(response) {
			        console.log('error', response);
			        showErrorAlert();
		        }
	        });
        }
    }
})();


