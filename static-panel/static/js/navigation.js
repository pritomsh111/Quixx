(function () {
  //console.log("navigationFIle");
  let count = '';
  function getContent(fragmentId, callback) {
    //console.log("getContent-Baire");
    $.get(fragmentId + '.html', function (content) {
      //console.log("getContent-Bhitore");
      callback(content);
    })
  }
  function setActiveLink(fragmentId) {
    //console.log("ActiveLink");
    $('.nav a').each(function (i, linkElement) {
      var link = $(linkElement)

      var pageName = link.attr('href').substr(1)
      if (pageName === fragmentId) {
        var $parent = link.parent()
        // link.addClass("active");
        $parent.addClass('active')
      } else {
        var $parent = link.parent()
        $parent.removeClass('active')
      }
    })
  }

  function navigate() {
    let fragmentId = location.hash.substr(1);
    if (fragmentId === count) {
      return;
    }
    count = fragmentId;
    //console.log("Navigate");
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
      //console.log("SettingsORG");
      location.hash = '#settingsOrg';
    } else if (user == 'MANAGER') {
      location.hash = '#dashboardMan';
    } else if (user == 'MERCHANT') {
      location.hash = '#settingsMer';
    }
  }

  navigate();

  $(window).bind('hashchange', navigate);
})()
