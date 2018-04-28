(function() {
    var datepicker = {};

    //获取一个月数据
    datepicker.getMonthDate = function(year, month) {
        var yet = [];

        //不传参默认当前日期
        if (!year || !month) {
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }

        //这个月第一天
        var firstDay = new Date(year, month - 1, 1);
        //第一天周几
        var firstDayWeekDay = firstDay.getDay();
        if (firstDayWeekDay === 0) { firstDayWeekDay = 7 };

        //上个月最后一天
        var lastDayOfLastMonth = new Date(year, month - 1, 0);
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

        //需要显示的上个月个数
        var preMonthDayCount = firstDayWeekDay - 1;
        var lastDay = new Date(year, month, 0);
        var lastDate = lastDay.getDate();

        for (var i = 0; i < 7 * 6; i++) {
            var date = i + 1 - preMonthDayCount;
            var showDate = date;
            var thisMonth = month;

            if (date <= 0) {
                //上个月
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            } else if (date > lastDate) {
                //下一月
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }

            if (thisMonth === 0) thisMonth = 12;
            if (thisMonth === 13) thisMonth = 1;

            yet.push({
                month: thisMonth,
                date: date,
                showDate: showDate
            })
        }
        return {
            year: year,
            month: month,
            days: yet
        };
    }
    window.datepicker = datepicker;
})()