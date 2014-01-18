validate = (function() {
  var email_regex;

  email_regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;

  function validate(name) {
    var el, _ref1;
    this.name = name;
    validate.prototype.isValid = true;
    validate.prototype.errorMsg = "";
    validate.prototype.formValues = {};
    el = document.getElementById((_ref1 = this.name) != null ? _ref1 : document);
    validate.prototype.isRequired(el);
    validate.prototype.isEmail(el);
    validate.prototype.checkbox(el);
    if (!validate.prototype.isValid) 
    {
       $.makePopup(validate.prototype.errorMsg).popup("open"); 
        delete validate.prototype.formValues;
    } else 
    {
      validate.prototype.input(el);
    }
    delete validate.prototype.errorMsg;
    return validate.prototype.isValid;
  }

  validate.prototype.setErrorMsg = function(el) {
    var _ref1;
    validate.prototype.isValid = false;
    validate.prototype.errorMsg += (_ref1 = el.getAttribute("data-error")) != null ? _ref1 : config.prototype.errorMSG.c1001;
    validate.prototype.errorMsg += '<br>';
    return false;
  };

  validate.prototype.isRequired = function(elm) {
    var el, elems, _i, _len;
    if ((elems = elm.getElementsByClassName("require")).length > 0) {
      for (_i = 0, _len = elems.length; _i < _len; _i++) {
        el = elems[_i];
        if (!el.value.trim()) 
        {
          validate.prototype.setErrorMsg(el);
        }
        validate.prototype.formValues[el.getAttribute("name")] = el.value;
      }
    }
    return false;
  };

  validate.prototype.isEmail = function(elm) {
    var el, elems, _i, _len;
    if ((elems = elm.getElementsByClassName("vemail")).length > 0) {
      for (_i = 0, _len = elems.length; _i < _len; _i++) {
        el = elems[_i];
        if (!email_regex.test(el.value.trim())) 
        {
          validate.prototype.setErrorMsg(el);
        }
        validate.prototype.formValues[el.getAttribute("name")] = el.value;
      }
    }
    return false;
  };

  validate.prototype.input = function(elm) {
    var el, elems, _i, _len;
    if ((elems = elm.getElementsByClassName("input")).length > 0) {
      for (_i = 0, _len = elems.length; _i < _len; _i++) 
      {
        el = elems[_i];
        validate.prototype.formValues[el.getAttribute("name")] = el.value;
      }
    }
    return false;
  };

  validate.prototype.checkbox = function(elm) {
    var el, elems, _i, _len;
    if ((elems = elm.getElementsByClassName("rcheckbox")).length > 0) {
      for (_i = 0, _len = elems.length; _i < _len; _i++) {
        el = elems[_i];        
        if (!el.checked) {
          validate.prototype.setErrorMsg(el);
        }
      }
    }
    return false;
  };

  return validate;

})();