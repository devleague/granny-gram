angular.module('starter')

.controller('select-challenger-controller', function ($scope, UserService, ChallengeService, $state, $stateParams, DataSharingService, MessageServices, ChallengerService, $q) {

  $scope.imageURI = $stateParams.imageURI;

  $scope.UserService = UserService;
  $scope.users = [];



    UserService.getAllUsers()
    .success(function (res){
      console.log(res);
      $scope.users = res;
    })
    .error(function (err){
      console.log('Error with receiving users', err);
    })


    //generates an array of all the checked users
    $scope.usersChecked = [];
    $scope.isChecked = function (bool, user){
      if(bool){
        $scope.usersChecked.push(user);
      }else if($scope.usersChecked.indexOf(user) > -1){
        $scope.usersChecked.splice($scope.usersChecked.indexOf(user),1);
      }
    }

    $scope.combinedUpdate = function(){
      var challengeId = DataSharingService.activeChallenge.id;
      var selectedUsers = $scope.usersChecked;
      // var promise1 = $scope.createChallenger();
      var promiseArray = [$scope.updateChallengeTimes()];
      var promise3 = selectedUsers.forEach(function (user){
        promiseArray.push(ChallengerService.createChallenger(user.id, challengeId, false))
      })

      $q.all(promiseArray)
        .then(function(res){
          //update DataSharingService with new challenge time
          DataSharingService.activeChallenge.expireAt = res[0].data.expire_at;
          $state.go('app.challenge-in-progress');
        })
    };


    $scope.updateChallengeTimes = function(){
      var challengeId = DataSharingService.activeChallenge.id;
      return ChallengeService.updateChallengeTimes(challengeId);
    }


    $scope.sendInvites = function(){
      var invitationObj = {
        users: $scope.usersChecked,
        challengeId: DataSharingService.activeChallenge.id,
        challengerName: 'testName',
        startTime: Date.now()
      };

      MessageServices.sendChallengeInvites(invitationObj);

    };

    $scope.changeView = function(){
      console.log('changing view')
      $state.go('app.challenge-in-progress');
    };




  // $scope.addUserToChallenge = function (){
  //   ChallengeService.addUserToChallenge()
  //   .success(function (res){
  //     console.log('user added to challenge', res)
  //   })
  //   .error(function (err){
  //     console.log('Error with adding user', err);
  //   })
  // };

  // $scope.removeUserFromChallenge = function (){
  //   ChallengeService.removeUserFromChallenge()
  //   .success(function (res){
  //     console.log(res)
  //   })
  //   .error(function (err){
  //     console.log('Error with removing user', err);
  //   })
  // };


});
