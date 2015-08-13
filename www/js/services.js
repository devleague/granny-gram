'use strict';

var DEFAULT_CHALLENGE_LENGTH = 10000;

angular.module('starter')
  .service('RegisterService', ['$http', RegisterService])
  .service('LoginService', ['$http', LoginService])
  .service('LogOutService', ['$http', LogOutService])
  .service('PictureService', ['$http', PictureService])
  .service('MessageServices', MessageServices)
  .service('ChallengeService', ['$http', ChallengeService])
  .service('UserService', ['$http', UserService])
  .service('ChallengerService', ['$http', ChallengerService])
  .service('DataSharingService', DataSharingService)



function RegisterService($http){
  this.createUser = function (new_user){

    //Grab the necessary info from the register form and assign
    //to a user object

    //get info from Facebook
    var facebook_id = facebookid;
    var facebook_image_url = facebookimage;

    var new_register = {
      first_name : new_user.first_name,
      last_name : new_user.last_name,
      facebook_id: facebook_id,
      facebook_image_url: facebook_image_url,
      email: new_user.email,
      phone: new_user.phone
    };

    return $http.post('/api/users/', new_register);
  }

}

function LoginService($http){
  this.loginUser = function (login_user){

    //Grab the necessary info from the register form and assign
    //to a user object

    // var user_login = {
    //   username : login_user.username,
    //   password : login_user.password
    // };
    // return $http.post('/api/users/login', user_login);
  }

}

function LogOutService($http){
  this.logUserOut = function (){
    // return $http.get('/api/users/logout');
  }
}

function PictureService ($http){
  //not added to any controller yet
  this.sendImageToServer = function (imageURI){

    var imageData = {
      dataURI : imageURI
    };
    // return $http.post('http://localhost:3000/api/upload/', imageURI);
    return $http.post('http://10.0.1.30:3000/api/upload/', imageData);


  }
}

function MessageServices ($http) {
  this.sendChallengeInvites = function(invitationObj){
    // return $http.post('http://localhost:3000/api/message/', invitationObj);
    return $http.post('http://localhost:3000/api/message/', invitationObj);

  }
};

function ChallengeService ($http) {
  //will get the current users challenges (for their feed)
  this.getMyChallenges = function (user_id){
    console.log('going to get my challenges');
    return $http.get('http://localhost:3000/api/challengers/' + user_id + '/challenges');
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
  // this.addUserToChallenge = function (challenger) {

  //   var new_challenger = {

  //     initiator: challenger.initiator_flag,
  //     user_id: challenger.user_id,
  //     challenge_id: challenger.challenge_id
  //   };

  //   return $http.post('/api/challengers', new_challenger);
  // }

  // //will remove a user from challenge
  // //can be from the user who iniated the challenge
  // //or when they don't respond to a challenge
  // this.removeUserFromChallenge = function (challenger_id){

  //   return $http.delete('/api/challenger/' + challenger_id);
  // }


  this.createNewChallenge = function (challenge){

    var animalTypes = ['Cat', 'Dog', 'Deer', 'Mouse', 'Frog', 'Lamb', 'Duck', 'Elephant', 'Rabbit'];
    var randomIndex = Math.floor((Math.random() * animalTypes.length) + 0);

    var challengeNameGenerator = animalTypes.slice(randomIndex,randomIndex + 1).toString();

    var new_challenge = {
      name: challengeNameGenerator,
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

  this.getChallengeContext = function (challenge_id){

    return $http.get('http://localhost:3000/api/challenges/' + challenge_id + '/context');
  }


}

function UserService ($http){
  // gets a list of all users in the system to populate the select user to challenge page
  this.getAllUsers = function (){
    console.log('going for the usres');
    return $http.get('http://localhost:3000/api/users/');
  }

  //not in any controller or funcitonality as now
  this.getIndividualUser = function (userId){
    var user_id = userId
    return $http.get('/api/users/' + user_id);
  }

  //not in any controller - need to grab userid somehow
  this.updateUserInfo = function (user){

    // var user_id = userId;
    var user_profile = {
      user_name : user.user_name,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      service_provider : user.service_provider
    };

    return $http.put('/api/users/' + user_id, user_profile)

  }

  //not in any controller - need to grab userid somehow
  this.deleteUser = function (userId){
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
  this.errorLog = {};
};