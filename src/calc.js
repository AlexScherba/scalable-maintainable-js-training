define('calc', ['jquery', 'underscore'], function () {
	var _defaults = {
		dataPath: 'results.json',
		displayType: 'alert',
		results: {},
		result: 0
	};
    return function () {
        // private variables and methods
		var resultTpl = _.template("<br/><strong><%=result%></strong>");
		var resultTplAlert = _.template("Test passed! Result - <%=result%></strong>");
        var options = {};
		this.processResult = function (params) {
			$.extend(options, _defaults, params);
			getData();
            return this;
        };
		var setParams = function (params) {
			$.extend(options, _defaults, params);
            return this;
        };
        var getData = function () {
			$.getJSON(options.dataPath, function(data) {
				options.results = data;
				checkResults();
			});
        };
		var checkResults = function () {
			for (var x=0; options.results.length; x++)
			{
				if(options.result <= options.results[x].to)
				{
					displayResult(options.results[x].status);
					return;
				}
			}
		};
		var displayResult = function (result) {
			if(options.displayType == 'alert'){
				alert(result);
				$(options.element).html(resultTpl({'result':result}));
			}else{
				$(options.element).html(resultTplAlert({'result':result}));
			}
		};
		return this;
    };
});