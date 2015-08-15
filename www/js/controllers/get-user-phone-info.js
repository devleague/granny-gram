angular.module('starter')

.controller('get-user-phone-info', function ($scope, $localStorage){

  var user_id = 2;
  // var user_id =  $localStorage.activeUserId;

  $scope.updateUserPhoneInfo = function (){
    UserService.updateUserPhoneInfo(user_id, user_info)
      .success(function (res){
        console.log('updated user info', res);
      })
      .error(function (error){
        console.log('error with updating a user phone info', error);
      })
  }

})