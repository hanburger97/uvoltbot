

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
        .when('/view/response/:id',{
            templateUrl: './templates/edit.html',
            controller: 'editR'

        }).when('/view/postback/:id', {
            templateUrl: './templates/editP.html',
            controller: 'editP'
        }).when('/view/postback/:id/buttons', {
            templateUrl: './templates/pButton.html',
            controller: 'pButton'
    })
    ;
}]);


app.controller('view', ['$scope', '$http', '$rootScope', '$location', function($scope,$http, $rootScope, $location) {
    $scope.responses = [];
    $scope.trigger = $scope.response = $scope.action ='';
    $http.get('/responses').success(function(data) {
        $scope.responses = data;
        $rootScope.$emit('log', 'GET /responses success');
    });


    $scope.add = function () {
        $http.post('/responses', {
            trigger: $scope.trigger,
            response: $scope.response,
            action: {}
        }).success(function(data) {
            $scope.responses.push(data);
            $scope.trigger = $scope.response = $scope.action = '';
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
        $location.url('/view/response/'+ response.id);
    }

}]);

app.controller('postbacks', ['$scope', '$http', '$rootScope', '$location', function($scope,$http, $rootScope, $location) {
    $scope.postbacks = [];
    $scope.received = $scope.response = $scope.action='';
    $http.get('/postbacks').success(function(data) {
        $scope.postbacks = data;
        $rootScope.$emit('log', 'GET /postbacks success');
    });


    $scope.add = function () {
        $http.post('/postbacks', {
            received: $scope.received,
            response: $scope.response,
            action: {}
        }).success(function(data) {
            $scope.postbacks.push(data);
            $scope.received = $scope.response = $scope.action = '';
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
    };
    $scope.toEdit = function (postback) {
        $location.url('/view/postback/'+ postback.id)
    }
}]);
app.controller('editR', ['$scope', '$http', '$rootScope', '$routeParams', '$location', function ($scope,$http, $rootScope, $routeParams, $location) {
    $scope.response ={};
    $http.get('/responses/'+$routeParams.id).success(function(data){
        $scope.response = data;
        $scope.trigger = data.trigger;
        $scope.responsew = data.response;
        $scope.operation = data.action.operation;
        $scope.value = data.action.value;
        $rootScope.$emit('log', 'GET /responses/:id success')
    });
    $scope.update = function () {
        $http.put('/responses/'+$routeParams.id, {
            trigger : $scope.trigger,
            response: $scope.responsew,
            action: {
                operation: $scope.operation,
                value: $scope.value
            }
        }).success(function (data) {

            $location.url('/view');
            $rootScope.$emit('log', 'PUT /responses/:id success')
        })
    }


}]);
app.controller('editP', ['$scope', '$http', '$rootScope', '$routeParams', '$location', function ($scope,$http, $rootScope, $routeParams, $location) {
    $scope.postback ={};
    $http.get('/postbacks/'+$routeParams.id).success(function(data){
        $scope.postback = data;
        $scope.received = data.received;
        $scope.response = data.response;
        $scope.operation = data.action.operation;
        $scope.value = data.action.value;
        $rootScope.$emit('log', 'GET /postback/:id success')
    });
    $scope.update = function () {
        $http.put('/postbacks/'+$routeParams.id, {
            received : $scope.received,
            response: $scope.response,
            action: {
                operation: $scope.operation,
                value: $scope.value
            }
        }).success(function (data) {
            $scope.received= $scope.response=$scope.operation= $scope.value='';
            $location.url('/view');
            $rootScope.$emit('log', 'PUT /responses/:id success')
        })
    }


}]);


app.controller('pButton', ['$scope', '$rootScope', '$http', '$location', 'routeParams', function ($scope, $rootScope, $http, $location, $routeParams) {
    $scope.buttons = [];
    $scope.title = $scope.subtitle = $scope.img ='';
    //$scope.btnText = $scope.text = $scope.payload;
    //$scope.postback = {};
    $http.get('/postbacks/'+$routeParams.id).success(function(data){
        $scope.buttons = data.attachment.payload.elements.buttons;
        $scope.title = data.attachment.payload.elements.title;
        $scope.subtitle = data.attachment.payload.elements.subtitle;
        $scope.img = data.attachment.payload.elements.image_url;

    });
    $scope.addBtn = function () {
        var button = {
            type: $scope.btnType,
            title: $scope.btnTitle,
            payload: $scope.btnPayload
        };
        buttons.push(button);

    };
    $scope.update = function () {
        $http.put('/postbacks'+$routeParams.id, {
            response : {
                attachment : {
                    type: 'template',
                    payload : {
                        template_type: 'generic',
                        elements : [
                            {
                                title : $scope.title,
                                image_url : $scope.img,
                                subtitle : $scope.subtitle,
                                buttons : $scope.buttons
                            }
                        ]
                    }

                }
            }

        }).success(function () {
            $rootScope.$emit('log', 'PUT /responses/:id btns updated')
        })
    }


}]);


app.controller('logger', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.events = [];
    $rootScope.$on('log', function (event, data) {
        $scope.events.push(data.trim());
    });
}]);
