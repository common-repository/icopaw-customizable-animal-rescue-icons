(function() {
	tinymce.PluginManager.add('my_mce_button', function( editor, url ) {
		editor.addButton( 'my_mce_button', {
			icon: 'icoPaw_toolbar_icon',
			type: 'menubutton',
			menu: [
				{
					 text: 'Insert Icon',
					 plugin_url : url,
					 onclick: function() {		
						editor.windowManager.open({
    						title: "Insert Icon",
    						url: url + '/../insert_icon.html',
    						width: 900,
    						height: 550
						});
					}	
						
				},
				{
					text: 'Edit Selected Icon',
					plugin_url : url,
					 onclick: function() {		
						editor.windowManager.open({
    						title: "Edit Selected Icon",
    						url: url + '/../edit_delete_selected_icon.html',
    						width: 700,
    						height: 500
						});
					}	
					
				}
			]
		});
	});
})();