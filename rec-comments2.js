 function showrecentcomments(json) {
     for (var i = 0; i < a_rc; i++) {
         var b_rc = json.feed.entry[i];
         var c_rc;
         if (i == json.feed.entry.length) break;
         for (var k = 0; k < b_rc.link.length; k++) {
             if (b_rc.link[k].rel == 'alternate') {
                 c_rc = b_rc.link[k].href;
                 break;
             }
         }
         c_rc = c_rc.replace("#", "#comment-");
         var d_rc = c_rc.split("#");
         d_rc = d_rc[0];
         var e_rc = d_rc.split("/");
         e_rc = e_rc[5];
         e_rc = e_rc.split(".html");
         e_rc = e_rc[0];
         var f_rc = e_rc.replace(/-/g, " ");
         f_rc = f_rc.link(d_rc);
         var g_rc = b_rc.published.$t;
         var h_rc = g_rc.substring(0, 4);
         var i_rc = g_rc.substring(5, 7);
         var j_rc = g_rc.substring(8, 10);
         var k_rc = new Array();
         k_rc[1] = "Ene";
         k_rc[2] = "Feb";
         k_rc[3] = "Mar";
         k_rc[4] = "Abr";
         k_rc[5] = "May";
         k_rc[6] = "Jun";
         k_rc[7] = "Jul";
         k_rc[8] = "Ago";
         k_rc[9] = "Set";
         k_rc[10] = "Oct";
         k_rc[11] = "Nov";
         k_rc[12] = "Dic";
         if ("content" in b_rc) {
             var l_rc = b_rc.content.$t;
         } else if ("summary" in b_rc) {
             var l_rc = b_rc.summary.$t;
         } else var l_rc = "";
         var re = /<\S[^>]*>/g;
         l_rc = l_rc.replace(re, "");
         if (m_rc == true) document.write('' + k_rc[parseInt(i_rc, 10)] + ' ' + j_rc + ' ');
         document.write('<a href="' + c_rc + '">' + b_rc.author[0].name.$t + '</a>');
         if (n_rc == true) document.write(' en ' + f_rc);
         document.write(' :<br>');
         if (l_rc.length < o_rc) {
             document.write('<b>');
             document.write(l_rc);
             document.write('</b><br/><br/>');
         } else {
             document.write('<i>');
             l_rc = l_rc.substring(0, o_rc);
             var p_rc = l_rc.lastIndexOf(" ");
             l_rc = l_rc.substring(0, p_rc);
             document.write(l_rc + '</i>');
             document.write('<br/><br/>');
         }
     }
     document.write('');
 }
