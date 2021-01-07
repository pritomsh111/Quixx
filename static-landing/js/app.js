(function () {
    let count = '';
    let partialsCache = {};
    let activeNav = document.querySelectorAll(".Quixx__Login__Signup a.fragment");
    function getContent(fragmentId, callback) {

        if (partialsCache[fragmentId]) {
            callback(partialsCache[fragmentId]);
        }
        else {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    partialsCache[fragmentId] = this.responseText;
                    callback(this.responseText);
                }
            };
            xhttp.open("GET", fragmentId + ".html", true);
            xhttp.send();
        }
    }
    function setActiveLink(fragmentId) {
        activeNav.forEach(item => {
            if (item.classList.contains("dropdown")) {
                return;
            }
            else if (item.href.split("#")[1] === fragmentId) {
                item.classList.add("active");
            }
            else {
                item.classList.remove("active");
            }
        });
    }
    function navigate() {
        let fragmentId = location.hash.substr(1);
        if (fragmentId === count) {
            return;
        }
        count = fragmentId;
        getContent(fragmentId, function (content) {
            $('#app').html(content);
        });
        setActiveLink(fragmentId);
    }
    if (!location.hash) {
        location.hash = "#home";
    }
    navigate();
    window.addEventListener("hashchange", navigate);
}());