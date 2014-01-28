require.config({
	baseUrl: '/',
    paths: {
		jquery: 'bower_components/jquery/jquery',
        calc: 'src/calc',
		voter: 'src/voter',
		EventBus: 'src/mediator',
		underscore: 'bower_components/underscore',
		modernizr: 'bower_components/modernizr'
    },
	shim: {
		'jquery': {
            exports: 'jQuery'
        },
		'underscore': {
            exports: '_'
        },
		'modernizr': {
            exports: 'Modernizr'
        }
	}
});

require(["jquery", "voter", 'EventBus', 'modernizr'], function($, Voter, EventBus) {
	
	Modernizr.load([{
		test: /*Modernizr.websockets &&*/ window.JSON,
		nope: '../bower_components/json3.js',
		complete: appInit
	}]);
	function appInit(){
		EventBus.bind('processResult', function(results) {
			require(['calc'], function(Calc){

				Calc().processResult(results);
			});
		});
			Voter($('#vote1'),{'dataPath':'questions.json', 'calcResultsCallback': 'processResult'});
		Voter($('#vote2'),{'dataPath':'questions2.json', 'calcResultsCallback': 'processResult', 'displayType':'inline'});
	}
});
