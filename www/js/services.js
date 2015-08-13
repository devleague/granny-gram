'use strict';

var DEFAULT_CHALLENGE_LENGTH = 300000;

angular.module('starter')
  .service('RegisterService', ['$http', '$localStorage', '$location', RegisterService])
  .service('LoginService', ['$http', LoginService])
  .service('LogOutService', ['$http', LogOutService])
  .service('PictureService', ['$http', PictureService])
  .service('MessageServices', MessageServices)
  .service('ChallengeService', ['$http', ChallengeService])
  .service('UserService', ['$http', UserService])
  .service('ChallengerService', ['$http', ChallengerService])
  .service('DataSharingService', DataSharingService)



function RegisterService($http, $localStorage, $location) {
  this.createUser = function() {
    if ($localStorage.hasOwnProperty('accessToken') === true) {
      $http.get('https://graph.facebook.com/v2.2/me', {
        params: {
          access_token: $localStorage.accessToken,
          fields: 'id,first_name,last_name,picture,email',
          format: 'json'
        }
      }).then(function(result) {
        var user = {
          first_name: result.data.first_name,
          last_name: result.data.last_name,
          id: result.data.id,
          email: result.data.email,
          picture: result.data.picture.data.url
        };
        return $http.post(SERVER_IP + '/api/register/facebook_register_user', user);
      }, function(error) {
        console.log(error);
      });
    } else {
      alert('Not signed in');
      $location.path('/#/landing');
    }
  }

  this.logout = function() {
    return delete($localStorage.accessToken);
  }

}

function LoginService($http) {
  this.loginUser = function(login_user) {

    //Grab the necessary info from the register form and assign
    //to a user object

    // var user_login = {
    //   username : login_user.username,
    //   password : login_user.password
    // };
    // return $http.post('/api/users/login', user_login);
  }

}

function LogOutService($http) {
  this.logUserOut = function() {
    // return $http.get('/api/users/logout');
  }
}

function PictureService($http) {
  //not added to any controller yet
  this.savePictureToAws = function(s3_reference, privacy_status, challenger_id) {

    var new_image = {

      s3_reference: s3_reference,
      privacy_status: privacy_status,
      challenger_id: challenger_id
    };

    return $http.post('/api/images/', new_image);
  }

  // this.getIndividualPic = function (){

  // }
}

<<<<<<< HEAD

function MessageServices($http) {
  this.sendChallengeInvites = function(challenge_obj) {

    return $http.post('/api/message/', challenge_obj);
=======
function MessageServices ($http) {
  this.sendChallengeInvites = function(invitationObj){
    console.log('sending invites')
    return $http.post('http://localhost:3000/api/message/', invitationObj);
>>>>>>> develop


  }

};

function ChallengeService($http) {
  //will get the current users challenges (for their feed)
  this.getMyChallenges = function(user_id) {
    //hard coded user_id to 1 need to populate dynamically
    return $http.get('http://localhost:3000/api/challengers/1/challenges');

  }

  //Can use the below for a global view at some point in the future
  // //will get all the open challenges in the system
  // this.getAllCurrentChallenges = function (){

  // }

  // //will get all the expired challenges in the systme
  // this.getAllExpiredChallenges = function (){

  // }

  // this.getChallengeUsers = function (){

  // }

  //will allow a User to add other users to the challenge
  //will also be called when a user 'accepts' a challenge request
<<<<<<< HEAD
  this.addUserToChallenge = function(challenger) {
=======
  // this.addUserToChallenge = function (challenger) {
>>>>>>> develop

  //   var new_challenger = {

  //     initiator: challenger.initiator_flag,
  //     user_id: challenger.user_id,
  //     challenge_id: challenger.challenge_id
  //   };

  //   return $http.post('/api/challengers', new_challenger);
  // }

<<<<<<< HEAD
  //will remove a user from challenge
  //can be from the user who iniated the challenge
  //or when they don't respond to a challenge
  this.removeUserFromChallenge = function(challenger_id) {
=======
  // //will remove a user from challenge
  // //can be from the user who iniated the challenge
  // //or when they don't respond to a challenge
  // this.removeUserFromChallenge = function (challenger_id){
>>>>>>> develop

  //   return $http.delete('/api/challenger/' + challenger_id);
  // }


  this.createNewChallenge = function(challenge) {

    var new_challenge = {

      // start_at: Date.now(),
      // expire_at: Date.now() + DEFAULT_CHALLENGE_LENGTH,
      name: 'challenge.name',
      privacy_status: 'public'
    };

    return $http.post('http://localhost:3000/api/challenges', new_challenge);
  }

  this.updateChallengeTimes = function (challengeId){
    console.log('updating challenge time');
      var updateData = {
        start_at : Date.now(),
        expire_at : Date.now() + DEFAULT_CHALLENGE_LENGTH
      }

    return $http.put('http://localhost:3000/api/challenges/' + challengeId, updateData);
  }

  // this.getTimeRemaining = function (){

  // }

  this.getChallengeContext = function(challenge_id) {

    return $http.get('http://localhost:3000/api/challenges/' + challenge_id + '/context');
  }


}

function UserService($http) {
  // gets a list of all users in the system to populate the select user to challenge page
  this.getAllUsers = function() {
    console.log('going for the usres');
    return $http.get('http://localhost:3000/api/users/');
  }

  //not in any controller or funcitonality as now
  this.getIndividualUser = function(userId) {
    var user_id = userId
    return $http.get('/api/users/' + user_id);
  }

  //not in any controller - need to grab userid somehow
  this.updateUserInfo = function(user) {

    // var user_id = userId;
    var user_profile = {
      user_name: user.user_name,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      service_provider: user.service_provider
    };

    return $http.put('/api/users/' + user_id, user_profile)

  }

  //not in any controller - need to grab userid somehow
  this.deleteUser = function(userId) {
    var user_id = userId;
    return $http.delete('/api/users/' + user_id)
  }
}

function ChallengerService($http){

  this.createChallenger = function(userId, challengeId, initiator){
    console.log('creating challenger',userId,challengeId,initiator)
    var challenger = {
      initiator_flag : initiator,
      challenge_id: challengeId,
      user_id: userId
    };
    return $http.post('http://localhost:3000/api/challengers/', challenger);
  }

};

function DataSharingService(){

  this.activeChallenge = {};
  this.activeUser = {};
};