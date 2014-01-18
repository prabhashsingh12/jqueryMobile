$(window).load(function() {

    $.mobile.defaultPageTransition = 'slide';
    //$.mobile.transitionFallbacks.slideout = "none"
    datepick.prototype.getallYears();
    datepick.prototype.populate();

});


$(document).ready(function() {
    $('.button').on("touchstart", function(e){ $(this).addClass("hover"); });
    $('.button').on("touchend", function(e){ $(this).removeClass("hover"); });
    
    $( "#current" ).keyup(function(event) {
       //event.preventDefault();
       //console.log( "Handler for .keyupcalled."+event );
       $('input[data-type="search"]').val($("#current").val());
       $('input[data-type="search"]').attr('data-lastval',$("#current").val());
       $('input[data-type="search"]').focus();
       $('#current').focus();
    });
  
    $('#edit-profile-page').css('overflow','scroll');

    $(".okButton").click(function() {
       
        var iddiv = $(this).closest('div');
        var idofdiv = iddiv.attr('id');
        $('#' + idofdiv).popup("close");
        
    });



    var faminputcnt = 1;
    var preinputcnt = 1;

    $('#cloudimg').css('height', screen.width / 3.5);




    $("#ilab").on('click', function() {
       $.makePopup(config.prototype.globalmsg.condition).popup("open");
    });
    
    $("#clab").on('click', function() {
      $.makePopup(config.prototype.globalmsg.integrity).popup("open");
    });

  
    $("#ilabfacebook").on('click', function() {
        $.makePopup(config.prototype.globalmsg.condition).popup("open");
    });

    
    $('label[for="condition"]').click(function(e) {
        e.stopPropagation()
    });

    $("#clabfacebook").on('click', function() {
        $.makePopup(config.prototype.globalmsg.integrity).popup("open");
    });
    
    $('label[for="condition"]').click(function(e) {
        e.stopPropagation()
    });

   
    
    $('#iagreetandccancel').click(function(){
        
        location.href='#home'
    });
    
    $("#forgotpwd").click(function() {
        utility.changePage('forgotpasswordpage');
    });
    $('.taggeddream').click(function(){
        location.href='#whodreamtofmepage';
    });
    //ViewProfile Page

    $(".btn_view_profile").click(function() {
        utility.viewProfile("viewprofile");
        faminputcnt=1;
        preinputcnt=1;
        utility.clearpreviousandfamilyinput();
        $('.brk').remove();
    });
    
    //Log Out Functionality
    $(".logout").click(function() {
        window.localStorage.setItem("loggedin", false);
        window.localStorage.setItem("id", "");
        utility.clearpreviousandfamilyinput();
        
        if (window.localStorage.getItem("loggedin") == 'false') {
            location.href = '#home';
            
            
        }
        else {
            //TODO Delete after testing
            alert("Unable to clear Local Storage. ");
        }
    });

    $(".btn_view_profile").click(function() {
        location.href = '#viewprofile';
        $('input[type="text"]').val("");
        $('input[type="password"]').val("");
        $('input[type="email"]').val("");
        if ($('input[type="checkbox"]').is(":checked"))
        {
            $('input[type="checkbox"]').trigger('click')
        }
    });


    $(".btn_dream_post").on('click', function() {


        location.href = '#logdream';
    });
    $("#mydream").click(function() {
        // database.localdbselect();
    });


    $('.backbutton').click(function() {
         var active_page = $.mobile.activePage.attr("id");
        if(active_page='login')
        {
            location.href='#home';
            $('input[type="text"]').val("");
            $('input[type="password"]').val("");
            $('input[type="email"]').val("");
    
            if ($('input[type="checkbox"]').is(":checked"))
            {
                $('input[type="checkbox"]').trigger('click')
            }
        }
        else if(active_page='register')
        {
            
            location.href='#home';
            $('input[type="text"]').val("");
            $('input[type="password"]').val("");
            $('input[type="email"]').val("");
    
            if ($('input[type="checkbox"]').is(":checked"))
            {
                $('input[type="checkbox"]').trigger('click')
            }
        }
        
    });
    
    $("#close").click(function(){
        $('#friendslistdiv')[0].style.display = 'none';
        $('#rest')[0].style.display = 'block';
    });
    $("#cross").click(function(){
        $('#createfriendnode')[0].style.display = 'none';
        $('#rest')[0].style.display = 'block';
    });
    $("#connect").click(function() {
        $('#connect_name')[0].value = $('#searchstring')[0].value;
        $('#friendslistdiv')[0].style.display = 'none';
        $('#createfriendnode')[0].style.display = 'block';
    });

    $("#createfriend").click(function() {
        $('#createfriendnode')[0].style.display = 'none';
        validate("createfriendnode");
        utility.createAndConnectUser(JSON.stringify(validate.prototype.formValues));
        $('#rest')[0].style.display = 'block';
    });

    $("#dream_post").click(function() {
        validate("logdream");
        utility.logDream(JSON.stringify(validate.prototype.formValues));
    });

    $('#btn_register').click(function() {
        location.href = '#register'
    });
    
    // show password checkbox click event
    $("#checkbox").click(function(e) {
        $('#password')[0].type = e.target.checked ? "text" : "password";
    });

    // start searching on keyup
    $("#searchstring").on('keyup', function() {
        var searchtext=$("#searchstring")[0].value;
        if (searchtext.length == '1') {
           database.localdbselect(searchtext); //Need to fire Local DB select Command Only Once
           utility.addRemoteFriends(searchtext);
        }
        else {
            $('#rest')[0].style.display = 'none';
            $('#createfriendnode')[0].style.display = 'none';
            ul=$('#users');
             if(ul!=null){
                  var children=ul.children();
                  $.each(children,function(i,child){
                      var childtext=child.innerText.split(",")[0].toLowerCase().trim();
                      if(childtext.search(searchtext.toLowerCase()) == '0'){
                          child.style.display='block';
                      }
                      else {
                          child.style.display='none';
                      }
                  });
                  
              }
              }
       $('#friendslistdiv')[0].style.display = 'block';
    });
    
    // select search user form user list
    $("#users").on('click', "li", function(event) {
        var name = event.currentTarget.innerText.split(",")[0];
        var id = event.currentTarget.id;
        $("#searchstring")[0].value = name;
        $("#connectinguid")[0].value = id;
        $("#me")[0].value = config.prototype.me;
        $('#friendslistdiv')[0].style.display = 'none';
        $('#rest')[0].style.display = 'block';
    });

    // back button
    document.addEventListener("backbutton", function(button) {
        if ($.mobile.activePage.attr('id') == 'viewprofile') {
            navigator.app.exitApp();
        }
        else if ($.mobile.activePage.attr('id') == 'edit-profile-page')
        {
            location.href = '#viewprofile';
        }
        else if ($.mobile.activePage.attr('id') == 'register')
        {
            location.href = '#home';
            $('#signup_name').val('');
            $('#signup_email').val('');
            $('#signup_password').val('');
        }
        else if ($.mobile.activePage.attr('id') == 'login')
        {
            location.href = '#home';
            $('#id').val('');
            $('#password').val('');
        }
        else
        {
            $.mobile.back();
        }
    }, false);

    $('#plusfamily').on("tap", function() {

        if (faminputcnt < 5)
        {
            
            $('.incrinputfamily').append('<input type="text" name="family' + faminputcnt + '" class="input"/>');
            $('#edit-profile-page').trigger('create');
            faminputcnt = faminputcnt + 1;
            
        }

    })
    $('#plusprevious').on("tap", function() {

        if (preinputcnt < 5)
        {
            $('.incrinput').append('<input type="text" name="previous' + preinputcnt + '" class="input"/>');
            $('#edit-profile-page').trigger('create');
            preinputcnt = preinputcnt + 1;
        }
    })

   $("#verifybtn").click(function() {
        $('#verifydialog').popup('close');
        setTimeout(function() {
            location.href = '#login';
        }, 500);
    });
    
    $('#edituserimg').click(function() {

        $('#takemypicturepopup').popup('open');
    });
    

    // edit button click action
    $('#edit').click(function() {
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
             $('.incrinputfamily').append('<input type="text" name="family' + faminputcnt + '" class="input" value='+str[i]+'>');
             $('#edit-profile-page').trigger('create');
             faminputcnt=faminputcnt+1;
             }
        }
         for(var j=1;j<str1.length;j++)
        {
            if (preinputcnt < 5)
            {
               
            $('.incrinput').append('<input type="text" name="previous' + preinputcnt + '" class="input"value='+str1[j]+' >');
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
       
        location.href = '#edit-profile-page';
    })

})



var datepick;

datepick = (function() {
    var d, m, x;

    function datepick() {
    }

    datepick.prototype.populate = function() {
        var x = document.getElementById("yr");

        var m = document.getElementById("mt");

        var d = document.getElementById("dy");
        var ds=d.value;
        var daysInMonth, i, timeA, timeB, timeDifference;
        timeA = new Date(x.options[x.selectedIndex].text, m.options[m.selectedIndex].value, 1);
        timeDifference = timeA - 86400000;
        timeB = new Date(timeDifference);
        daysInMonth = timeB.getDate();
        //alert(daysInMonth)
        i = 0;
        while (i < d.length) {
            d.options[0] = null;
            i++;
        }
        i = 0;
        while (i < daysInMonth) {
            d.options[i] = new Option(i + 1);
            i++;
        }
       // return d.options[0].selected = true;
       if(ds>daysInMonth)
        {
          
           var d = document.getElementById("dy");  
           return d.value=daysInMonth
        }
        else
        {
           
         var d = document.getElementById("dy");
         return d.value=ds
        }
    };

    datepick.prototype.getallYears = function() {
        var x = document.getElementById("yr");
        var dt, i, j, lstdt, option, _results;
        dt = new Date();
        lstdt = dt.getFullYear();
        i = lstdt;
        j = lstdt;
        while (j >= 1900) {
            x.remove(0);
            j--;
        }
        _results = [];
        while (i >= 1900) {
            option = document.createElement("option");
            option.text = i;
            option.value = i;
            x.add(option, null);
            _results.push(i--);
        }
        return _results;
    };



    return datepick;

})();

//window.onLoad = datepick.prototype.getallYears();
var capturePhoto, capturePhotoEdit, destinationType, getPhoto, getPicturefromlibs, onFail, onPhotoDataSuccess, onPhotoURISuccess, pictureSource, uploadPhoto;

pictureSource = "";

destinationType = "";

getPicturefromlibs = function() {
    pictureSource = navigator.camera.PictureSourceType;
    return destinationType = navigator.camera.DestinationType;
};

onPhotoDataSuccess = function(imageData) {

  var smallImage;
  smallImage = document.getElementById("edituserimg");
  smallImage.style.display = "block";
  //alert(imageData);
  return smallImage.src = "data:image/jpeg;base64," + imageData;
};

onPhotoURISuccess = function(imageURI) {
 // alert(imageURI);
  uploadPhoto(imageURI);
  return document.getElementById('cropbtn').click();
};

capturePhoto = function() {
    $('#takemypicturepopup').popup('close');
    navigator.camera.getPicture(uploadPhoto, onFail, {
        quality: 100,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.CAMERA,
        targetWidth: 600,
        targetHeight: 600,
        correctOrientation: true
    });
    return document.getElementById('cropbtn').click();
};

capturePhotoEdit = function() {
    $('#takemypicturepopup').popup('close');
    navigator.camera.getPicture(onPhotoDataSuccess, {
        quality: 100,
        destinationType: destinationType.DATA_URL,
        targetWidth: 600,
        targetHeight: 600,
        correctOrientation: true
    });
    return document.getElementById('cropbtn').click();
};

getPhoto = function() {
    $('#takemypicturepopup').popup('close');
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 100,
        destinationType: destinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600,
        correctOrientation: true
    });
    return document.getElementById('cropbtn').click();
};

onFail = function(message) {
    return alert("Failed because: " + message);
};

uploadPhoto = function(imageURI) {
    //document.getElementById('cropmyimage').style.display = 'block';
    // document.getElementById('cropmyimage').style.zIndex = 100;
    //document.getElementById('takemypicturepopup').style.display = 'none';

    location.href = '#croppage';
    localStorage.setItem('uri', imageURI);
    cropimg();
    return console.log('image url is-------------' + imageURI);
};

document.addEventListener("deviceready", getPicturefromlibs, false);


var Selection, canvas, cropimg, ctx, drawScene, getResults, iMouseX, iMouseY, image, theSelection;

canvas = "";

ctx = "";

image = "";

iMouseX = "";

iMouseY = 1;

theSelection = "";

Selection = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.px = x;
    this.py = y;
    this.csize = 6;
    this.csizeh = 10;
    this.bHow = [false, false, false, false];
    this.iCSize = [this.csize, this.csize, this.csize, this.csize];
    this.bDrag = [false, false, false, false];
    return this.bDragAll = false;
};

drawScene = function() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    return theSelection.draw();
};

// crop image
cropimg = function() {
    image = new Image();
    image.src = localStorage.getItem('uri');
    canvas = document.getElementById('panel');
    return image.onload = function() {
        canvas.height = image.height;
        canvas.width = image.width;
        ctx = canvas.getContext("2d");
        theSelection = new Selection(10, 10, 200, 200);
        document.getElementById("panel").addEventListener("touchmove", function(e) {
            var i, iFH, iFW, iFX, iFY;
            iMouseX = Math.floor(e.touches[0].pageX - this.offsetLeft);
            iMouseY = Math.floor(e.touches[0].pageY - this.offsetTop);
            if (theSelection.bDragAll) {
                theSelection.x = iMouseX - theSelection.px;
                theSelection.y = iMouseY - theSelection.py;
            }
            i = 0;
            while (i < 4) {
                theSelection.bHow[i] = false;
                theSelection.iCSize[i] = theSelection.csize;
                i++;
            }
            if (iMouseX > theSelection.x - theSelection.csizeh && iMouseX < theSelection.x + theSelection.csizeh && iMouseY > theSelection.y - theSelection.csizeh && iMouseY < theSelection.y + theSelection.csizeh) {
                theSelection.bHow[0] = true;
                theSelection.iCSize[0] = theSelection.csizeh;
            }
            if (iMouseX > theSelection.x + theSelection.w - theSelection.csizeh && iMouseX < theSelection.x + theSelection.w + theSelection.csizeh && iMouseY > theSelection.y - theSelection.csizeh && iMouseY < theSelection.y + theSelection.csizeh) {
                theSelection.bHow[1] = true;
                theSelection.iCSize[1] = theSelection.csizeh;
            }
            if (iMouseX > theSelection.x + theSelection.w - theSelection.csizeh && iMouseX < theSelection.x + theSelection.w + theSelection.csizeh && iMouseY > theSelection.y + theSelection.h - theSelection.csizeh && iMouseY < theSelection.y + theSelection.h + theSelection.csizeh) {
                theSelection.bHow[2] = true;
                theSelection.iCSize[2] = theSelection.csizeh;
            }
            if (iMouseX > theSelection.x - theSelection.csizeh && iMouseX < theSelection.x + theSelection.csizeh && iMouseY > theSelection.y + theSelection.h - theSelection.csizeh && iMouseY < theSelection.y + theSelection.h + theSelection.csizeh) {
                theSelection.bHow[3] = true;
                theSelection.iCSize[3] = theSelection.csizeh;
            }
            if (theSelection.bDrag[0]) {
                iFX = iMouseX - theSelection.px;
                iFY = iMouseY - theSelection.py;
                iFW = theSelection.w + theSelection.x - iFX;
                iFH = theSelection.h + theSelection.y - iFY;
            }
            if (theSelection.bDrag[1]) {
                iFX = theSelection.x;
                iFY = iMouseY - theSelection.py;
                iFW = iMouseX - theSelection.px - iFX;
                iFH = theSelection.h + theSelection.y - iFY;
            }
            if (theSelection.bDrag[2]) {
                iFX = theSelection.x;
                iFY = theSelection.y;
                iFW = iMouseX - theSelection.px - iFX;
                iFH = iMouseY - theSelection.py - iFY;
            }
            if (theSelection.bDrag[3]) {
                iFX = iMouseX - theSelection.px;
                iFY = theSelection.y;
                iFW = theSelection.w + theSelection.x - iFX;
                iFH = iMouseY - theSelection.py - iFY;
            }
            if (iFW > theSelection.csizeh * 2 && iFH > theSelection.csizeh * 2) {
                theSelection.w = iFW;
                theSelection.h = iFH;
                theSelection.x = iFX;
                theSelection.y = iFY;
            }
            return drawScene();
        });
        document.getElementById("panel").addEventListener("touchstart", function(e) {
            var i, _results;
            iMouseX = Math.floor(e.touches[0].pageX - this.offsetLeft);
            iMouseY = Math.floor(e.touches[0].pageY - this.offsetTop);
            theSelection.px = iMouseX - theSelection.x;
            theSelection.py = iMouseY - theSelection.y;
            if (theSelection.bHow[0]) {
                theSelection.px = iMouseX - theSelection.x;
                theSelection.py = iMouseY - theSelection.y;
            }
            if (theSelection.bHow[1]) {
                theSelection.px = iMouseX - theSelection.x - theSelection.w;
                theSelection.py = iMouseY - theSelection.y;
            }
            if (theSelection.bHow[2]) {
                theSelection.px = iMouseX - theSelection.x - theSelection.w;
                theSelection.py = iMouseY - theSelection.y - theSelection.h;
            }
            if (theSelection.bHow[3]) {
                theSelection.px = iMouseX - theSelection.x;
                theSelection.py = iMouseY - theSelection.y - theSelection.h;
            }
            if (iMouseX > theSelection.x + theSelection.csizeh && iMouseX < theSelection.x + theSelection.w - theSelection.csizeh && iMouseY > theSelection.y + theSelection.csizeh && iMouseY < theSelection.y + theSelection.h - theSelection.csizeh) {
                theSelection.bDragAll = true;
            }
            i = 0;
            _results = [];
            while (i < 4) {
                if (theSelection.bHow[i]) {
                    theSelection.bDrag[i] = true;
                }
                _results.push(i++);
            }
            return _results;
        });
        document.getElementById("panel").addEventListener("touchend", function(e) {
            var i;
            theSelection.bDragAll = false;
            i = 0;
            while (i < 4) {
                theSelection.bDrag[i] = false;
                i++;
            }
            theSelection.px = 0;
            return theSelection.py = 0;
        });
        return drawScene();
    };
};
// get crop image data
getResults = function() {
    var largeImage, temp_canvas, temp_ctx, vData;
    temp_canvas = document.createElement("canvas");
    temp_ctx = temp_canvas.getContext("2d");
    temp_canvas.width = theSelection.w;
    temp_canvas.height = theSelection.h;
    temp_ctx.drawImage(image, theSelection.x, theSelection.y, theSelection.w, theSelection.h, 0, 0, theSelection.w, theSelection.h);
    vData = temp_canvas.toDataURL();
    largeImage = document.getElementById("edituserimg");
    largeImage.style.display = "block";
    largeImage.style.height = "100px";
    largeImage.style.width = "100px";
    largeImage.src = vData;
    $('#userpic').val(encodeURIComponent(vData));
    //document.getElementById('cropmyimage').style.display = 'none';
    //document.getElementById('cropmyimage').style.zIndex = 0;
    localStorage.setItem('uri', "");
    canvas = document.getElementById('panel');
    ctx = temp_canvas.getContext("2d");
    location.href = '#edit-profile-page';
    return ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
// draw canvas
Selection.prototype.draw = function() {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 5;
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    if (this.w > 0 && this.h > 0) {
        ctx.drawImage(image, this.x, this.y, this.w, this.h, this.x, this.y, this.w, this.h);
    }
    return ctx.fillStyle = "#fff";
};

document.addEventListener("deviceready", function() {
    //navigator.splashscreen.show();
   // setTimeout(function(){navigator.splashscreen.hide();},10000);
    facebook.init();
    if (window.localStorage.getItem("loggedin") == null) {
        window.localStorage.setItem("loggedin", false);
    }
    else if (window.localStorage.getItem("loggedin") == 'true') {
        config.prototype.me = window.localStorage.getItem("id")
        utility.viewProfile("home", "viewprofile");
    }

    // bind offline event
    document.addEventListener("offline", function(event) {
           alert("Please check your network connection");
    }, false);

    // check network connection
    utility.checkNetworkConnection();

}, false);

//Dynamic Pop up and is destroyed on Clicking Ok button
$.extend({
    "makePopup": function (text) {
        var $popup;
        //creat popup element
        $popup = $("<div/>", {
            "id":"dynamic",
            "data-role": "popup",
            "data-theme": "a",
            "data-overlay-theme": "a",
            "data-transition": "pop",
            "data-dismissible":"false"
        }).popup();
        //create close element
        var $close = $("<a/>", {
            "data-role": "button",
                "html": "Ok",
                "href": "#",
                "data-theme": "e"
        }).on("click", function () {
            $(this).closest("[data-role=popup]").popup("close");
            $( "#dynamic" ).remove();
        }).buttonMarkup();

        //create content div - makes a nice jQM page structure.
        var $content = $("<div/>", {
            "data-role": "content",
            //change this any way you want- Im just adding the text from clicked link here.
            "html": "<span>" + text + "</span>"
        });

        //append $close to $content, then append $content to $popup
        $content.append($close).appendTo($popup);
        return $popup;
    }

});
// auto complte feature


$( document ).on( "pageinit", "#edit-profile-page", function() {
			$( "#autocomplete" ).on( "filterablebeforefilter", function ( e, data ) {
                            $('#autocomplete').css('height',"241px");
				var $ul = $( this ),
					$input = $( data.input ),
					value = $input.val(),
					html = "";
				$ul.html( "" );
				if ( value && value.length > 2 ) {
					$ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
					$ul.listview( "refresh" );
                                        var inputdata= $('input[data-type="search"]').val();
					$.ajax({
						url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+inputdata+"&types=%28cities%29&sensor=false&language=en&key=AIzaSyBvRcVKHwLqeL0F6ZRdGiY6iDtG65VItgM",
						dataType: "json",
                                                
						crossDomain: true,
						data: {
							q: $input.val()
						}
					})
					.then( function ( response ) {
                                            
                                                console.log(JSON.stringify(response)); 
                                                var getLength = response.predictions.length;
                                                for(var i=0;i<getLength;i++) 
                                                {
                                                        var x = response.predictions[i].description;
                                                        console.log(x);
                                                       // html += "<li id="+i+" onclick='function(){alert('hi')}' style='height:28px;'>" + x + "</li>";
                                                        
                                                        $('#autocomplete').append('<li id='+i+' onclick="utility.getcity(\''+x+'\')";>'+x+'</li>');
                                                        $('#autocomplete').listview('refresh');
                                                }
                                                $('#citypopup').popup('open');
						
					});
				}
			});
		});     
