
$(document).on('click', '.done-checkbox', function () {
    $(this).parents('.task-row').toggleClass('completed');
});

$(document).on('click', '.remove', function () {
    $(this).parents('.task-row').remove();
});

$('#task').keydown(function () {
    $('.error-message').remove();
})

$('#save-btn').click(function () {    
    var title = $('#task').val();
    var container = $('#tasks-container');
    if (title.trim() != '') {
        var element = buildTask(title);
        container.append(element);
        $('#task').val('');
       
    } else {
        showErrorMessage('Please enter the task title');
    }

})

function buildTask(task) {
    var el = '<div class="checkbox task-row"><label><input type="checkbox" value="" class="done-checkbox">'+task+'</label>'
    el += '<i class="fa fa-times remove pull-right" aria-hidden="true"></i></div>';
    
    return el;                            
}

function showErrorMessage(message) {
    var container = $('#newTask input');
    var el = $('<p></p>');
    el.addClass('error-message');
    el.text(message);
    container.after(el);
}