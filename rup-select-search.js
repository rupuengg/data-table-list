;
(function(ng) {
    ng
        .module('rup-select-search', [])
        .directive('rupSelectSearch', [
            function() {
                return {
                    restrict: 'E',
                    require: 'ngModel',
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
                        '<div class="clear"></div>' +
                        '</div>',
                    scope: {
                        mlist: '=mlist',
                        rlist: '=ngModel',
                        validator: '&'
                    },
                    link: function(scope, element, attrs, self) {
                        console.log(scope.validator);
                        scope.wd = parseInt(attrs.width) ? attrs.width + 'px' : attrs.width;
                        scope.keyFormat = attrs.kFormat;
                        scope.valueFormat = attrs.vFormat;
                        scope.isReverse = attrs.isReverse ? (attrs.isReverse == 'true' ? true : false) : false;

                        if (scope.validator) {
                            self.$validators.blank = function(modelValue, viewValue) {
                                console.log(viewValue, scope.validator(viewValue));
                                // if(!self){ return }

                                if (scope.validator(viewValue)) {
                                    return false;
                                }
                                return !scope.validator(viewValue);
                            };
                        }
                    },
                    controller: function($scope, $filter) {
                        $scope.searchText = '';

                        var self = this;

                        self.mlst = angular.copy($scope.mlist);

                        // Move All Items To Right
                        self.moveAllRight = function() {
                            angular.forEach($scope.mlist, function(value, key) {
                                if (checkItem($scope.rlist, value[$scope.keyFormat]) < 0) {
                                    $scope.rlist.push(value[$scope.keyFormat]);
                                }

                            });
                            if ($scope.isReverse)
                                $scope.mlist = [];
                        };

                        // Move Clicked Items To Right
                        self.moveRight = function(index) {
                            var lst = $filter('filter')($scope.mlist, $scope.searchText);
                            if (checkItem($scope.rlist, lst[index][$scope.keyFormat]) < 0) {
                                $scope.rlist.push(lst[index][$scope.keyFormat]);
                            }
                            $scope.searchText = '';

                            if ($scope.isReverse)
                                $scope.mlist.splice(index, 1);
                        };

                        // Remove All Items From Right
                        self.removeAllRight = function() {
                            $scope.rlist = [];

                            if ($scope.isReverse)
                                $scope.mlist = returnOrderArray($scope.rlist);
                        };

                        // Remove Clicked Items From Right
                        self.removeRight = function(index) {
                            for (var i = index; i < $scope.rlist.length; i++) {
                                $scope.rlist[i].rPos = $scope.rlist[i].rPos - 1;
                            }

                            $scope.rlist.splice(index, 1);

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