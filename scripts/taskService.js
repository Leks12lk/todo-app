var taskService = (function () {
    return {
        baseUrl: 'http://learn-todo.gear.host/api/tasks',        
        getTasks: function () {
            var self = this;           
            $.ajax({
                url: self.baseUrl,
                type: 'GET',
                success: function (response) { // response - an array of objects                   
                    console.log('Success', response);
                    for (var i = 0; i < response.length; i++) {
                        buildTask(response[i]);                                                                
                    }
                    $('.task-row.completed').find('.done-checkbox').prop('checked', true);
                },
                error: function (response) {
                    console.log('Error', response);
                }
            })
        },
        addTask: function (task) {
            var self = this;
            $.ajax({
                url: self.baseUrl,
                type: 'POST',
                data: task,
                success: function (response) {  // response - just added task
                    console.log('Success', response);
                    buildTask(response);                   
                },
                error: function (response) {
                    console.log('Error', response);
                }
            })
        },
        deleteTask: function (taskId) {         
            var self = this;
            $.ajax({
                url: self.baseUrl + '/' + taskId,
                type: 'DELETE',
                success: function (response) {  // response - status code only
                    console.log('Success', response);
                },
                error: function (response) {                    
                    console.log('Error', response);
                }
            })
        }
    }
})();