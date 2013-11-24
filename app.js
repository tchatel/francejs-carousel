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

        var staticImages = [];

        return {
            restrict: 'E',
            templateUrl: 'carousel.html',
            transclude: true,
            controller: function () {
                this.addImage = function (image) {
                    staticImages.push(image);
                };
            },
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
                    var img = '<img src="' + images.getCurrent() + '"/>';
                    element.find('span').html(img);
                    if (timer) {
                        $timeout.cancel(timer);
                    }
                    timer = $timeout(function () {
                        timer = null;
                        images.next();
                        show();
                    }, 5000);
                }
                scope.prev = function () {
                    images.prev();
                    show();
                }
                scope.next = function () {
                    images.next();
                    show();
                }
                scope.current = function () {
                    return images.currentIndex + 1;
                }
                scope.total = function () {
                    return images.list.length;
                }

                scope.$watch(attrs.images, function (value) {
                    images.setList(staticImages.concat(value));
                    show();
                }, true);
            }
        };

    })

    .directive('carouselImage', function () {
        return {
            restrict: 'E',
            require: '^carousel',
            link: function (scope, element, attrs, ctrl) {
                ctrl.addImage(attrs.src);
            }
        };
    })


