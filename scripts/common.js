
// get tasks from server
taskService.getTasks();

$('#tasks-container').on('click', '.done-checkbox', function () {
    var taskRow = $(this).parents('.task-row');
    taskRow.toggleClass('completed');
    var task = {
        id: taskRow.data('taskid'),
        title: taskRow.find('label').text(),
        isDone: $(this).prop('checked')
    };
    
    taskService.updateTask(task);
});

$('#tasks-container').on('click', '.remove', function () {
    $(this).parents('.task-row').remove();
    var taskId = $(this).parents('.task-row').data('taskid');    
    taskService.deleteTask(taskId);
});

$('#save-btn').click(function () {
    var container = $('#tasks-container');
    var title = $('#task').val();    
    if (title.trim() != '') {
        var task = {
            title: title
        };

        //var element = buildTask(task);
        //container.append(element);      

        taskService.addTask(task);

        $('#task').val('');
    } else {
        showErrorMessage('Please enter a task title');
    }
   
})

$('#task').keydown(function () {
    $('.error-message').remove();
})

function buildTask(task) {
    var el = '<div class="checkbox task-row'+ (task.isDone ? ' completed' : '') +'"data-taskid='+task.id+'><label><input type="checkbox" value="" class="done-checkbox">' + task.title + '</label>';
    el += '<i class="fa fa-times remove pull-right" aria-hidden="true"></i></div>';

    return el;
}

function showErrorMessage(message) {
    var input = $('#newTask input');
    var el = $('<p></p>');
    el.addClass('error-message');
    el.text(message);
    input.after(el);
}
