let txt = "";

$('#import').click(function() {
    let selectedFile = document.getElementById('file').files[0];
    let signedIn = checkIfSignedIn();
    if (signedIn) {
        handleXML(selectedFile);
    } else {
        handleAuthClick();
    }
});

function updateLog(newtxt) {
    txt += newtxt + "<br>";
    $('#display').html(txt);
    window.scrollTo(0, document.querySelector("#display").scrollHeight);
}

function addSubscription(channelSub, channelName) {
    let resource = {
        part: 'id,snippet',
        snippet: {
            resourceId: {
                kind: 'youtube#channel',
                channelId: channelSub
            }
        }
    };

    let request = gapi.client.youtube.subscriptions.insert(resource);
    request.execute(function(response) {
        console.log(response);
        if (response.result) {
            updateLog("subbed to " + channelName);
        } else if (response.code == 400) { // fatal error, authentication error/api limit etc
            updateLog("failed to sub to " + channelName + ": " + response.message);
            alert("error trying to sub to " + channelName + 
                    " (" + channelSub + ")\n" +
                    "most likely youtube's subscription limit, try again in some hours\n" +
                    "page will refresh after clicking ok");
            window.location.reload();
        } else { // non fatal error, channel doesnt exist etc
            updateLog("failed to sub to " + channelName + ": " + response.message);
        }
    });
}

function handleXML(file) {
    $.get(window.URL.createObjectURL(file), function(data) {
        console.log(window.URL.createObjectURL(file));
        let regex = /(UC)[A-Za-z0-9\-_]+/g;
        let x = $(data);
        console.log(x);
        let outline = x.find("outline[xmlUrl]")
        console.log(outline);
        updateLog("trying to import " + outline.length + " subs:");
        $(outline).each(function(i, sub) {
            setTimeout(function() {
                let id = $(sub).attr("xmlUrl") + "";
                let request = gapi.client.youtube.subscriptions.list({'forChannelId': id.match(regex)[0], 'mine': 'true',  'part': 'snippet,contentDetails'});

                request.execute(function(response) {
                    if (response.items.length < 1) {
                         addSubscription(id.match(regex)[0], $(sub).attr("title"));
                    } else {
                        updateLog("already subbed to " + $(sub).attr("title") + ", skipping");
                    }
                });
            }, 100 * i);
        });
    });
}
