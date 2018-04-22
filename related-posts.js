(function() {
    if (document.querySelector === undefined) {
        return;
    }
    var conf = {},
        postLink, postCategories = [],
        i, links, script;
    imageSize=140;
    conf.maxPostsToFetch = (typeof confRelatedPosts === "object" && confRelatedPosts.maxPostsToFetch) || 100;
    conf.maxPostsToDisplay = (typeof confRelatedPosts === "object" && confRelatedPosts.maxPostsToDisplay) || 5;
    postLink = document.querySelector("link[rel=canonical]").href;
    if (/\x2F\d{4}\x2F\d{2}\x2F/.test(postLink) === false) {
        return;
    }
    for (i = 0, links = document.querySelectorAll("a[rel=tag]"); i < links.length; i++) {
        postCategories.push(decodeURIComponent(links[i].href.split("/").pop()));
    }
    bloggerRelatedPosts_callback = function(data) {
        var relatedPosts = [],
            i, j, k, entries, item, links, categories, clickHandler, div, ul, li, a, span, small;
        for (i = 0, entries = data.feed.entry; i < entries.length; i++) {
            item = {
                title: entries[i].title.$t,
                updated: new Date(entries[i].updated.$t),
                categories: [],
                count: 0
            };
            for (j = 0, links = entries[i].link; j < links.length; j++) {
                if (links[j].rel === "alternate") {
                    item.link = links[j].href;
                    break;
                }
            }
            if (item.link === postLink) {
                continue;
            }
            for (j = 0, categories = entries[i].category; j < categories.length; j++) {
                item.categories.push(categories[j].term);
                for (k = 0; k < postCategories.length; k++) {
                    if (postCategories[k] === categories[j].term) {
                        item.count++;
                        break;
                    }
                }
            }
            if (entries[i].media$thumbnail) {
                item.icon = {
                    src: entries[i].media$thumbnail.url.split(/s72-c/).join("s" + imageSize + "-c"),
                    width: entries[i].media$thumbnail.width,
                    height: entries[i].media$thumbnail.height
                };
            }
            relatedPosts.push(item);
        }
        relatedPosts.sort(function(item1, item2) {
            return (item2.count - item1.count) || (item2.updated - item1.updated);
        });
        relatedPosts = relatedPosts.slice(0, conf.maxPostsToDisplay);
        clickHandler = function() {
            if (typeof ga === "function") {
                var link = this;
                ga("send", {
                    hitType: "event",
                    eventCategory: "Blogger Related Posts",
                    eventAction: "Related Post Clicked",
                    eventLabel: link.href,
                    hitCallback: function() {
                        location.href = link.href;
                    }
                });
                return false;
            }
        };
        div = document.createElement("div");
        div.id = "b-related-posts";
        div.innerHTML = "<h4>Tal vez te guste:</h4>";
        ul = document.createElement("ul");
        for (i = 0; i < relatedPosts.length; i++) {
            li = document.createElement("li");
            a = document.createElement("a");
            a.href = relatedPosts[i].link;
            a.title = relatedPosts[i].count + " common " + (relatedPosts[i].count === 1 ? "category" : "categories");
            a.onclick = clickHandler;
            span = document.createElement("span");
            if (relatedPosts[i].icon) {
                span.setAttribute("style", "background: url(" + relatedPosts[i].icon.src + ") no-repeat center center;");
            }
            a.appendChild(span);
            //a.appendChild(document.createTextNode(relatedPosts[i].title));
            div2 = document.createElement("div");
            div2.className = "title";
            div2.innerHTML = relatedPosts[i].title;
            a.appendChild(div2);
            small = document.createElement("div");
            small.className = "label";
            small.appendChild(document.createTextNode(relatedPosts[i].categories.join(", ")));
            li.appendChild(a);
            li.appendChild(small);
            ul.appendChild(li);
        }
        div.appendChild(ul);
        document.querySelector(".post").appendChild(div);
    };
    script = document.createElement("script");
    script.src = "/feeds/posts/summary?alt=json&callback=bloggerRelatedPosts_callback&max-results=" + conf.maxPostsToFetch + "&q=" + encodeURIComponent('label:"' + postCategories.join('" | label:"') + '"');
    document.querySelector("head").appendChild(script);
})();
