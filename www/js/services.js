'use strict';

angular.module('starter')
  .service('RegisterService', ['$http', RegisterService])
  .service('LoginService', ['$http', LoginService])
  .service('LogOutService', ['$http', LogOutService])
  .service('PictureService', ['$http', PictureService])
  .service('ChallengeService', ['$http', ChallengeService])



function RegisterService($http){
  this.createUser = function (new_user){

    //Grab the necessary info from the register form and assign
    //to a user object

    // var new_register = {
    //   username : new_user.username,
    //   password : new_user.password
    // };
    return $http.post('/api/users/register', new_register);
  }

  //Below is for FB user register
  this.createFbUser = function (new_user){
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
    return $http.post('/api/users/login', user_login);
  }

  //below is for fb
  this.loginFbUser = funtion (login_user){
    return $http.post('/api/users/login', user_login);
  }
}

function LogOutService($http){
  this.logUserOut = function (){
    return $http.get('/api/users/logout');
  }
}

function PictureService ($http){
  this.savePictureToAws = function (){

  }

  this.getChallengePics = function (){

  }

  this.getIndividualPic = function (){

  }
}

function ChallengeService ($http){
  //will get the current users challenges (for their feed)
  this.getMyChallenges = function ($http){

  }

  //will get all the open challenges in the system
  this.getAllCurrentChallenges = function ($http){

  }

  //will get all the expired challenges in the systme
  this.getAllExpiredChallenges = function ($http){

  }

  //will allow a User to add other users to the challenge
  //will also be called when a user 'accepts' a challenge request
  this.addUserToChallenge = function ($http){

  }

  //will remove a user from challenge
  //can be from the user who iniated the challenge
  //or when they don't respond to a challenge
  this.removeUserFromChallenge = function ($http){

  }


  this.getTimeRemaining = function ($http){

  }


}

