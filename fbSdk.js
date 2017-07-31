function isGenderAllowed(allowedGender) {
    return getRadioButtonSelected() === 'all' || getRadioButtonSelected() === allowedGender;
}


function statusChangeCallback(response) {
    console.log('Status changed');
    console.log(response);

    if (response.status === 'connected') {
       loggedIn();
    } else {
        notConnected();
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}


window.fbAsyncInit = function () {
    FB.init({
        appId: '1616846998350030',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.10'
    });
    FB.AppEvents.logPageView();

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function loggedIn() {
    console.log('Logged In');
    FB.api('/me?fields=gender,name', function (response) {
        if(isGenderAllowed(response.gender)) {
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
                'Logged in as: ' + response.name + '!';
        } else {
            FB.logout(function (response) {
                document.getElementById('status').innerHTML =
                    'You are not allowed to enter this site ';
            });
        }

    });
}

function notConnected() {
    document.getElementById('status').innerHTML =
        'Hello, please log in :-) ';
}

function getRadioButtonSelected() {
    var radios = document.getElementsByName('gender');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            console.log('Radio button:' + radios[i].value);
            return radios[i].value;
        }
    }
}

// Used if adding own buttons
function logOut() {
    FB.logout(function (response) {
        console.log('Person logged out');
        notConnected();
    });
}

function login() {
    FB.login(function (response) {

    });
}


