'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";


            $scope.dishes = [];
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status+" "+response.statusText;
                }
            );

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.myfeedback = 
            { mychannel:"", firstName:"", lastName:"", agree:false, email:"", comments:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            //$scope.fid = 0;
            $scope.sendFeedback = function() {
                
                console.log($scope.myfeedback);
                
                if ($scope.myfeedback.agree && ($scope.myfeedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    //console.log($scope.myfeedback);
                    //$scope.getFeedback.push($scope.myfeedback);
                    feedbackFactory.getFeedback().save($scope.myfeedback);
                    $scope.invalidChannelSelection = false;
                    $scope.myfeedback = 
                    { mychannel:"", firstName:"", lastName:"", agree:false, email:"", comments:"" };
                    $scope.myfeedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    //console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.showDish = false;
            $scope.message = "Loading ...";

            $scope.dish = {};
            menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                function(response) {
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status+" "+response.statusText;
                }
            );
            
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory',
          function($scope, menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
                menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        // implement the IndexController and About Controller here

        .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory',
            function($scope, corporateFactory, menuFactory) {

            $scope.message = "Loading ...";
            $scope.promotion = {};
            $scope.showPromotion = false;
            menuFactory.getPromotion().get({id:0})
            .$promise.then(
                function(response) {
                    $scope.promotion = response;
                    $scope.showPromotion = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status+" "+response.statusText;
                }
            );

            $scope.chef = {};
            $scope.showChef = false;
            $scope.message = "Loading ...";
            corporateFactory.getLeaders().get({id:3})
            .$promise.then(
                function(response) {
                    $scope.chef = response;
                    $scope.showChef = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status+" "+response.statusText;
                }
            );


            $scope.showDish = false;
            $scope.message = "Loading ...";
            $scope.dish = {};
            menuFactory.getDishes().get({id:0})
            .$promise.then(
                function(response) {
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status+" "+response.statusText;
                }
            );

        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            
            $scope.leadership = [];
            $scope.showLeaders = false;
            $scope.message = "Loading...";
            corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leadership = response;
                    $scope.showLeaders = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status+" "+response.statusText;                    
                }
            );

        }])

;
