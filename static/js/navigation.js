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
