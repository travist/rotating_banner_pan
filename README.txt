This plugin was built to be used with the http://drupal.org/project/rotating_banner module in Drupal.  It basically adds a panning feature where the image pans for the rotating banner.

See http://www.anniesdesigns.com for an example.

To use, please do the following.

1.)  Install Drupal 7.
2.)  Install the Rotating Banner Module.
3.)  Add the following JavaScript file to your templates js folder.
4.)  Now within the block that you are adding to the page, place the following code.

<?php
print '<script type="text/javascript">
for( var bannerId in Drupal.settings.rotatingBanners ) {
  Drupal.settings.rotatingBanners[bannerId].cycle.before = function() {
    onRotatingBanner();
  }
}</script>';
drupal_add_js( drupal_get_path('theme', 'mytemplate') . '/js/jquery.panorer.js' );
?>

You should then see the banners pan....
