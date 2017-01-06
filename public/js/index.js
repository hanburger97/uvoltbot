

var app = angular.module('app', ['ngRoute']);
/*
app.factory('ResponseService' ['$resource', function($resource){
    return $resource('/responses/:id', {}, {
        get: {
            isArray : true
        },
        post:{
            method: 'POST'
        },
        delete: {
            isArray: true,
            method: 'DELETE'
        }
    })
}]);*/
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/view', {
            templateUrl: './templates/view.html',
            controller: 'view'
        })
        .when('/view/:id',{
            templateUrl: './templates/edit.html',
            controller: 'edit'

    });
}]);


app.controller('view', ['$scope', '$http', '$rootScope', '$location', function($scope,$http, $rootScope, $location) {
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
            $scope.trigger = $scope.response = '';
            $rootScope.$emit('log', 'POST /responses success');
        });
    };
    $scope.remove = function(response) {
        $http.delete('/responses/' + response.id).success(function() {
            $http.get('/responses').success(function(data) {
                $scope.responses = data;
                $rootScope.$emit('log', 'GET /responses success');
            });
            $rootScope.$emit('log', 'DELETE /responses success');
        });
    };
    $scope.toEdit = function(response){
        $location.url('/view/'+ response.id);
    }

}]);

app.controller('postbacks', ['$scope', '$http', '$rootScope', function($scope,$http, $rootScope) {
    $scope.postbacks = [];
    $scope.received = $scope.response = '';
    $http.get('/postbacks').success(function(data) {
        $scope.postbacks = data;
        $rootScope.$emit('log', 'GET /postbacks success');
    });


    $scope.add = function () {
        $http.post('/postbacks', {
            received: $scope.received,
            response: $scope.response
        }).success(function(data) {
            $scope.postbacks.push(data);
            $scope.received = $scope.response = '';
            $rootScope.$emit('log', 'POST /postbacks success');
        });
    };
    $scope.remove = function(postback) {
        $http.delete('/postbacks/' + postback.id).success(function() {
            //$scope.responses = data;
            //$scope.responses.splice(response);
            $http.get('/postbacks').success(function(data) {
                $scope.postbacks = data;
            });
            $rootScope.$emit('log', 'DELETE /responses success');
        });
    }
}]);
app.controller('edit', ['$scope', '$http', '$rootScope', '$routeParams', function ($scope,$http, $rootScope, $routeParams) {
    $scope.response ={};
    $http.get('/responses/'+$routeParams.id).success(function(data){
        $scope.response = data;
        $scope.trigger = data.trigger;
        $scope.responsew = data.response;
        $rootScope.$emit('log', 'GET /responses/:id success')
    });
    $scope.update = function () {
        $http.put('/responses/'+$routeParams.id, {
            trigger : $scope.trigger,
            response: $scope.responsew
        }).success(function (data) {
            $scope.responsew = data.response;
            $scope.trigger = data.trigger;
            $rootScope.$emit('log', 'PUT /responses/:id success')
        })
    }


}]);
app.controller('logger', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.events = [];
    $rootScope.$on('log', function (event, data) {
        $scope.events.push(data.trim());
    });
}]);
