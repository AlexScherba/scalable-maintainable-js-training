$(function (){
//'calcResultsCallback': APP.Calc().processResult}
	APP.EventBus.bind('processResult', APP.Calc().processResult);
	APP.Voter($('#vote1'),{'dataPath':'questions.json', 'calcResultsCallback': 'processResult'});
	APP.Voter($('#vote2'),{'dataPath':'questions2.json', 'calcResultsCallback': 'processResult', 'displayType':'inline'});
});