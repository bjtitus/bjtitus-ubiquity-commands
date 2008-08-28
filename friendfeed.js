var doc =  Application.activeWindow.activeTab.document;	
var pageUrl = doc.location.href;

CmdUtils.CreateCommand({
	name: "friendfeed",
	icon: "http://beta.friendfeed.com/favicon.ico",
	locale: "en-US",
	homepage: "http://bjtitus.net",
	author: {name: "Brandon Titus", email: "bjtitus+ubff@gmail.com"},
	license: "MPL",
	takes: {status: noun_arb_text},
	preview: function(previewBlock, inputObject) {
		var statusText = inputObject.text;
		
		var previewTemplate = "Post to FriendFeed: <br />" +
			"<b>${status}</b><br /><br />";
		var previewData = {
			status: statusText
		};
			
		var previewHTML = CmdUtils.renderTemplate(
													previewTemplate,
													previewData
													);
		
		
		previewBlock.innerHTML = previewHTML;
	},
	execute: function(inputObject) {
		var statusText = inputObject.text;
		
		if(statusText.length < 1) {
			displayMessage("FriendFeed requires a post to be entered");
			return;
		}
		
		var updateUrl = "http://friendfeed.com/api/share";
		
		var updateParams = {
					title: statusText
					};
		
		jQuery.ajax({
			type: "POST",
            url: updateUrl,
			data: updateParams,
			dataType: "json",
			error: function() {
				displayMessage("FriendFeed error - not posted");
			},
			success: function() {
				displayMessage("Posted to FriendFeed");
			}
		});
	}
});

CmdUtils.CreateCommand({
	name: "friendfeed-this",
	icon: "http://beta.friendfeed.com/favicon.ico",
	locale: "en-US",
	homepage: "http://bjtitus.net",
	author: {name: "Brandon Titus", email: "bjtitus+ubff@gmail.com"},
	license: "MPL",
	takes: {status: noun_arb_text},
	preview: function(previewBlock, inputObject) {
		var statusText = inputObject.text;
		
		var previewTemplate = "Post to FriendFeed: <br />" +
			"<b>${status}</b><br /><br />";
		var previewData = {
			status: statusText
		};
			
		var previewHTML = CmdUtils.renderTemplate(
													previewTemplate,
													previewData
													);
		
		
		previewBlock.innerHTML = previewHTML;
	},
	execute: function(inputObject) {
		var statusText = inputObject.text;
		
		if(statusText.length < 1) {
			displayMessage("FriendFeed requires a post to be entered");
			return;
		}
		
		var updateUrl = "http://friendfeed.com/api/share";
		
		var updateParams = {
					title: statusText,
					link: pageUrl
					};
		
		jQuery.ajax({
			type: "POST",
            url: updateUrl,
			data: updateParams,
			dataType: "json",
			error: function(error) {
				displayMessage("FriendFeed error - not posted");
			},
			success: function() {
				displayMessage("Posted to FriendFeed");
			}
		});
	}
});

CmdUtils.CreateCommand({
  name: "friendfeed-search",
  takes: {search: noun_arb_text},
  icon: "http://beta.friendfeed.com/favicon.ico",
  preview: function(pblock, directObject) {
    ffsearch = jQuery.trim(directObject.text);
    if(ffsearch.length < 1) {
      pblock.innerHTML = "Searches FriendFeed";
      return;
    } 

    var previewTemplate = "Search FriendFeed for: <b>${query}</b>";
    var previewData = {query: ffsearch};
    pblock.innerHTML = CmdUtils.renderTemplate(previewTemplate, previewData);

  },
  execute: function(directObject) {
    var url = "http://beta.friendfeed.com/search?q={QUERY}"
    var query = directObject.text;
    var urlString = url.replace("{QUERY}", query);
    Utils.openUrlInBrowser(urlString);
  }
});
