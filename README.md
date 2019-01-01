![review](https://xn--z7x.xn--6frz82g/importsubs/review.png)
# YT Subs Importer - [importsubs](https://xn--z7x.xn--6frz82g/importsubs/)
small webapp thing to import youtube subs from one account to another, works by parsing the xml file obtained through youtube. link for that is on the page as well.
## usage
- log into the account you want to export subscriptions from
- get the `subscription_manager` file from [this link](https://www.youtube.com/subscription_manager?action_takeout=1)(same link as on the page itself)
- click the import button, this will ask you what account you want it to import to
- after having allowed the page to manage your youtube click import again
- sit back and enjoy the 100 or so subs that you'll be subbed to before the page runs into youtubes ratelimit
- repeat again after some hours until you have all your subs imported to your new account

## limitations
- as mentioned before, youtube seems to only allow ~100 subs to be imported at once. after that it will take a couple hours before you can subscribe to channels again
- allthough channels you're already subscribed to are ignored, it takes a while for the api to notice
- any errors on subscribing to a channel that are not running into the ratelimit or quota are ignored
- my api quota isn't infinite and might also run out at some point, but it resets daily

## setup for your own instance
if you really dont trust me, its also easy to copy this over to your own instance:
- obtain keys from the google api developers page
- change api keys in auth.js
- throw it on your webserver
