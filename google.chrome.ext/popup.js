document.addEventListener('DOMContentLoaded', function(){
	document.getElementById('checkPage').addEventListener('click', function(){
		chrome.tabs.getSelected(null, function(tab){
			console.log(tab, document);
		});
	});
});