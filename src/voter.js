define('voter', ['jquery', 'EventBus', 'underscore'], function($, EventBus){
	var _defaults = {
		currentQuestion: 0,
		qestions: {}
	};
	
    return function (el, params) {
        // private variables and methods
		var questionTpl = _.template("<input type='radio' name='answer' value='<%=value%>'><%=text%></input></br>");
        var options = {};
		var sum = 0;
        var element;
        // public variables and methods
        this.init = function (el, params) {
			element = el;
			$.extend(options, _defaults, params);
			getData();
            return this;
        };
        var getData = function () {
			$.getJSON(options.dataPath, function(data) {
				options.questions = data;
				displayQuestion();
			});
        };
		var displayQuestion = function () {
			
			if(options.currentQuestion == options.questions.length){
				processResult();
				return;
			}
			
            var question = options.questions[options.currentQuestion];
			element.find('#question').html(question.question);

			element.find('#answers').empty();

			$.each(question.answers, function(key, val){
				questionTpl({value: question.points[key], text: val});
				element.find('#answers').append(questionTpl({value: question.points[key], text: val}));
			});

			element.find('input').on('click', function(el) {
				processAnswer(this);
			});
		};
		var processAnswer = function (el) {
			options.currentQuestion++;
			sum = sum + $(el).attr('value')*1;
			displayQuestion();
		};
		var processResult = function () {
			EventBus.trigger(options.calcResultsCallback, {'element':element, 'result':sum, 'displayType':options.displayType});
		};
		this.init(el, params);
    };
});