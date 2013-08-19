$(function(){
    "use strict";

    var compatibility = {
        required: document.createElement('input').required !== undefined
    };

    var groups = [
        [0, 7],
        [8, 11],
        [12, 14],
        [15, 17]
    ];
    var questionsCount = 18;
    var questionMap = {};

    var groupTitles;
    var menuCounters;
    var inputs = {};

    function toggleGroup(event){
        var group = $(event.target).closest('.group'),
            id = group.data('group-id'),
            buttons = group.find('.group-toggle');
        buttons.toggle();
        group.children('.group-content').toggle();
    }

    function isInputFilled(node){
        if( node.nodeName.toLowerCase() === 'input' && node.type === 'checkbox' ){ //checkbox
            return $(node).is(':checked');
        }
        return !!node.value;
    }

    function calcAnswers(groupId){
        var count = 0,
            group = groups[groupId],
            hasValue;
        for(var i = group[0]; i <= group[1]; ++i){
            hasValue = false;
            inputs[i].each(function(){
                if( isInputFilled(this) ){
                    hasValue = true;
                }
            });
            if( hasValue ){
                ++count;
            }
        }
        return count;
    }

    function setAnswersCount(groupId, answers){
        var group = groups[groupId];
        menuCounters.eq(groupId).text(answers);
        groupTitles.eq(groupId).toggleClass('menu-group-filled', answers === group[1] - group[0] + 1);
    }

    function inputChange(event){
        var input = $(event.target),
            questionId = input.data('question-id'),
            groupId = questionMap[questionId],
            answers = calcAnswers(groupId);
        setAnswersCount(groupId, answers);
    }

    function totalAnswers(){
        var count = 0;
        for(var i = 0, len = groups.length; i < len; ++i){
            count += calcAnswers(i);
        }
        return count;
    }

    function checkRequiredFields(event){
        if( totalAnswers() !== questionsCount ){
            event.preventDefault();
        }
    }

    function submit(event){
        if( !compatibility.required ){
            checkRequiredFields(event);
        }
    }

    function initQuestions(){
        for(var i = 0, len = groups.length; i < len; ++i){
            var group = groups[i];
            for(var j = group[0]; j <= group[1]; ++j){
                questionMap[j] = i;
            }
        }
    }

    function initEvents(){
        $('body')
            .on('click', '.group-toggle', toggleGroup)
            .on('change', '.question-input', inputChange);
        $('form').bind('submit', submit);
    }

    function initContainers(){
        groupTitles = $('.menu-group');
        menuCounters = $('.menu-group-counter');
        for(var i in questionMap){
            if( questionMap.hasOwnProperty(i) ){
                inputs[i] = $('.question-input[data-question-id="' + i + '"]');
            }
        }
    }

    initQuestions();
    initContainers();
    initEvents();
});