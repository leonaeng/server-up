var oldIpsZindex=ips.ui.zIndex;ips.ui.zIndex=function(){return oldIpsZindex()+2e4},ips.controller.mixin("attachmentAddDownloadTag","core.front.core.lightboxedImages",!0,(function(){this.before("_initializeAttachments",(function(){this.scope.find("[data-fileid]").not((function(i,n){return!(n=$(n)).is("a")})).each((function(){$(this).attr("download","")}))}))}));