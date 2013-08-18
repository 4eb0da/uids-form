$(function(){
    "use strict";

    var closedGroups = {};

    function toggleGroup(event){
        var group = $(event.target).closest('.group'),
            id = group.data('group-id'),
            isClosed = closedGroups[id];
        ;
    }

    function initEvents(){
        $('body').on('click', '.group-toggle', toggleGroup);
    }
});