
debugger;
// get tasks from server
taskService.getTasks();



$('#tasks-container').on('click', '.done-checkbox', function () {
	var taskRow = $(this).parents('.task-row');
	taskRow.toggleClass('completed');

	// object to pass to server
	var task = {
		id: taskRow.data('taskid'),
		title: taskRow.find('span').text(),
		isDone: $(this).prop('checked')
	};

	taskService.updateTask(task);
});

$('#tasks-container').on('click', '.remove', function () {
	// get id of a task that stored in data attribute data-taskid
	var taskId = $(this).parents('.task-row').data('taskid');

	// remove .task-row from DOM
	$(this).parents('.task-row').remove();

	// if id of a task is not undefined call the service deleteTask method
	if (taskId != undefined) {
		taskService.deleteTask(taskId);
	}
});

$('#newTaskForm').submit(function (event) {
	// prevent default behaviou
	event.preventDefault();
	// get input value
	var title = $('#task').val();

	// if input value is not empty - create task object and call service addTask method
	if (title.trim() != '') {
		var task = {
			title: title
		};

		taskService.addTask(task);

		// clear an input value
		$('#task').val('');
	} else {
		showErrorMessage('Please enter a task title');
	}
});


$('#task').keydown(function () {
	$('.error-message').remove();
});


/* function that creates new task row element and appends it to the tasks container
 * input parameter: object task
 */
function buildTask(task) {
	// tasks container
	var container = $('#tasks-container');

	// element which will be appended to the tasks container
	var el = '<div class="checkbox task-row' + (task.isDone ? ' completed' : '') + '" data-taskid=' + task.id + '>';
	el += '<label><input type="checkbox" value="" class="done-checkbox"><span>' + task.title + '</span></label>';
	el += '<i class="fa fa-times remove pull-right" aria-hidden="true"></i></div>';

	// append just created element to the tasks container
	container.append(el);
}

function showErrorMessage(message) {
	var input = $('#newTask input');
	var el = $('<p></p>');
	el.addClass('error-message');
	el.text(message);
	input.after(el);
}

function showErrorAlert(text) {
	var errorText = text || "Error during the process";

	var alert = '<div class="alert alert-danger error-alert">';
	alert += '<span href="#" class="close" aria-label="close" onclick="closeErrorAlert()">&times;</span> ' + errorText + '</div>';
	var div = document.createElement('div');
	$(div).addClass('blocked');
	$('body').append(div);
	$('body').append(alert);
}

function closeErrorAlert() {
	$('.error-alert').remove();
	$('.blocked').remove();
}




