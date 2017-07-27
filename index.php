<!DOCTYPE html>
<html>
	<head>
		<title>Data Table List</title>
		<meta charset="utf-8">
		<meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
		<meta content="utf-8" http-equiv="encoding"/>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="style.css"/>
		<script src="angular.min.js"></script>
		<script type="text/javascript" src="main-controller.js"></script>
		<script type="text/javascript" src="table-listing.js"></script>
	</head>
	<body ng-app="rup" ng-controller="mainController as mainCtrl">
		<div class="container">
			<h1>Data Table List</h1>
			<br/>
			<br/>
			<table-listing width="500" cols="mainCtrl.columns" req-type="get" req-url="/data-table-list/data-list.json" show-row-number="true"></table-listing>
		</div>
	</body>
</html>