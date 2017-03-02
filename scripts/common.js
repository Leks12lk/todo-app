
// get tasks from server
taskService.getTasks();

$('#tasks-container').on('click', '.done-checkbox', function () {
    $(this).parents('.task-row').toggleClass('completed');
});

$('#tasks-container').on('click', '.remove', function () {
    $(this).parents('.task-row').remove();
});

$('#save-btn').click(function () {
    var container = $('#tasks-container');
    var title = $('#task').val();    
    if (title.trim() != '') {
        console.log(title);
        var element = buildTask(title);
        container.append(element);
        $('#task').val('');
    } else {
        showErrorMessage('Please enter a task title');
    }
   
})

$('#task').keydown(function () {
    $('.error-message').remove();
})

function buildTask(task) {
    var el = '<div class="checkbox task-row '+ (task.isDone ? 'completed' : '') + '"><label><input type="checkbox" value="" class="done-checkbox">' + task.title + '</label>';
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
