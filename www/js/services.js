'use strict';

angular.module('starter')
  .service('RegisterService', ['$http', RegisterService])
  .service('LoginService', ['$http', LoginService])
  .service('LogOutService', ['$http', LogOutService])
  .service('PictureService', ['$http', PictureService])
  .service('ChallengeService', ['$http', ChallengeService])
  .service('UserService', ['$http', UserService])



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
    return $http.post('/api/users/register', new_register);
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
  this.savePictureToAws = function (s3_reference, privacy_status, challenger_id){

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

function ChallengeService ($http) {
  //will get the current users challenges (for their feed)
  this.getMyChallenges = function (user_id){

    return $http.get('/api/challengers/' + user_id + '/challenges');
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
  this.addUserToChallenge = function (user_id, challenge_id) {


  }

  //will remove a user from challenge
  //can be from the user who iniated the challenge
  //or when they don't respond to a challenge
  this.removeUserFromChallenge = function (){

  }


  this.createNewChallenge = function (){


  }

  // this.getTimeRemaining = function (){

  // }

  this.getChallengeContext = function (challenge_id){

    return $http.get('/api/challenges/' + challenge_id + '/context');
  }


}

function UserService ($http){
  // gets a list of all users in the system to populate the select user to challenge page
  this.getAllUsers = function (){
    return $http.get('/api/users/');
  }

  //not in any controller or funcitonality as now
  this.getIndividualUser = function (userId){
    var user_id = userId
    return $http.get('/api/users/' + user_id);
  }

  //not in any controller - need to grab userid somehow
  this.updateUserInfo = function (userId){

    var user_id = userId;
    var user_profile = {
      //populate this with the profile fields on the user profile page

    }

    return $http.put('/api/users/' + user_id, user_profile)

  }

  //not in any controller - need to grab userid somehow
  this.deleteUser = function (userId){
    var user_id = userId;
    return $http.delete('/api/users/' + user_id)
  }
}