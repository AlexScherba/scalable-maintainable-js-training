var APP = APP || {};
 
// module-"class" (constructor)
APP.Voter = (function (APP, $, undefined) {
    
	var _defaults = {
		currentQuestion: 0,
		qestions: {}
	};
	
    return function (el, params) {
        // private variables and methods
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
				element.find('#answers').append('<input type="radio" name="answer" value="'+question.points[key]+'">'+val+'</input></br>');
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
			APP.EventBus.trigger(options.calcResultsCallback, {'element':element, 'result':sum, 'displayType':options.displayType});
			//options.calcResultsCallback({'element':element, 'result':sum, 'displayType':options.displayType});
		};
		this.init(el, params);
    };
}(APP, jQuery));