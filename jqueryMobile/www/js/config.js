var config = (function() {
  function config() {}
  
  config.prototype.fbAppID = "594078480627880";

  config.prototype.me = "";
  
  config.prototype.dbinstance = {};
  
  config.prototype.mybasicinfo ={};
  
  config.prototype.fbResponse = {};

  config.prototype.searchUsers = [];

  config.prototype.user = {};
  
  config.prototype.z_index = 1;

  config.prototype.alertTitle = "DreamRegister";

  config.apiURL = "http://173.230.154.160/dream/API/index.php";
  
  config.prototype.globalmsg = {
     condition :"Maecenas vestibulum vehicula dolor nec placerat. Integer vel nisl blandit, feugiat est at, elementum purus. Aenean interdum odio nulla, eget tempus tortor blandit sit amet. Morbi ornare vel dui sit amet vulputate. In sollicitudin, elit a tempor viverra, augue eros aliquam quam, eget dignissim dolor ligula vel sem. Donec volutpat accumsan cursus. Ut venenatis a augue non condimentum.Donec sit amet est placerat, dictum elit et, convallis nunc. Mauris consequat venenatis nunc, pulvinar vulputate enim fermentum eu. Proin sagittis imperdiet magna. Proin semper mauris odio, in laoreet ipsum molestie sed. Nulla eleifend ullamcorper pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla congue libero ac elit eleifend ullamcorper. Vivamus placerat pulvinar justo, ac tincidunt nibh pulvinar a. Cras cursus pharetra neque. Sed sollicitudin cursus vulputate. Nam ut enim eget libero gravida rhoncus interdum ac sem. In nec vulputate diam. Sed ornare at quam eget fringilla.", 
     integrity :"Maecenas vestibulum vehicula dolor nec placerat. Integer vel nisl blandit, feugiat est at, elementum purus. Aenean interdum odio nulla, eget tempus tortor blandit sit amet. Morbi ornare vel dui sit amet vulputate. In sollicitudin, elit a tempor viverra, augue eros aliquam quam, eget dignissim dolor ligula vel sem. Donec volutpat accumsan cursus. Ut venenatis a augue non condimentum.Donec sit amet est placerat, dictum elit et, convallis nunc. Mauris consequat venenatis nunc, pulvinar vulputate enim fermentum eu. Proin sagittis imperdiet magna. Proin semper mauris odio, in laoreet ipsum molestie sed. Nulla eleifend ullamcorper pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla congue libero ac elit eleifend ullamcorper. Vivamus placerat pulvinar justo, ac tincidunt nibh pulvinar a. Cras cursus pharetra neque. Sed sollicitudin cursus vulputate. Nam ut enim eget libero gravida rhoncus interdum ac sem. In nec vulputate diam. Sed ornare at quam eget fringilla."
  },

  config.prototype.url = {
    fbLogin: config.apiURL + '/facebook/index/',
    login: config.apiURL + '/user/login/',
    register: config.apiURL + '/user/register/',
    passwd: config.apiURL + '/user/forgotpassword/',
    profile: config.apiURL + '/user/index/',
    userSearch: config.apiURL + '/user/searchuser/',
    logDream: config.apiURL + '/dream/create/',
    createUser: config.apiURL + '/user/connect/',
    byMe: config.apiURL + '/dream/byme/',
    forMe: config.apiURL + '/dream/forme/',
    updateProfile: config.apiURL + '/user/updateprofile/',
    dreamsFeed: config.apiURL + '/dream/dreamfeed/',
    getFriends: config.apiURL + '/user/getFriends/' ,
    opentandc_for_facebookurl:config.apiURL + '/user/acceptTerm/' 
  };
  
  
  config.prototype.errorMSG = {
    u1000: "Please provide valid data.",  
    u1001: "User does not found.",
    u1002: "Password Mismatch.",
    u1003: "Email is not verified yet.Please verify your email id.",
    u1004: 'User already exist ',
    u1005: 'Either Login with facebook or Sign up with Email.',
    c1001:'Please Check above field',
    c1002:'Failed from timeout',
    c1003:'A Verification E-mail Sent To Your E-mail Id',
    c1004:'Terms and Conditions not Agreed',
    c1005:'Please check your email for new password',
    c1006:'User Not Agreed'

  };

  return config;

})();


           
