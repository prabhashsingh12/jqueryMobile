var facebook = {
  init : function() {
    var e;
    try {
      return FB.init({
        appId: config.prototype.fbAppID,
        nativeInterface: CDV.FB,
        useCachedDialogs: false
      });
    } catch (_error) {
      e = _error;
      return console.log(e);
    }
  },

  login : function() {
    return FB.login((function(response) {}), {
      scope: "email,read_friendlists,friends_about_me,friends_birthday,friends_hometown,user_location,user_hometown,user_birthday"
    });
  }
};

try {
  FB.Event.subscribe("auth.login", function(response) {
     console.log(response.authResponse.accessToken);
     // in case of ios resopnse return userID
     if(!response.authResponse.userId){
         response.authResponse.userId = response.authResponse.userID
     }

     $.mobile.loading( 'show',{
        theme: 'a'
     });
     return $.ajax({
         type: "GET",
         url: config.prototype.url.fbLogin + response.authResponse.userId + '/' + response.authResponse.accessToken
      }).done(function(response){
          console.log(response);
          var res=JSON.parse(response);
          if(!!res.status){
             
              if(res.termstatus)
              {    
              config.prototype.me=res.id;
              console.log(config.prototype.me);
              window.localStorage.setItem("loggedin", true);
              window.localStorage.setItem("id", res.id);
              utility.fetchData("edit-profile-page");
              database.createdb();

              }
              else
              {
                  
                  location.href='#termsandintigrity_facebook';
                  $.mobile.loading('hide');
                  $("#iagreetandc").bind( "click", function()
                  {
                      if (validate('termsandintigrity_facebook')) 
                      {
                        $.mobile.loading('show', {
                            theme: 'a'
                        })
                        utility.sendtandc_for_facebook("termsandintigrity_facebook","viewprofile",res.id);
                      }
                      else
                      {
                          $.makePopup(validate.prototype.errorMsg.c1006).popup("open"); 
                         
                      }
                      
                  });
              }
             // utility.getFriendsOnLogin();

              utility.getFriendsOnLogin();

          }
      });
  });
  FB.Event.subscribe("auth.logout", function(response) {
    return console.log("auth.logout event");
  });
  FB.Event.subscribe("auth.sessionChange", function(response) {
    return console.log("auth.sessionChange event");
  });
  FB.Event.subscribe("auth.statusChange", function(response) {
    return console.log("auth.statusChange event");
  });
} catch (_error) {}
