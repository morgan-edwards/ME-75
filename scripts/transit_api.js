console.log("LOADING API...");

const url = 'http://web.mta.info/status/serviceStatus.txt';

$.getJSON('http://anyorigin.com/go?url=http%3A//web.mta.info/status/serviceStatus.txt&callback=?',
function(data){
	$('#output').html(data.contents);
});
