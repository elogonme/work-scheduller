// Start script after page is loaded - all js code goes in here
$(document).ready(function() {

    var dateToday = moment().format('dddd, MMMM Do YYYY'); // get todays date using moment.js
    var hourNow = moment().format('H'); // get hour now using moment.js
    
    // Set todays date to display on page in p #currentDay
    $('#currentDay').text(dateToday).css('color', 'blue');

    
    // load day schedule from localStorage
    var schedule = loadTaskList();
    console.log(schedule);
    // display on the page day work hours list 
    outputTimeblocks();

    // Add event listner for save buttons
    $('.saveBtn').on('click', function(){
        console.log(this.value - 9, $(this).siblings()[1].innerHTML);
        schedule.tasks[this.value - 9] = $(this).siblings()[1].value; // Save clicked task to object tasks array
        saveTaskList(schedule);
        console.log(schedule.tasks);
    });
    // Depending wich save buttonis clicked get textarea and save under corresponding hour into loacl storage
    // Refresh saved day work schedule

    // Additonal?
    // Clear each hour?
    // Clear all day?
    // Clear all stored data from local storage




    // Function to output list of hours with tasks
    function outputTimeblocks(){
        for (var i = 9; i <= 18; i++) {
            var $timeblock = $('<div>');
            var hourText;
            var $hour = $('<div>');
            var $description = $('<textarea name="description">');
            var $saveButton = $('<button>');
            
            // format hour text depending on AM or PM
            if (i < 13 ) {
                hourText = i + 'AM';
            } else {
                hourText = i - 12 + 'PM';
            }
            // add on each hour textarea for input and button to save with all bootstrap classes for styling
            $timeblock.addClass('row time-block my-1');
            $hour.addClass('hour col-1 pt-2 pr-1');
            $hour.text(hourText);
            $description.addClass('description col-10');
            // fill in day hours with task data.
            $description.text(schedule.tasks[i - 9]); // add task text loaded from tasks array in schedule object
            $saveButton.addClass('saveBtn col-1');
            $saveButton.attr('value', i);
            $saveButton.html('<i class="fas fa-save"></i>'); // add save button icon
            // Each hour is color coded with past, present and future hours (grey, red, green)
            // Add color classes to different hours depending on time now
            if (i > hourNow) {
                $description.addClass('future');
            } else if (i < hourNow) {
                $description.addClass('past');
            } else $description.addClass('present');

            $timeblock.append($hour, $description, $saveButton)
            $('#time-blocks').append($timeblock);
        }
        
    }

    // Function to get data from local storage and return or return empty object
    function loadTaskList(){
        var schedule = JSON.parse(localStorage.getItem('schedule'));
        
        if (!schedule) {
                console.log('nothing in stoarge');
                // Object to store today's tasks and method to save tasks
                schedule = {
                    date: '',
                    tasks: ['', '', '', '', '', '', '', '', '', ''],
                };
            }
        schedule.date = dateToday;
        return schedule;
    }

    function saveTaskList(schedule) {
        localStorage.setItem('schedule', JSON.stringify(schedule));
    }
});
