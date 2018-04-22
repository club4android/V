function tb_recent_comments(a) {
    var b;
    b = '<ul class="tb_recent_comments">';
    for (var c = 0; c < numComments; c++) {
        var d, e, f, g;
        if (c == a.feed.entry.length) break;
        b += "<li>";
        for (var h = a.feed.entry[c], i = 0; i < h.link.length; i++) "alternate" == h.link[i].rel && (d = 
h.link[i].href);
        for (var j = 0; j < h.author.length; j++) e = h.author[j].name.$t, f = h.author[j].gd$image.src;
        f = f.indexOf("/s1600/") != -1 ? f.replace("/s1600/", "/s" + avatarSize + "-c/") : f.indexOf("/s220/") 
!= -1 ? f.replace("/s220/", "/s" + avatarSize + "-c/") : f.indexOf("/s512-c/") != -1 && 0 != f.indexOf("https:") 
? "https:" + f.replace("/s512-c/", "/s" + avatarSize + "-c/") : f.indexOf("blogblog.com/img/b16-rounded.gif") != 
-1 ? "https://3.bp.blogspot.com/-AaI8-1X32ZM/TxMKLVzQ5BI/AAAAAAAABYY/QYau8ov2blE/s" + avatarSize + 
"/tb_blogger_logo.png" : f.indexOf("blogblog.com/img/openid16-rounded.gif") != -1 ? 
"https://3.bp.blogspot.com/-9lSeVyNRKx0/TxMKMIqMNuI/AAAAAAAABYc/8iasY0xpLzc/s" + avatarSize + 
"/tb_openid_logo.png" : f.indexOf("blogblog.com/img/blank.gif") != -1 ? defaultAvatar.indexOf("gravatar.com") != 
-1 ? defaultAvatar + "&s=" + avatarSize : defaultAvatar : f, 1 == showAvatar && (g = 1 == roundAvatar ? 
"avatarRound" : "", b += '<div class="avatarImage ' + g + '"><img class="' + g + '" src="' + f + '" alt="' + e + 
'" width="' + avatarSize + '" height="' + avatarSize + '"/></div>'), b += '<a href="' + d + '">' + e + "</a>";
        var k = h.content.$t,
            l = k.replace(/(<([^>]+)>)/gi, "");
        "" != l && l.length > characters ? (l = l.substring(0, characters), l += "&hellip;", 1 == showMorelink 
&& (l += '<a href="' + d + '">' + moreLinktext + "</a>")) : l = l, b += "<span>" + l + "</span>", b += "</li>"
    }
    b += "</ul>";
    var m = "";
    1 == hideCredits && (m = "display:none;"), document.write(b)
}
var numComments = numComments || 5,
    avatarSize = avatarSize || 60,
    characters = characters || 40,
    defaultAvatar = defaultAvatar || "https://www.gravatar.com/avatar/?d=mm",
    moreLinktext = moreLinktext || " More &raquo;",
    showAvatar = "undefined" == typeof showAvatar || showAvatar,
    showMorelink = "undefined" != typeof showMorelink && showMorelink,
    roundAvatar = "undefined" == typeof roundAvatar || roundAvatar,
    hideCredits = "undefined" != typeof hideCredits && roundAvatar;
