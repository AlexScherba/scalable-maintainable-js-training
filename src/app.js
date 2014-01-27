require.config({
	baseUrl: '/',
    paths: {
		jquery: 'bower_components/jquery/jquery',
        calc: 'src/calc',
		voter: 'src/voter',
		EventBus: 'src/mediator'
    },
	shim: {
		'jquery': {
            exports: 'jQuery'
        }
	}
});

require(["jquery", "voter", 'EventBus'], function($, Voter, EventBus) {

	EventBus.bind('processResult', function(results) {
		require(['calc'], function(Calc){Calc().processResult(results);});
	});
	Voter($('#vote1'),{'dataPath':'questions.json', 'calcResultsCallback': 'processResult'});
	Voter($('#vote2'),{'dataPath':'questions2.json', 'calcResultsCallback': 'processResult', 'displayType':'inline'});

});
