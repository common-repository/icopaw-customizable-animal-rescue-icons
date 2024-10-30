<?php
/* ======================================================================

	Plugin Name: icoPaw: Customizable Animal Rescue Icons
	Plugin URI: http://www.lendingapaw.org/plugins/icopaw-customizable-animal-rescue-icons/
	Description: Adds a button to the editor's toolbar that allows you to easily customize and insert animal rescue icons to your posts/pages.
	Version: 1.0
	Author: Stephanie Chow
	Author URI: http://www.lendingapaw.org
	License: GPLv2 or later
*/
/*
Copyright 2014 Stephanie Chow (email : stephanie@lendingapaw.com)

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

icoPaw: Customizable Animal Rescue Icons uses the Shuffle.js plugin v2.1.1 http://vestride.github.io/Shuffle/ By @Vestride.
*/
	
/* ====================================================================== */

/* =============================================================
	INCLUDE WP BUILT IN SCRIPTS
* ============================================================= */	
//load stylesheet that styles glyphs
wp_enqueue_style( 'prefix-style', plugins_url('css/icoPaw.css', __FILE__) );
//set variable to later use to import wp jquery into iframes
add_action( 'admin_enqueue_scripts', 'load_theWpThemeUrl' ); 
function load_theWpThemeUrl() {
echo'<script type = "text/javascript">var theWpThemeUrl = "'. includes_url( 'js/jquery/jquery.js' ).'";</script>';
}?>
<?php
//load icon stylesheet into wp-editor 
function my_theme_add_editor_styles() {
    add_editor_style( plugins_url('css/icoPaw.css', __FILE__));
}
add_action( 'init', 'my_theme_add_editor_styles' );
// Hooks your functions into the correct filters
function my_add_mce_button() {
	// check user permissions
	if ( !current_user_can( 'edit_posts' ) && !current_user_can( 'edit_pages' ) ) {
		return;
	}
	// check if WYSIWYG is enabled
	if ( 'true' == get_user_option( 'rich_editing' ) ) {
		add_filter( 'mce_external_plugins', 'my_add_tinymce_plugin' );
		add_filter( 'mce_buttons', 'my_register_mce_button' );
	}
}
add_action('admin_head', 'my_add_mce_button');
// Declare script for new button
function my_add_tinymce_plugin( $plugin_array ) {
	$plugin_array['my_mce_button'] = plugins_url('/js/loadpage.js', __FILE__ );
	return $plugin_array;
}
// Add in styles (currently for button)
function my_shortcodes_mce_css() {
	wp_enqueue_style('symple_shortcodes-tc', plugins_url('/css/my-mce-style.css', __FILE__) );
}
add_action( 'admin_enqueue_scripts', 'my_shortcodes_mce_css' );

// Register new button in the editor
function my_register_mce_button( $buttons ) {
	array_push( $buttons, 'my_mce_button' );
	return $buttons;
}
