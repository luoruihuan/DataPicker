(function() {
    var datepicker = window.datepicker;
    var monthDate;
    var $wrapper;
    datepicker.buildUi = function(year, month) {
        monthDate = datepicker.getMonthDate(year, month);
        var html = '<div class="ui-datepicker-header">' +
            '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a> ' +
            '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a> ' +
            '<span class="ui-datepicker-curr-month">' +
            monthDate.year + '-' +
            monthDate.month +
            '</span>' +
            '</div>' +
            '<div class="ui-datepicker-body">' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>一</th>' +
            '<th>二</th>' +
            '<th>三</th>' +
            '<th>四</th>' +
            '<th>五</th>' +
            '<th>六</th>' +
            '<th>七</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (var i = 0; i < monthDate.days.length; i++) {
            var date = monthDate.days[i];
            if (i % 7 === 0) { html += '<tr>' }
            html += '<td>' + date.showDate + '</td>'
            if (i % 7 === 6) { html += '</tr>' }
        }
        html +=
            '</tbody>' +
            '</table>' +
            '</div>';
        return html;
    }

    datepicker.render = function() {
        var year, month;
        if (monthDate) {
            year = monthDate.year;
            month = monthDate.month
        }
        var html = datepicker.buildUi(year, month);
        $wrapper = document.querySelector('.ui-datepicker-wrapper');
        if (!$wrapper) {
            $wrapper = document.createElement('div');
            document.body.appendChild($wrapper);
            $wrapper.className = 'ui-datepicker-wrapper';
        }
        $wrapper.innerHTML = html;
    }

    datepicker.init = function(input) {

        datepicker.render(); //渲染

        var $input = document.querySelector(input);
        var isOpen = false; //默认关闭

        //监听input点击事件
        $input.addEventListener('click', function(event) {
            if (isOpen) {
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
            } else {
                $wrapper.classList.add('ui-datepicker-wrapper-show');
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                $wrapper.style.top = top + height + 2 + 'px';
                $wrapper.style.left = left + 'px';
            }
            isOpen = !isOpen;
        }, false);

        //月份切换事件（事件冒泡）
        $wrapper.addEventListener('click', function(e) {
            var $target = e.target;
            if (!$target.classList.contains('ui-datepicker-btn')) return;

            //上一月
            console.log(monthDate);
            if ($target.classList.contains('ui-datepicker-prev-btn')) {
                monthDate.year--;
                if (monthDate.month === 0) {
                    monthDate.month = 12;
                }
                monthDate.month--;
            } else if ($target.classList.contains('ui-datepicker-next-btn')) {
                //下一月
                monthDate.month++;
                if (monthDate.month === 12) {
                    monthDate.month = 1;
                    monthDate.year++;
                }
            }
            datepicker.render();
        }, false)
    }
})()