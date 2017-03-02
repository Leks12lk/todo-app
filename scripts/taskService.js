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
        }
    }
})();