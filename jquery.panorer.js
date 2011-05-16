var bannerIndex = 0;
var bannerImages = null;
var numBannerImages = 0;
var bannerPan = [];
var bannerDir = true;

function animateBannerImage(bannerIndex, up) {
  bannerDir = up;
  if( bannerImages ) {
    bannerImages.eq(bannerIndex).css({
      marginTop:(up ? "0px" : "-" + bannerPan[bannerIndex].panY + "px"),
      marginLeft:(up ? "0px" : "-" + bannerPan[bannerIndex].panX + "px")
    }).animate({
      marginTop:(up ? "-" + bannerPan[bannerIndex].panY + "px" : "0px"),
      marginLeft:(up ? "-" + bannerPan[bannerIndex].panX + "px" : "0px")
    }, 8000, 'linear');
  }
}

function onRotatingBanner() {
  if( bannerPan.length > 0 ) {
    bannerIndex = (++bannerIndex % numBannerImages);
    animateBannerImage(bannerIndex, !bannerDir);
  }
}

jQuery( function() {
  bannerImages = jQuery(".rb-slide img");
  numBannerImages = bannerImages.length;
  var loading = 0;
  for( var i=0; i < numBannerImages; i++ ) {
    loading |= 1<<i;
  }

  function panImages() {
    var display = jQuery(".rb-slides");
    var displayWidth = display.width();
    var displayHeight = display.height();
    bannerImages.each(function() {
      var panX = this.width - displayWidth;
      panX = (panX > 0) ? panX : 0;
      var panY = this.height - displayHeight;
      panY = (panY > 0) ? panY : 0;
      bannerPan.push({panX:panX,panY:panY});
    });
    animateBannerImage(bannerIndex, bannerDir);
  }

  function onImageLoaded(i) {
    loading &= ~(1<<i);
    if( !loading ) {
      panImages();
    }
  }

  // Iterate through our images.
  bannerImages.each( function(i) {
    jQuery(this).bind('load', function() {
      onImageLoaded(i);
    });
  }).each( function(i) {
    if (this.complete || this.complete === undefined){
      onImageLoaded(i);
    }
  });
});