var taskService = (function () {
    return {
        baseUrl: 'http://learn-todo.gear.host/api/tasks',        
        getTasks: function () {
            var self = this;           
            $.ajax({
                url: self.baseUrl,
                type: 'GET',
                success: function (response) { // response is an array of objects                   
                    console.log('Success', response);
                    for (var i = 0; i < response.length; i++) {
                        var element = buildTask(response[i]);
                        $('#tasks-container').append(element);                                             
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
                success: function (response) {                    
                    console.log('success', response);
                    var element = buildTask(response);
                    $('#tasks-container').append(element);
                },
                error: function (response) {
                    console.log('error');
                }
            })
        },
        deleteTask: function (taskId) {
            console.log('taskId', taskId);
            var self = this;
            $.ajax({
                url: self.baseUrl + '/' + taskId,
                type: 'DELETE',               
                success: function (response) {
                    console.log('success', response);
                },
                error: function (response) {
                    console.log('error', response);
                }
            })
        },
        updateTask: function (task) {
            console.log('task', task);
            var self = this;
            $.ajax({
                url: self.baseUrl,
                type: 'PUT',
                data: task,
                success: function (response) {
                    console.log('success', response);
                },
                error: function (response) {
                    console.log('error', response);
                }
            })            
        }
    }
})();