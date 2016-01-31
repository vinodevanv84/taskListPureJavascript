$( document ).ready(function() {
    "use strict"; 
 	var uiConfig = {
 		'tastListId': '#taskLists',
 		'taskNameId': '#taskName',
 		'taskDateId': '#taskDate',
 		'taskAssignedToId': '#assignedTo',
 		'taskDetailSubmitId': '#taskDetailSubmit',
 		'taskOddElement': '<div class="row_odd" />',
 		'taskEvenElement': '<div class="row_even" />',
 		'taskNameElement': '<div class="cell"><p><strong>{{taskName}}</strong></p></div>',
 		'taskDateElement': '<div class="cell"><p>{{taskDate}}</p></div>',
 		'taskAssignToElement': '<div class="cell"><p>{{taskAssignTo}}</p></div>',
        'rowOddFlag': true,
        'addTaskPrepend': true
 	},
 	jsonTaskList = [
		{"name": "Test Task #1", "date": "12/01/2012", "assigned": "John Doe" },
		{"name": "Test Task #2", "date": "12/02/2012", "assigned": "John Doe" },
		{"name": "Test Task #3", "date": "12/03/2012", "assigned": "John Doe" },
		{"name": "Test Task #4", "date": "12/04/2012", "assigned": "John Doe" },
		{"name": "Test Task #5", "date": "12/05/2012", "assigned": "John Doe" },
		{"name": "Test Task #6", "date": "12/06/2012", "assigned": "John Doe" },
		{"name": "Test Task #7", "date": "12/07/2012", "assigned": "John Doe" }
	];

    function taskManagement(){
    	function bindUIData(elementString, bindKey, data){
    		return elementString.replace('{{' + bindKey + '}}', data);
    	}
    	function addTask(inputData){
    		var $taskDetails, taskNameElement, taskDateElement, taskAssignToElement;

    		$taskDetails = $( uiConfig.rowOddFlag ? uiConfig.taskOddElement : uiConfig.taskEvenElement);
    		taskNameElement = bindUIData(uiConfig.taskNameElement, 'taskName', inputData.name);
    		taskDateElement = bindUIData(uiConfig.taskDateElement, 'taskDate', inputData.date);
    		taskAssignToElement = bindUIData(uiConfig.taskAssignToElement, 'taskAssignTo', inputData.assigned);

    		$( taskNameElement ).appendTo( $taskDetails );
    		$( taskDateElement ).appendTo( $taskDetails );
    		$( taskAssignToElement ).appendTo( $taskDetails );
            if(uiConfig.addTaskPrepend){
                $( uiConfig.tastListId ).prepend( $taskDetails);
            }
            else{
                $( uiConfig.tastListId ).append( $taskDetails);
            }
    		uiConfig.rowOddFlag = uiConfig.rowOddFlag ? false : true;
    	}
    	function generateTaskList(taskList){
    		$.each(taskList, function( index, taskDetails ) {
			  addTask(taskDetails);
			});
    	}

    	function init(){
    		$(uiConfig.taskDetailSubmitId).on('click', function(e){
    			var inputData = {};
    			e.preventDefault();
    			inputData = {
    				name: $( uiConfig.taskNameId).val(),
    				date: $( uiConfig.taskDateId).val(),
    				assigned: $( uiConfig.taskAssignedToId).val()
    			};
    			if(inputData.name){
    				addTask(inputData);
    			}
    		});
    		generateTaskList(jsonTaskList);
    	}
    	return{
    		init: init,
    		generateTaskList: generateTaskList,
    		addTask: addTask
    	}
    }

    var taskManagementMethod = new taskManagement();
    taskManagementMethod.init();
 
});