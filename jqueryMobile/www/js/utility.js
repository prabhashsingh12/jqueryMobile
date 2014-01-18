/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var utility ={
    
    login : function (frompageid, topageid, data) {
      $.ajax({
            url: config.prototype.url.login,
            data: data,
            timeout: 45000,
            type: "POST"
        }).done(function(event) {

            var res=JSON.parse(event);
            if(res.status){
             
              config.prototype.me = res.id;
             
              $('#ids').val(config.prototype.me);
              window.localStorage.setItem("loggedin", true);
              window.localStorage.setItem("id", res.id);
              utility.fetchData(topageid);
      
              database.createdb();
              utility.getFriendsOnLogin();
              $.mobile.loading('hide');
              $('input[type="text"]').val("");
                $('input[type="password"]').val("");
                $('input[type="email"]').val("");
                if($('input[type="checkbox"]').is(":checked"))
                {
                $('input[type="checkbox"]').trigger('click')
                }

            }
            else {
                $.mobile.loading('hide');
                 $.makePopup(config.prototype.errorMSG[res.error]).popup("open");
            }
        }).fail(function(jqXHR, textStatus) {
            if (textStatus == 'timeout')
            {
                $.mobile.loading('hide');
                $.makePopup(config.prototype.errorMSG.c1002).popup("open");
            }
        })
         
    },
    sendtandc_for_facebook: function(frompageid, topageid, data) {
        var nodeid=data;
        console.log("..................." + config.prototype.url.opentandc_for_facebookurl + data);
        $.ajax({
            url: config.prototype.url.opentandc_for_facebookurl + data,
            timeout: 45000,
            type: "POST"
        }).done(function(event) {
            var res = JSON.parse(event);
            console.log("terms and condition status" + res.status);
            if (res.status)
            {
                console.log("terms and condition status" + res.status);
                $.mobile.loading('hide');
                window.localStorage.setItem("loggedin", true);
                window.localStorage.setItem("id", data);
                utility.viewProfile("home", "viewprofile");
                database.createdb();
            }
            else if (res.status == 'false')
            {
                $.mobile.loading('hide');
                location.href = '#home';
                $.makePopup(config.prototype.errorMSG.c1004).popup("open");
            }
            else
            {
                $.mobile.loading('hide');
                //$('.errormsg').html(config.prototype.errorMSG[res.error]);
                //$('#errordialoglogin').popup('open');
            }
        }).fail(function(jqXHR, textStatus) {
            if (textStatus == 'timeout')
            {
                $.mobile.loading('hide');
                $.makePopup(config.prototype.errorMSG.c1002).popup("open");

            }
        })
    },
    edituserprofile : function (frompageid, topageid, data) {
         //alert($('#ids').val());
        
        var urlencoded=encodeURI(config.prototype.url.updateProfile);

    
        console.log(urlencoded);
        console.log('printing the edit profile data'+data+'printing done');
       
        $.ajax({
            url: urlencoded,
            data: data,
            timeout: 45000,
            type: "POST"
        }).done(function(event) {
            //navigator.notification.activityStop();
            $.mobile.loading('hide');
            console.log(event);
            var res = JSON.parse(event);
            console.log(res);
            console.log(event);
            if (res.status)
            {

              console.log(res);
              //utility.changePage(topageid);
              utility.fetchData(topageid);
                $('input[type="text"]').val("");
                $('input[type="password"]').val("");
                $('input[type="email"]').val("");
                if($('input[type="checkbox"]').is(":checked"))
                {
                $('input[type="checkbox"]').trigger('click')
                }

            }
            else
            {
                // navigator.notification.alert("Please provide valid Data", (function() {}), config.prototype.alertTitle, 'Ok');
                $.mobile.loading('hide');
                $.makePopup(config.prototype.errorMSG[res.error]).popup("open");
            }
        }).fail(function(jqXHR, textStatus) {
            if (textStatus == 'timeout')
            {
                $.mobile.loading('hide');
                $.makePopup(config.prototype.errorMSG.c1002).popup("open");

            }
        })
    },
    registerusers: function(frompageid, topageid, data) {

        $.ajax({
            url: config.prototype.url.register,
            data: data,
            timeout: 45000,
            type: "POST"
        }).done(function(event) {
            $.mobile.loading('hide');
            var res = JSON.parse(event);
            if (res.status)
            {    
              console.log(res);
              
              $('input[type="text"]').val("");
                $('input[type="password"]').val("");
                $('input[type="email"]').val("");
                if($('input[type="checkbox"]').is(":checked"))
                {
                $('input[type="checkbox"]').trigger('click')
                }
              
               $('.verfymsg').html(config.prototype.errorMSG.c1003);
               $('#verifydialog').popup('open');
            }
            else
            {
                // navigator.notification.alert("Please provide valid Data for Registration", (function() {}), config.prototype.alertTitle, 'Ok');
                $.mobile.loading('hide');
                $.makePopup(config.prototype.errorMSG[res.error]).popup("open");
            }
        }).fail(function(jqXHR, textStatus) {
            if (textStatus == 'timeout')
            {

                $.mobile.loading('hide');
                $.makePopup(config.prototype.errorMSG.c1002).popup("open");

            }
        })
    },
    viewProfile: function(topageid) {
            
                $("#viewname")[0].innerHTML = config.prototype.mybasicinfo['name'];
                $("#info")[0].innerHTML =  config.prototype.mybasicinfo['viewprofinfo'];
                $("#userimg")[0].src = config.prototype.mybasicinfo['img'];
                utility.changePage(topageid);
       
    },
    
    fetchData: function(topageid) {
        //alert($('#ids').val());
        $.ajax({
            type: "GET",
            url: config.prototype.url.profile + config.prototype.me
        }).done(function(event) {
            $.mobile.loading('hide');
            var res = JSON.parse(event);
            var userkey = '';
            var str = '';
            var value = '';
            var strs='';
            if (!!res.status) {
                for (var key in res.data)
                {
                    value = res.data[key];
                    strs=value;
                    if(value.indexOf("@!@")>0)
                        strs=value.split("@!@").join(",");
                    str += "<li>" + key + "<span>" + strs + "</span></li>";
                    config.prototype.user[key] = value;
                }
                userkey = "<h3>Basic Information</h3><ul>" + str + "</ul>";
                config.prototype.mybasicinfo['viewprofinfo']=userkey;
                config.prototype.mybasicinfo['id'] = config.prototype.me;
                config.prototype.mybasicinfo['name'] = res.name;
                config.prototype.mybasicinfo['loc'] = res.data.Current;
                config.prototype.mybasicinfo['img'] = res.img;
                
                if(topageid=='viewprofile')
                    utility.viewProfile(topageid);
                else
                    utility.setEditData(topageid);
            }
            
        });
    },
    
    setEditData:function(topageid){
        faminputcnt=1;
        preinputcnt=1;
        utility.clearpreviousandfamilyinput();
        $('.brk').remove(); 
        var name=config.prototype.mybasicinfo['name']
        var userId = config.prototype.me;
        var e_mail = config.prototype.user.Email;
        var faml = config.prototype.user.Family;
        var gen = config.prototype.user.Gender;
        var birth = config.prototype.user.Birthday;
        var cur = config.prototype.user.Current;
        var pre = config.prototype.user.Previous;
        var uimg=config.prototype.mybasicinfo['img'];
        
        var trimfam=$.trim(faml);
        var str=trimfam.split('@!@');
        $('#fam').val(str[0]);
        
        var trimfam1=$.trim(pre);
        var str1=trimfam1.split('@!@');
        $('#prev').val(str1[0]);
        
        
        for(var i=1;i<str.length;i++)
        {
             if (faminputcnt < 5)
             {
             $('.incrinputfamily').append('<input type="text" name="family' + faminputcnt + '" class="input" value='+str[i]+'><br class="brk"/>');
             $('#edit-profile-page').trigger('create');
             faminputcnt=faminputcnt+1;
             }
        }
         for(var j=1;j<str1.length;j++)
        {
            if (preinputcnt < 5)
            {
               
            $('.incrinput').append('<input type="text" name="previous' + preinputcnt + '" class="input"value='+str1[j]+' ><br class="brk"/>');
            $('#edit-profile-page').trigger('create');
            preinputcnt = preinputcnt + 1;
            }
        }
        
        console.log(e_mail + ':' + faml + '::' + gen + ':' + birth + '::' + cur + ':' + pre);
      
            var dt = new Date(birth);
            var mnts = dt.getMonth() + 1;
            var dys = dt.getDate();
            //alert(dys);
            var yrs = dt.getFullYear();
            
            //$('#mt>option[value=' + mnts + ']').attr('selected', 'selected');
           // $('#yr>option[value=' + yrs + ']').attr('selected', 'selected');
            //$('#dy>option[value=' + dys + ']').attr('selected', 'selected');
            
            document.getElementById('dy').value=dys;
            document.getElementById('mt').value=mnts;
            document.getElementById('yr').value=yrs;
       
        if (gen != '')
        {
            if (gen == 'female')
            {

                $('#gender>option[value=female]').attr('selected', 'selected');
            }
            else if (gen == 'male')
            {
                $('#gender>option[value=male]').attr('selected', 'selected');
            }

        }
        $('#edituserimg').attr('src',uimg);
        $('#ids').val(userId);
        //$('#fam').val(faml);
        $('#wname').text(name);
        $('#current').val(cur);
        
         utility.changePage(topageid);
       
    },
    reset: function(frompageid, topageid, data) {
        $.ajax({
            type: "POST",
            url: config.prototype.url.passwd,
            data: data
        }).done(function(event) {
            $.mobile.loading('hide');
            var res = JSON.parse(event);
            if (!!res.status) {
                $.makePopup(config.prototype.errorMSG.c1005).popup("open");
            }
            else {
                $.mobile.loading('hide');
                $.makePopup(config.prototype.errorMSG[res.error]).popup("open");
            }
        });
    },
    getcity:function(x)
    {
        //alert(x);
        $('input[data-type="search"]').val(x);
        $('#current').val(x);
        
        $('#autocomplete').empty();
        $('#autocomplete').css('height',"0px");
    },
    whoDreamtOfMe:function(){
         $.ajax({
            url: config.prototype.url.forMe+config.prototype.me,
            timeout: 45000,
            type: "POST"
        }).done(function(event) {
        
            $.mobile.loading('hide');
            var res = JSON.parse(event);
            
            console.log(res);
        }).fail(function(jqXHR, textStatus) {
            if (textStatus == 'timeout')
            {
               // $.mobile.loading('hide');
               // $.makePopup(config.prototype.errorMSG.c1002).popup("open");
            }
        })
    },
    changePage: function(id, transition) {
        $.mobile.changePage("#" + id, {transition: "slide", reverse: false});
    },
    openPanel: function(idofpanel) {
        $("#" + idofpanel).panel().panel("open");
    },
    validatingLoginField: function(frompageid, topageid) {
        if (validate(frompageid)) {
            $.mobile.loading('show', {
                theme: 'a'
            });
            utility.login(frompageid, topageid, JSON.stringify(validate.prototype.formValues));
        }
    },
    validatingResetPassword: function(frompageid, topageid) {
        if (validate(frompageid)) {
            $.mobile.loading('show', {theme: "a", text: "Reset", textonly: false});
            $("#err_frgtpwd")[0].innerHTML = "";
            utility.reset(frompageid, topageid, JSON.stringify(validate.prototype.formValues));
        }
    },
    validatingRegistartion: function(frompageid, topageid) {
        if (validate(frompageid)) {
            $.mobile.loading('show', {theme: "a", text: "Saving Data on Server", textonly: false});
            utility.registerusers(frompageid, topageid, JSON.stringify(validate.prototype.formValues));
        }
    },
    validatingeditprofile: function(frompageid, topageid) {
        if (validate(frompageid))
        {
            $.mobile.loading('show', {theme: "a", text: "Saving Data on Server", textonly: false});
            utility.edituserprofile(frompageid, topageid, JSON.stringify(validate.prototype.formValues));
        }
    },
    getFriendsOnLogin: function() {
        console.log(config.prototype.me);
        console.log(config.prototype.url.getFriends + config.prototype.me);
        $.ajax({
            type: "GET",
            url: config.prototype.url.getFriends + config.prototype.me
        }).done(function(event) {
            try {
                var res = JSON.parse(event);
                var arr = [];
                console.log(event);
                if (!!res.status) {
                    for (var data in res.result) {
                        var str = '';
                        for (var key in res.result[data]) {
                            str += "'" + res.result[data][key] + "',";
                        }
                        str = str.slice(0, str.length - 1);
                        arr.push(str);
                    }
                    str = 'SELECT ' + arr.join(' UNION SELECT ');
                    console.log(str);
                    database.insertValues(str);
                }
            }
            catch (ex) {
                console.log("Error Occurred");
            }

        });
    },
    clearpreviousandfamilyinput:function(){
       $('input[name="family1"]').remove();
       $('input[name="family2"]').remove();
       $('input[name="family3"]').remove();
       $('input[name="family4"]').remove();
       $('input[name="family5"]').remove();
       
       $('input[name="previous1"]').remove();
       $('input[name="previous2"]').remove();
       $('input[name="previous3"]').remove();
       $('input[name="previous4"]').remove();
       $('input[name="previous5"]').remove();
       $('#edituserimg').attr('src','');
    },
    createAndConnectUser: function(data) {

        $.ajax({
            type: "POST",
            url: config.prototype.url.createUser,
            data: data
        }).done(function(event) {
            $.mobile.loading('hide');
            console.log(event);
            var res = JSON.parse(event);
            if (!!res.status) {
                $("#connectinguid")[0].value = res.id;
                alert("User Created");
            }
            else {

            }
        });
    },
    logDream: function(data) {
        $.ajax({
            type: "POST",
            url: config.prototype.url.logDream,
            data: data
        }).done(function(event) {
            $.mobile.loading('hide');
            console.log(event);
            var res = JSON.parse(event);
            if (!!res.status) {
                alert("Dream Logged");
            }
            else {

            }
        });
    },
    
    addRemoteFriends: function(searchtext) {
        console.log(config.prototype.url.userSearch + config.prototype.me + '/' + searchtext);
        $.ajax({
            type: "GET",
            url: config.prototype.url.userSearch + config.prototype.me + '/' + searchtext
        }).done(function(event) {
            $.mobile.loading('hide');
            var res = JSON.parse(event);
            if (!!res.status) {
                var result=[];
                var str='';
                var arr = res.result;
                for (var i in arr) {
                    var _result = {};
                    for (var key in arr[i]) {
                        _result[key] = arr[i][key];
                    }
                    result.push(_result);
                }
                str=result.map(utility.listring).join(" ");
                $("#users").append(str);
            }

        });

    },
    displayfriend: function() {
        user = config.prototype.searchUsers;
        var string = user.map(utility.listring);
        var searchuser = '';
        if (string !=null && string.length > 0) {
            searchuser = string.join(" ");
            $("#users")[0].innerHTML = searchuser;
        }
        else {
             $("#users")[0].innerHTML = '';
        }

    },
    listring: function(user) {
        return "<li id=" + user.id + "><img src='" + user.img + "'><p>" + user.name + " , " + user.gender + "</p><em>"+user.location+"</em></img></li>";
    },
    checkNetworkConnection: function() {
        if (navigator.connection.type === 'none' || navigator.connection.type === 'unknown') {
            alert("Please check your network connection.");
        }
    }
}

