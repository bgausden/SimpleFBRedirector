/* eslint-env browser */

/* Based on http://christopher5106.github.io/mobile/2015/03/26/web-redirection-to-mobile-web-or-app-with-a-modal-box.html */

var IS_IPAD = navigator.userAgent.match(/iPad/i) != null,
    IS_IPHONE =
        !IS_IPAD &&
        (navigator.userAgent.match(/iPhone/i) != null ||
            navigator.userAgent.match(/iPod/i) != null),
    IS_IOS = IS_IPAD || IS_IPHONE,
    IS_ANDROID = !IS_IOS && navigator.userAgent.match(/android/i) != null;

// eslint-disable-next-line no-unused-vars
function redirect() {
    // If it's not an universal app, use IS_IPAD or IS_IPHONE
    var has_appli = true;
    if (IS_IOS) {
        if (has_appli) {
            window.location = document
                .querySelector("meta[property='al:ios:url']")
                .getAttribute("content");

            setTimeout(function() {
                // If the user is still here, open the App Store
                if (!document.webkitHidden) {
                    window.location =
                        "http://itunes.apple.com/app/id" +
                        document
                            .querySelector(
                                "meta[property='al:ios:app_store_id']"
                            )
                            .getAttribute("content");
                }
            }, 25);
        } else {
            window.location =
                // TODO I'm not bothering to prompt to install the app. Fall back to the webpage here.
                // "http://itunes.apple.com/app/id" +
                //  // $("meta[property='al:ios:app_store_id']").attr("content");
                // document.querySelector("meta['al:ios:app_store_id']").getAttribute("content")
                "http://facebook.com/100000000000";
        }
    } else if (IS_ANDROID) {
        var redirectUrl =
            "intent://" +
            document
                .querySelector("meta[property='al:android:url']")
                .getAttribute("content")
                .split("://")[1] +
            "#Intent;package=" +
            document
                .querySelector("meta[property='al:android:package']")
                .getAttribute("content") +
            ";scheme=" +
            document
                .querySelector("meta[property='al:android:url']")
                .getAttribute("content")
                .split(":/")[0] +
            ";launchFlags=268435456;end;";
        window.location = redirectUrl;
    }
}
