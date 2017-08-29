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
		<script type="text/javascript" src="rup-table-list.js"></script>
		<script type="text/javascript" src="rup-select-search.js"></script>
		<script type="text/javascript" src="rup-validation.js"></script>
		<script type="text/javascript" src="main-controller.js"></script>
	</head>
	<body ng-app="rup" ng-controller="mainController as self">
		<div class="container" style="margin-bottom:100px;">
			<h1>Data Table List</h1>
			<br/>
			<select ng-options="item.id as item.title for item in self.showRecords" ng-model="self.showGender" ng-change="self.changeCheck(self.showGender)"></select>
			<a style="float:right;" href="javascript:;" ng-click="self.AddNew()">Add New</a>
			<br/>
			<br/>
			<table-list 
				ng-if="!self.isAddNew"
				width="100%" 
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
			<div ng-if="self.isAddNew" class="row">
				<div class="col-sm-6">
					<form name="user_form" ng-submit="self.FormSubmit(user)" novalidate="">
						<div class="form-group">
							<label>Firstname</label>
							<input name="firstname" ng-model="user.firstname" blank/>
							<div ng-show="user_form.$submitted || user_form.firstname.$dirty">
								<div ng-show="user_form.firstname.$error.blank">Name field is mandatory.</div>
							</div>
						</div>
						{{user.firstname}} - {{user_form.firstname.$error}}
						<div class="form-group">
							<label>List</label>
							<rup-select-search form="user_form" name="rlist" with="500" mlist="self.mlist" ng-model="user.rlist" k-format="id" v-format="name" blank validator="blank"></rup-select-search>
							<div ng-show="user_form.$submitted || user_form.rlist.$dirty">
								<div ng-show="user_form.rlist.$error.blank">Rlist field is mandatory.</div>
							</div>
						</div>
						{{user.rlist}} - {{user_form.firstname.$error}}
						<div class="form-group">
							<button type="submit">Add</button>
						</div>
					</form>
				</div>
				<div class="col-sm-6">
					<div class="col-sm-6">
						<pre>{{user_form.firstname | json}}</pre>
					</div>
					<div class="col-sm-6">
						<pre>{{user_form.rlist | json}}</pre>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>