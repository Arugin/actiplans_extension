function modifyPage(){

    var listOfAbsence = {
        sick : [],
        remote: [],
        vacation : []
    };

    function populateListOfAbsence() {

        function filterFunction() {
            if ($(this).hasClass('pastDay')) return false;
            if ($(this).prev().hasClass('pastDay') || $(this).prev().hasClass('colleaguesSpacerCell')) return true;

            return false;
        }

        var allCells = $('.fullLeave').filter(filterFunction);

        allCells.each( function(){
            // find collegue name
            var person = {};

            person.todayCell = $(this);
            person.name = person.todayCell.parent().find('.colleagueNameContainer').html();

            if (person.todayCell.hasClass('leaveType1')) listOfAbsence.sick.push(person.name);
            if (person.todayCell.hasClass('leaveType2')) listOfAbsence.remote.push(person.name);
            if (person.todayCell.hasClass('leaveType3') || person.todayCell.hasClass('leaveType6')) listOfAbsence.vacation.push(person.name);
        });
    }

    populateListOfAbsence();

    function createUserList( type , names , header){
        var el = $('<div class="ap-userListCont">').addClass(type);
        var h = $('<div class="ap-userListHeader"></div>').html(header);
        var list = $('<ul class="ap-userList">');

        for (var i = 0; i < names.length; i++) {
            var r = $('<li>');
            r.html(names[i]);
            list.append(r);
        }

        el.append(h);
        el.append(list);
        return el;
    }

    function createSummaryView(){
        var el = $('<div id="ap-summaryView"><div class="pagetitle">Summary</div></div>');

        el.append(createUserList('ap-remoteWork', listOfAbsence.remote, 'Remote Work'));
        el.append(createUserList('ap-leaveTime', listOfAbsence.vacation, 'Vacation'));
        el.append(createUserList('ap-sickLeave', listOfAbsence.sick,'Sick Leave'));

        return el;
    }

    var cont = $('#contentDiv #contentInnerDiv');
    var sumView = createSummaryView();

    cont.prepend(sumView);
}

document.addEventListener('DOMContentLoaded',function(){

    var checkTable = $('#my-schedule-tabs .colleaguesTab').hasClass('ui-state-active');
    (checkTable) ? modifyPage() : $('.colleaguesTab a').one('click',function(){  modifyPage()  });

});
