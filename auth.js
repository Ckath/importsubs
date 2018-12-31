let GoogleAuth;
let SCOPE = 'https://www.googleapis.com/auth/youtube';

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    let discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

    gapi.client.init({
        'apiKey': 'AIzaSyAqFvr43dhAZHzwQp-Rb2j11qDnfEXSXjQ',
        'discoveryDocs': [discoveryUrl],
        'clientId': '732876537938-455vcg0jff9emve2rbh8e3hhl6srprpf.apps.googleusercontent.com',
        'scope': SCOPE
    }).then(function() {
        GoogleAuth = gapi.auth2.getAuthInstance();
        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        let user = GoogleAuth.currentUser.get();
        setSigninStatus();

        $('#revoke-access-button').click(function() {
            revokeAccess();
        });

    });
}

function checkIfSignedIn(){
  return GoogleAuth.isSignedIn.get();
}

function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
        GoogleAuth.signOut();
    } else {
        GoogleAuth.signIn();
    }
}

function revokeAccess() {
    GoogleAuth.disconnect();
}

function setSigninStatus(isSignedIn) {
    let user = GoogleAuth.currentUser.get();
    let isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
        $('#sign-in-or-out-button').html('Sign out');
        $('#revoke-access-button').css('display', 'inline-block');
        $('#auth-status').html('You are currently signed in and have granted ' +
            'access to this app.');
        $('#add-subscription').html('Add Subscription')
    } else {
        $('#add-subscription').html('error')
        $('#sign-in-or-out-button').html('Sign In/Authorize');
        $('#revoke-access-button').css('display', 'none');
        $('#auth-status').html('You have not authorized this app or you are ' +
            'signed out.');
    }
}

function updateSigninStatus(isSignedIn) {
    setSigninStatus();
}
