var url = "https://script.google.com/macros/s/AKfycbzMw1LYHcus0X2ThDsfynxOPuiJOJFrmqNGDOT3K5ufo4HhC7S2FUzn5ZuN2EPXJpyA/exec";
(function ($) {
  "use strict";
  $.ajaxSetup({
    crossDomain: true,
    type: "GET",
    dataType: "jsonp",
  });
  /*==================================================================
  [ Focus input ]*/


  /*==================================================================
  [ Validate ]*/
  // Bind to the submit event of our form
  $(document).on('click', "#load", function (event) {
    event.preventDefault();
    $(".btn-loading").show();
    $(".search-form-btn").hide();
    var input = $("#searchbox").val();
    $.ajax({
      url: url + "?type=user&name=" + input,
    });

    return false;
  });

  $(document).on('click', "#diebutton", function (event) {
    event.preventDefault();
    $(".btn-loading").show();
    $(".search-form-btn").hide();
    if (confirm("Did you actually die?")) {
      var input = getCookie('id');
      $.ajax({
        url: url + "?type=died&id=" + input,
      });
    }
    else {
      $(".btn-loading").hide();
      $(".search-form-btn").show();
    }

    return false;
  });


})(jQuery);

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (const i of ca) {
    var c = i;
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function user(response) {
  if (response.status == 200) {
    setCookie('id', response.message, 5);
    window.location.href = "kill.html";
  }
}

function kill(response) {
  if (response.status == 200) {
    if (response.message == "GAME OVER") {
      $('#info').html("Game Over");
      $(".btn-loading").hide();
      $(".search-form-btn").hide();
    }
    else {
      $('#target').html(response.message);
    }
  }
}

function died(response) {
  if (response.status == 200) {
    $('#info').html("Game Over");
    $(".btn-loading").hide();
      $(".search-form-btn").hide();
  }
}

function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};
  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');
    for (var i = 0; i < arr.length; i++) {
      var a = arr[i].split('=');
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
      if (paramName.match(/\[(\d+)?\]$/)) {
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];
        if (paramName.match(/\[\d+\]$/)) {
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          obj[key].push(paramValue);
        }
      } else {
        if (!obj[paramName]) {
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }
  }
  return obj;
}

