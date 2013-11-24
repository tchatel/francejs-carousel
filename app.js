"use strict";


angular.module('app', [])

    .controller('Ctrl', function ($scope) {
        var images = [
            'img/photo1.jpg',
            'img/photo2.jpg',
            'img/photo3.jpg',
            'img/photo4.jpg',
            'img/photo5.jpg',
            'img/photo6.jpg',
            'img/photo7.jpg',
            'img/photo8.jpg',
        ];
        $scope.images = images;
    })

    .directive('carousel', function () {

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

            }
        };

    })



