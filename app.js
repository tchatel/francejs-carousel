"use strict";


angular.module('app', [])

    .controller('Ctrl', function ($scope) {
        var next = 5;
        var images = [];
        for (var i = 1 ; i < next ; i++) {
            images.push('img/photo' + i + '.jpg');
        }
        $scope.images = images;
        $scope.addImage = function () {
            if (next <= 8) {
                images.push('img/photo' + next + '.jpg');
                next++;
            }
        }
    })

    .directive('carousel', function ($timeout) {

        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                var images = {
                    list: [],
                    currentIndex: 0,
                    setList: function (list) {
                        this.currentIndex = 0;
                        angular.copy(list, this.list);
                    },
                    prev: function () {
                        this.currentIndex = this.currentIndex > 0
                                          ? this.currentIndex - 1
                                          : this.list.length - 1;
                    },
                    next: function () {
                        this.currentIndex = this.currentIndex < this.list.length - 1
                                          ? this.currentIndex + 1
                                          : 0;
                    },
                    getCurrent: function () {
                        return this.list[this.currentIndex];
                    }
                };

                var timer = null;
                function show() {
                    if (timer) {
                        $timeout.cancel(timer);
                    }
                    var img = '<img src="' + images.getCurrent() + '"/>';
                    element.html(img);
                    timer = $timeout(function () {
                        images.next();
                        show();
                    }, 5000);
                }

                scope.$watch(attrs.images, function (value) {
                    images.setList(value);
                    show();
                }, true);

            }
        };

    })



