

var app = angular.module('app', ['ngResource']);
/*
app.factory('ResponseService' ['$resource', function($resource){
    return $resource('/responses/:id', {}, {
        get: {
            isArray : true
        },
        delete: {
            isArray: true,
            method: 'DELETE'
        },
    })
}])

*/
app.controller('main', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.responses = [];
    $scope.trigger = $scope.response = '';
    $http.get('/responses').success(function(data) {
        $scope.responses = data;
        $rootScope.$emit('log', 'GET /responses success');
    });
    $scope.add = function () {
        $http.post('/responses', {
            trigger: $scope.trigger,
            response: $scope.response
        }).success(function(data) {
            $scope.responses.push(data);
            $scope.firstName = $scope.lastName = '';
            $rootScope.$emit('log', 'POST /responses success');
        });
    };
    $scope.remove = function(response) {
        $http.delete('/responses/' + response.id).success(function(data) {
            $scope.responses = data;
            $rootScope.$emit('log', 'DELETE /responses success');
        });
    }
}]);
app.controller('logger', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.events = [];
    $rootScope.$on('log', function (event, data) {
        $scope.events.push(data.trim());
    });
}]);
