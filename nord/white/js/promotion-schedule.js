!function(){"use strict";($=jQuery)((function(){let t=Intl.DateTimeFormat().resolvedOptions().timeZone,a=$(".promotion-tiles");$(".promotion-container").length&&$(".promotion-container").each((function(){let a=$(this),n=$(this).data("product_id"),e=$(this).data("cta_link");$.get(ps_vars.admin_ajax,{action:"get_promotion",id:n,type:$(this).data("type"),offset:t,cta_link:e},(function(t){var o,i;if("promotion_invalid"===t)a.remove();else if($(t).appendTo(a),a.addClass("active"),$("body").addClass("active-scheduled-promotion promotion-active"),$('a[data-id="'+n+'"]').length&&$('a[data-id="'+n+'"]').attr("href",e),a.find(".ps-container.full").length&&(r=(t=$("#customfield1").val().split("."))[0].split("-"),t=t[1].split("-"),a.find(".ps-cta-container a").attr("data-pagetype",t[1]),a.find(".ps-cta-container a").attr("data-productcategory",r[1])),a.find("a.ps-cta").length){(a.next("a.table-cta").length||a.prev("a.table-cta").length)&&(a.find("a.ps-cta").addClass("table-cta"),a.parents(".ranking").addClass("promotion-active"));let n="";0<a.parent().find("a.btn:not(.ps-cta):not(.phone)").length?(n=a.parent().find("a.btn:not(.ps-cta):not(.phone)"),a.insertAfter(n)):a.prev("a.table-cta").length?n=a.prev("a.table-cta"):a.next("a.table-cta").length?n=a.next("a.table-cta"):a.prev("a.btn:not(.phone)").length?n=a.prev("a.btn:not(.phone)"):a.next("a.btn:not(.phone)").length?n=a.next("a.btn:not(.phone)"):a.parent("td.cta").find("p").length?(n=a.parent("td.cta").find("p a"),a.parent("td.cta").find("p").remove()):a.prev("a.view-btn").length?n=a.prev("a.view-btn"):a.next("a.view-btn").length?n=a.next("a.view-btn"):a.prev("a.product-cta").length?n=a.prev("a.product-cta"):a.next("a.product-cta").length&&(n=a.next("a.product-cta"));t=n.data();var r=(o=a.find("a.ps-cta"),i=t,Object.keys(i).forEach((function(t){var a="data-"+t.replace(/[A-Z]/g,(function(t){return"-"+t.toLowerCase()}));o.attr(a,i[t])})),n.remove(),a.find("a.ps-cta")),p=n.attr("href"),c=new URLSearchParams,d=n.attr("data-ringpoolid"),l=n.attr("data-dnis"),s=n.attr("data-phone");(t=new URL(p)).search="",p=t.toString(),r.on("mouseenter touchstart",(function(){null!=d&&c.set("ringpool",d),null!=s&&c.set("phone",s),null!=l&&c.set("dnis",l);var t=c.toString();$(this).attr("href",p+"?"+t)})).on("mouseleave touchend",(function(){$(this).attr("href",p)}))}}),"html")})),a.length&&"null"!==a.attr("data-cats")&&$.get(ps_vars.admin_ajax,{action:"get_promotion_tiles",cats:a.attr("data-cats"),offset:t},(function(t){""!==t&&($("body").addClass("promotion-tiles-active promotion-active"),a.find("#promotion-tiles-products").html($(t).fadeIn()),$(".promotion-tiles-title").fadeIn())}))}))}(jQuery);