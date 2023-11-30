

(function($) {

	"use strict";

	// Init Metronal
	var metronal = {};

	// Init Main Content
	metronal.mainContent = {
		list: ["#home","#step1","#step2","#step3","#step4","#step5","#step6","#step7","#about", "#resume", "#portfolio", "#contact"],
		on: "",
		off: ""
	};



	// Replace Viewport Height
	// Solves the issue about the viewport height on mobile devices as when the page loads
	metronal.replaceVHeight = function() {
		$('html').css({
			'height': $(window).height()
		});
	};
	
	
		
	





	// Dynamic Page
	metronal.dynamicPage = function(event, target) {
		if(!event) {
			if(!target) {
				$('#home').addClass('active');
				metronal.mainContent.on = metronal.mainContent.off = "#home";
			} else {
				if(metronal.mainContent.list.includes(target)) {
					$(target).addClass('active');
					metronal.mainContent.on = metronal.mainContent.off = target;
				} else {
					$('#home').addClass('active');
					metronal.mainContent.on = metronal.mainContent.off = "#home";
				}
			}
		} else {
			var currentTarget = event.currentTarget;
			var prevMainContentOff = metronal.mainContent.off, 
				targetOff = metronal.mainContent.on,
				targetOn;
			if(currentTarget.className === "menu-link" || currentTarget.className === "close-menu-link" || currentTarget.id === "contact-button") {
				if(metronal.mainContent.list.includes(target)) {
					targetOn = target;
				} else {
					return;
				}
			} else {
				return;
			}

			if(targetOn !== targetOff) {
				$(prevMainContentOff).removeClass("scaleDownCenter");
				$(targetOff).removeClass("scaleUpCenter active");
				$(targetOff).addClass("scaleDownCenter");
				$(targetOn).addClass("scaleUpCenter active");

				metronal.mainContent.off = targetOff;
				metronal.mainContent.on = targetOn;
			}
		}
	};


	// Window On Resize
	$(window).on('resize', function() {
		metronal.replaceVHeight();
	});

	// Device Orientation Changes
	window.addEventListener("orientationchange", function () {
		metronal.replaceVHeight();
    }, false);

    // Menu Link On Click
	$(".menu-link").on("click", function(e) {
		metronal.dynamicPage(e, $(this)[0].hash);
	});

	// Close Menu Link On Click
	$(".close-menu-link").on("click", function(e) {
		metronal.dynamicPage(e, $(this)[0].hash);
	});

	// Contact Button On Click
	$("#contact-button").on("click", function(e) {
		metronal.dynamicPage(e, $(this)[0].hash);
	});

	// Prevent Default 'a[href=""]' click
	$('a[href="#"]').on('click', function (e) {
        e.preventDefault();
    });



	// Document Ready
	$(document).ready(function() {
		metronal.dynamicPage(undefined, window.location.hash),
		metronal.replaceVHeight();





		var idleTime = 0;
		var idleTimeout = 180; // seconds before screensaver starts
		var videoContainer = $('#video-container');
		 var wrapper = $('#wrapper');
		const $screensaverVideo =  $('#screensaver-video'); 
		const screensaverVideo = $screensaverVideo.get(0);
	
	
		// Function to hide video
		function hideVideo() {
			videoContainer.hide();
				wrapper.show();
			screensaverVideo.pause();
			screensaverVideo.currentTime = 0;
		}
	
		// Function to show video
		function showVideo() {
					wrapper.hide();
			videoContainer.show();
			screensaverVideo.play();
		}
	
		// Hide video on click or touch
		videoContainer.on('click touchstart', function() {
			hideVideo();
		});
	
		// Function to check for inactivity and show video after a timeout
	function checkActivity() {
			var userIsActive = false;
	
			$(document).on('click', function() {
				userIsActive = true;
			});
	
			setInterval(function() {
				if (!userIsActive) {
					idleTime++;
					if (idleTime >= idleTimeout * 1000 / 100) { // Check if idle for idleTimeout seconds
						showVideo();
					}
				} else {
					idleTime = 0;
					userIsActive = false;
				}
			}, 100); // Check every 100 milliseconds for activity
		}
		checkActivity();
	
	
	
	
	
	
	
	
	






	});

})(jQuery);