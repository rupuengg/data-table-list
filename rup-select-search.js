;(function(ng) {
    ng
    .module('rup-select-search', [])
    .directive('rupSelectSearch', [
        function() {
            return {
                restrict: 'E',
                require: 'ngModel', //['ngModel', '^?form'],
                template: '<div class="rup-select-search" style="width:{{wd}};">' +
                        '<div class="lft">' +
                        '<div class="inner box">' +
                        '<p ng-show="mlist.length > 0">' +
                        '<a ng-click="self.moveAllRight()" href="javascript:;">Select All</a>' +
                        '</p>' +
                        '<p ng-show="mlist.length > 0" class="search">' +
                        '<input type="text" placeholder="Search..." ng-model="searchText"/>' +
                        '</p>' +
                        '<ul>' +
                        '<li ng-repeat="obj in mlist | filter:searchText">' +
                        '<a ng-click="self.moveRight($index)" href="javascript:;">{{obj[valueFormat]}}</a>' +
                        '</li>' +
                        '</ul>' +
                        '<p ng-show="mlist.length == 0" class="no-item">' +
                        'No items' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '<div class="cntr">' +
                        '<div class="inner">' +
                        '<span class="fa fa-arrow-right fa-3x"></span>' +
                        '</div>' +
                        '</div>' +
                        '<div class="rht">' +
                        '<div class="inner box">' +
                        '<p ng-show="rlist.length > 0">' +
                        '<a ng-click="self.removeAllRight()" href="javascript:;">Remove All</a>' +
                        '</p>' +
                        '<ul ng-show="rlist.length > 0">' +
                        '<li ng-repeat="obj in rlist">' +
                        '<a ng-click="self.removeRight($index)" href="javascript:;">' +
                        '{{self.fetchObj(mlist, keyFormat, obj)[valueFormat]}}' +
                        '<span class="fa fa-close"></span>' +
                        '</a>' +
                        '</li>' +
                        '</ul>' +
                        '<p ng-show="rlist.length == 0" class="no-item">' +
                        'No items' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '<select name="{{fname}}" ng-options="obj[keyFormat] as obj[valueFormat] for obj in mlist" ng-model="rlist" blank multiple style="width:500px;display:none;"></select>' +
                        '<div class="clear"></div>' +
                    '</div>',
                scope: {
                    fname : '@name',
                    mlist : '=mlist',
                    rlist : '=ngModel',
                    valiType : '@valiType',
                    validator : '&'
                },
                link: function(scope, element, attrs, ctrl){
                    console.log('Select', scope.validator);
                    // scope.ctrl = obj[0];
                    // scope.from = obj[0];
                    // console.log('ngModelController', scope.ctrl);
                    // console.log('From', scope.from);

                    scope.keyFormat = attrs.kFormat;
                    scope.valueFormat = attrs.vFormat;
                    scope.isReverse = attrs.isReverse ? (attrs.isReverse == 'true' ? true : false) : false;

                    // if(scope.validator){
                    //     function validate(value){
                    //         if(ctrl.$pristine && scope.validator(value)){
                    //             return false;
                    //         }
                    //         return !scope.validator(value);
                    //     }
                        // ctrl.$validators.blank = function(modelValue, viewValue){
                        //     if(ctrl.$pristine && scope.validator(viewValue)){
                        //         return false;
                        //     }
                        //     return !scope.validator(viewValue);
                        // };
                    // }

                    // ctrl.$parsers.unshift(validate);
                    // ctrl.$formatters.unshift(validate);
                    // // ctrl.$validators.unshift(validate);
                },
                controller: function($scope, $filter, $attrs){
                    $scope.wd = parseInt($attrs.width) ? $attrs.width + 'px' : $attrs.width;

                    $scope.searchText = '';

                    var self = this;

                    self.validationString = $scope.valiType;

                    self.mlst = angular.copy($scope.mlist);

                    self.rlst = [];

                    // Move All Items To Right
                    self.moveAllRight = function() {
                        angular.forEach($scope.mlist, function(value, key) {
                            if (checkItem(self.rlst, value[$scope.keyFormat]) < 0) {
                                self.rlst.push(value[$scope.keyFormat]);
                            }
                        });

                        $scope.rlist = self.rlst;

                        if ($scope.isReverse)
                            $scope.mlist = [];
                    };

                    // Move Clicked Items To Right
                    self.moveRight = function(index) {
                        var lst = $filter('filter')($scope.mlist, $scope.searchText);
                        if (checkItem(self.rlst, lst[index][$scope.keyFormat]) < 0) {
                            self.rlst.push(lst[index][$scope.keyFormat]);
                        }
                        $scope.searchText = '';

                        $scope.rlist = self.rlst;

                        if ($scope.isReverse)
                            $scope.mlist.splice(index, 1);
                    };

                    // Remove All Items From Right
                    self.removeAllRight = function() {
                        self.rlst = [];
                        $scope.rlist = [];

                        if ($scope.isReverse)
                            $scope.mlist = returnOrderArray($scope.rlist);
                    };

                    // Remove Clicked Items From Right
                    self.removeRight = function(index) {
                        for (var i = index; i < self.rlst.length; i++) {
                            self.rlst[i].rPos = self.rlst[i].rPos - 1;
                        }

                        self.rlst.splice(index, 1);

                        if(self.rlst.length > 0)
                            $scope.rlist = self.rlst;
                        else
                            $scope.rlist = [];

                        if ($scope.isReverse)
                            $scope.mlist = returnOrderArray($scope.rlist);
                    };

                    // Fetch Object
                    self.fetchObj = function(mlist, keyFormat, obj) {
                        var chkBln = [];

                        angular.forEach(mlist, function(value, key) {
                            if (value[keyFormat] == obj) {
                                chkBln = value;
                            }
                        });

                        return chkBln;
                    };

                    // Check Item In Right
                    function checkItem(list, id) {
                        var chkBln = -1;

                        angular.forEach(list, function(value, key) {
                            if (value == id) {
                                chkBln = key;
                            }
                        });

                        return chkBln;
                    }

                    // Return
                    function returnOrderArray(child) {
                        var parent = angular.copy(self.mlst);
                        angular.forEach(child, function(val, k) {
                            var p = checkItem(parent, val[$scope.keyFormat]);
                            if (p >= 0) {
                                // console.log(parent, val[$scope.keyFormat], checkItem(parent, val[$scope.keyFormat]));
                                parent.splice(p, 1);
                            }
                        });

                        return parent;
                    }
                },
                controllerAs: 'self'
            };
        }
    ]);
})(window.angular);