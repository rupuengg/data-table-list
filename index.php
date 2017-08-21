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
		<script type="text/javascript" src="jquery.js"></script>
		<script src="angular.min.js"></script>
		<script type="text/javascript" src="ui-bootstrap-tpls-2.2.0.js"></script>
		<script type="text/javascript" src="main-controller.js"></script>
		<script type="text/javascript" src="rup-table-list.js"></script>
	</head>
	<body ng-app="rup" ng-controller="mainController as self">
		<div class="container" style="margin-bottom:100px;">
			<h1>Data Table List</h1>
			<br/>
			<select ng-options="item.id as item.title for item in self.showRecords" ng-model="self.showGender" ng-change="self.changeCheck(self.showGender)"></select>
			<br/>
			<br/>
			<table-list 
				width="500" 
				config="self.config"
				ng-model="data_list"
				show-row-number="true"
				min-limit="10" 
				is-progress="self.isProgress"
				show-pagging="false"
				edit-button="edit(index, row)" 
				copy-button="copy(index, row)" 
				delete-button="delete(index, row)">
			</table-list>
		</div>
	</body>
</html>