var merset, orgset;
(function () {
  let count = '';
  function getContent(fragmentId, callback) {
    $.get(fragmentId + '.html', function (content) {
      callback(content);
    })
  }
  function setActiveLink(fragmentId) {
    $('.nav a').each(function (i, linkElement) {
      var link = $(linkElement);
      var pageName = link.attr('href').substr(1);
      if (pageName === fragmentId) {
        var $parent = link.parent();
        $parent.addClass('active');
      } else {
        var $parent = link.parent();
        $parent.removeClass('active');
      }
    })
  }

  function navigate() {
    let fragmentId = location.hash.substr(1);
    if (fragmentId === count) {
      return;
    }
    count = fragmentId;
    getContent(fragmentId, function (content) {
      $('#contentMain').html(content);
    })
    setActiveLink(fragmentId);

  }

  if (!location.hash) {
    var user = localStorage.getItem('user');
    if (user == 'SUPER_ADMIN') {
      location.hash = '#dashboard';
    } else if (user == 'ORGANIZATIONAL_ADMIN') {
      $.ajax
        ({
          type: "GET",
          url: urlForAll + "approved/isSetting/done/" + localStorage.getItem('userID'),
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
          },
          success: function (data) {
            if (data.data == true) {
              a = '#dashboardOrg';
              orgset = 1;
              $('#settings').hide();
              $('#alreadySet').show();
            }
            else {
              orgset = 0;
              $('#alreadySet').hide();
              $('#settings').show();
              a = '#settingsOrg';
              //productType();
            }
            location.hash = a;
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
          }
        });
    } else if (user == 'MANAGER') {
      location.hash = '#dashboardMan';
    } else if (user == 'MERCHANT') {
      $.ajax
        ({
          type: "GET",
          url: urlForAll + "approved/isSetting/done/" + localStorage.getItem('userID'),
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
          },
          success: function (data) {
            if (data.data == true) {
              a = '#selection';
              merset = 1;
              $('#settingsMer').hide();
              $('#alreadySetMer').show();
            }
            else {
              merset = 0;
              $('#alreadySetMer').hide();
              $('#settingsMer').show();
              a = '#settingsMer';
            }
            location.hash = a;
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
          }
        });
    }
  }

  navigate();

  $(window).bind('hashchange', navigate);
})()
