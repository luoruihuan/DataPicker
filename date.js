(function() {
    var datepicker = {};
    datepicker.getMonthData = function(year, month) {
        var yet = [];
        if (!year || !month) {
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth + 1;
        }


    }



    window.datepicker = datepicker;
})()