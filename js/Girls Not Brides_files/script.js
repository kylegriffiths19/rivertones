 //**********
// MODERNIZR

// load css3 media queires polyfill if the browser doesn't support it
Modernizr.load({
	test : Modernizr.mq('only all'),
	yep  : '',
	nope : template_directory + '/assets/js/libs/respond.min.js'
});

$(document).ready(function() {


	 //***********
	// IE WARNING

	// only fire on less than IE9, change false to true to test in other browsers
	if ( $('html').hasClass('lt-ie9') && false ) {

		$.fancybox.open({
			padding		: 0,
			width		: 610,
			minHeight	: 300,
			height		: 300,
			href		: template_directory + '/ie.html',
			type		: 'iframe',
			closeBtn	: false,
			beforeShow	: function() {
				$('.fancybox-inner').after('<div class="mini-profile-lightbox-controls"><a href="#" class="close-fancybox"><span class="ss-icon ss-standard">&#x2421;</span></a></div>');
			}
		});

	}


	//***********
	// NAVIGATION

	$('.mobile-top-nav .buttons a').on('click', function(event) {

		var $target	= $('.drop-down > div.' + $(this).data('affects')),
			visible	= $target.is(':visible');

		$('.drop-down > div').slideUp();

		if ( ! visible ) {
			$('.drop-down > div.' + $(this).data('affects')).slideDown();
		}

	});

	$('.has-children span').on('click', function(event) {

		event.preventDefault();

		$(this).closest('li').find('ul').slideToggle(function(){
			if ($(window).width() <= 767 ) {
				if ( ! $(this).is(':visible')) {
					$(this).parent('li.has-children').find('span').text('+');
				} else {
					$(this).parent('li.has-children').find('span').text('-');
				}
			}
		});

	});

	$('.has-children > a').on('click', function(event) {

		event.stopPropagation();

	});

	$('.has-children > ul').on('click', function(event) {
		event.stopPropagation();
	});

	$(window).on('resize', function() {

		$('.has-children > ul').slideUp();

	});


	 //**********
	// WORLD MAP

	if ( $('.world-map').length ) {

		var country_colours	= $('.world-map-container').data('country-colours'),
			country_data	= $('.world-map-container').data('country-data');

		if ( typeof country_colours === "undefined" || country_colours === null ) {
			var country_colours = {};
		}

		$('.world-map').vectorMap({
			map				: 'world_mill_en',
			color			: '#ddd8c6',
			hoverColor		: '#24a0bb',
			hoverOpacity	: 0.9,
			colors			: country_colours,
			onRegionOver	: false,
			backgroundColor	: false
		});

		// keep a boolean value to prevent hovering on the world map from highlighting countries
		// this is important because a loop builds up whereby multiple countries highlight

		var prevent_map_hover = false;

		$('.country-list')
			.on('mouseover', 'li', function() {

				prevent_map_hover = true;

				var countries = $(this).data('country-code').split('|');

				for ( var i = 0; i < countries.length; i++ ) {
					$('#jvectormap1_' + countries[i]).trigger('mouseover');
				}

				$('.jvectormap-label').hide(); // prevent the tooltip from displaying

			})
			.on('mouseout', 'li', function() {

				prevent_map_hover = false;

				var countries = $(this).data('country-code').split('|');

				for ( var i = 0; i < countries.length; i++ ) {
					$('#jvectormap1_' + countries[i]).trigger('mouseout');
				}

			});

		$('.world-map').on('mouseover mouseout', 'path', function(event) {

			if ( prevent_map_hover ) {
				return;
			}

			var $self	= $(this),
				id		= $self.attr('id'),
				code	= id.replace('jvectormap1_', '');

			$('li[data-country-code*="' + code + '"]').toggleClass('hover', ( event.type === "mouseover" ) );

		});

		// only bind this event if we've got country data to play with
		if ( typeof country_data !== "undefined" && country_data !== null ) {

			$('.world-map').on('click', 'path', function(event) {

				// ATTN: we also need to do this for the normal click events

				var $self	= $(this),
					id		= $self.attr('id'),
					code	= id.replace('jvectormap1_', '');

				if ( typeof country_data[code] !== undefined ) {

					// should we display the mini-profile, or throw the user over to the normal link?
					if ( country_data[code].mini_profile == true ) {
						country_mini_profile(country_data[code].permalink);
					} else {
						window.location.href = country_data[code].permalink;
					}

				}

			});

		}

	}


	 //**********************
	// COUNTRY MINI PROFILES

	$('.country-list').on('click', 'a', function(event) {

		var $self	= $(this),
			$li		= $self.closest('li');

		// only if this country has a mini profile...
		if ( $li.data('mini-profile') === true ) {

			// ... should we prevent the default link action
			event.preventDefault();

			country_mini_profile($self.attr('href'));

		}

	});

	$('body').on('click', 'a.close-fancybox', function(event) {

		event.preventDefault();

		$.fancybox.close();

	});


	 //*********
	// TOOLTIPS

	$('.theme-list a').tooltip();


	 //*************
	// DISCUSS TABS

	$('.nav-tabs').on('click', 'a', function(event) {

		event.preventDefault();

		var $self	= $(this),
			$tabs	= $self.closest('.nav-tabs');

		$tabs.find('li').removeClass('active');

		$self.closest('li').addClass('active');

		$tabs.siblings('.tab').hide();

		$tabs.siblings('.' + $self.data('tab-class')).show();

	});

	$('.nav-tabs .active a').trigger('click');


	 //********************
	// REGION COUNTRY LIST

	var region_xhr = null;

	$('.region-list').on('click', 'a', function(event) {

		event.preventDefault();

		var $self				= $(this),
			$list				= $self.closest('ul'),
			$li					= $self.closest('li'),
			$region_container	= $('.region-container');

		// remove all previous acive classes
		$list.find('li').removeClass('active');

		// then add the new one
		$li.addClass('active');

		// abort the xhr if it exists
		if ( region_xhr !== null ) {
			region_xhr.abort();
		}

		$region_container.spinner();

		region_xhr = $.ajax({
			url: template_directory + '/ajax/region-country-list.php?id=' + $self.closest('li').data('region-id'),
			success: function(data) {

				$region_container
					.spinner('hide')
					.html(data);

			}
		});

	});


	 //************
	// DONUT CHARTS

	$('.donut-chart')
		.donutchart()
		.donutchart("animate");


	 //****************
	// MEMBERS CONTENT

	$('.members-wrapper .country-filter').on('change', function() {

		var $self = $(this);

		if ( $self.val() !== '' ) {

			$('.filtered-label').html('(Filtered by country)');

			$('.members-list li').hide();
			$('.members-list li.country-id-' + $self.val()).show();

		} else {

			$('.filtered-label').html('');
			$('.members-list li').show();

		}

		// always reset the scrollbar
		$('.members-list').closest('.box-scrollbar').tinyscrollbar();

	});

	$('.members-wrapper .theme-list').on('click', 'a', function(event) {

		event.preventDefault();

		var $self		= $(this),
			active		= $self.hasClass('active'),
			theme_id	= $self.data('id');

		// remove the active class from all themes
		$('.members-wrapper .theme-list a').removeClass('active');

		// also reset the country select element
		$('.members-wrapper .country-filter').val('');

		// if this link wasn't currently active
		if ( ! active ) {

			// ... figure out which members need to be hidden or shown
			$('.members-list li').hide();
			$('.members-list li.theme-id-' + $self.data('id')).show(); // .slideFadeIn(); // show

			$('.filtered-label').html('(Filtered by theme)');

			$self.addClass('active');

		} else {

			$('.filtered-label').html('');
			$('.members-list li').show();

		}

		// always reset the scrollbar
		$('.members-list').closest('.box-scrollbar').tinyscrollbar();

	});


	 //************
	// THEME WHEEL

	$('.the-wheel').on('mouseenter', 'a', function(){

		$('.dial')
			.addClass('hover')
			.css('transform', 'rotate(' + ($(this).index() * 60) + 'deg)');
	});

	$('.the-wheel').on('mouseleave', 'a', function(){
		$('.dial').removeClass('hover');
	});


	 //********
	// FITVIDS

	$(".content-styles").fitVids();


	 //**********
	// TWEETABLE

	$('.list-tweets').tweetable(
		{
			username	: 'GirlsNotBrides',
			limit		: 3,
			replies		: true
		}
	);

	$('.recent-tweet').tweetable(
		{
			username	: 'GirlsNotBrides',
			limit		: 1,
			replies		: true
		}
	);


	 //***********
	// NEWSLETTER

	$('.subscribe-link').on('click', function(event) {

		event.preventDefault();

		$(this).closest('header, footer').find('.subscribe-container').slideToggle();

	});


	 //***************
	// SPINNER PLUGIN

	$.fn.spinner = function(action) {

		return this.each(function(){

			if ( typeof action === "undefined" || action === null ) {
				action = 'init';
			}

			var $self		= $($(this).first()),
				$spinner	= $('.spinner'),
				position	= $self.offset();

			switch (action) {

				case 'hide':

					$spinner.animate({opacity: 0}, 100, function() {
						$spinner.hide();
					});

					break;

				case 'init':

					$spinner
						.css('left', position.left + 'px')
						.css('top', position.top + 'px')
						.css('height', $self.outerHeight() + 'px')
						.css('width', $self.outerWidth() + 'px')
						.show()
						.animate({opacity: 1}, 100);

					break;

			}

		});

	};

	 //*****************
	// CONTENT CLEANUPS

	$('h2 b').contents().unwrap();

});

$(window).load(function() {

	$('.carousel').each(function() {

		var $carousel = $(this),
			$carriage = $carousel.find('.carriage');

		// make the height of the carousel the same as the carriage
		$carousel.css('height', $carriage.height());

		// then add the initiated class, this makes the carriage absolute
		$carousel.addClass('carousel-initiated');

		// find the first single slide and add the active class
		$carousel.find('.slide-single').first().addClass('carousel-active');

		// finally bind the prev / next button events
		$carousel.on('click', '.prev, .next', function(event) {

			event.preventDefault();

			var $self		= $(this),
				$current	= $('.carousel-active'),
				$target		= null;

			if ( $self.hasClass('prev') ) {

				$target = $current.prevAll('.slide-single').first();

			} else {

				$target = $current.nextAll('.slide-single').first();

			}

			// if we have a valie target to scroll to
			if ( $target.length ) {

				// remove the current active class
				$carousel.find('.carousel-active').removeClass('carousel-active');

				// put it on the target
				$target.addClass('carousel-active');

				var position = $target.position();

				// and scroll to that element
				$carriage.css('left', '-' + position.left + 'px'); // $targetscrollTo( $target, 800 );

			}

		});

	});


	 //***************
	// BOX SCROLLBARS

	var $box_scrollbar = $('.box-scrollbar');

	if ( $box_scrollbar.length ) {

		$box_scrollbar.each(function() {

			var $self = $(this);

			// add a load of HTML in... lord know why this wasn't done in the plugin
			$self.html('<div class="viewport"><div class="overview">' + $self.html() + '</div></div>');
			$self.prepend('<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>');

			// set the .viewport element height, no way we'd want top do this in CSS
			$self.find('.viewport').css('height', $self.height());

			// initialise the scrollbar plugin
			$self.tinyscrollbar();

		}).tinyscrollbar_update();

	}

	
	 //*************
	// MEMBERS LIST

	var members_xhr = null;

	$('.members-list').on('click', 'a', function(event) {

		event.preventDefault();

		var $self				= $(this),
			$parent				= $self.closest('li'),
			$featured_member	= $('.featured-member');

		if ( $parent.hasClass('active') ) {
			return;
		}

		// remove all existing li.active states
		$('.members-list li').removeClass('active');

		// but add it back to this current one
		$parent.addClass('active');

		// abort the xhr if it exists
		if ( members_xhr !== null ) {
			members_xhr.abort();
		}

		$featured_member.spinner();

		members_xhr = $.ajax({
			url: template_directory + '/ajax/members-featured-member.php?id=' + $parent.data('id'),
			success: function(data) {

				$featured_member
					.spinner('hide')
					.html(data);

			}
		});

	});

});

function country_mini_profile(link) {

	$.fancybox.open(
		{
			padding		: 0,
			width		: 610,
			minHeight	: 525,
			href		: link + '?ajax=',
			type		: 'iframe',
			closeBtn	: false,
			beforeShow	: function() {
				$('.fancybox-inner').after('<div class="mini-profile-lightbox-controls"><a href="#" class="close-fancybox"><span class="ss-icon ss-standard">&#x2421;</span></a></div>');
			}
		}
	);

}


 //*********************
// SELECT DROPDOWN LIST

$('.switcher').on('change', function () {

	if ($(this).val() !==0) {

			var url = $(this).val(); // get selected value

			if ($(this).find(':selected').data('mini-profile') === false) { //Check to see if it's a mini-profile
				//This is a normal profile
				window.location = url; // redirect

			} else {
				//This is a Mini Profile
				window.location = '/where-does-it-happen/';
			}
	}
});

function is_mobile() {
	return ( $(window).width() < 320 );
}

function is_tablet() {
	return ( $(window).width() > 320 && $(window).width() < 890 );
}

function is_desktop() {
	return ( $(window).width() > 890 );
}

 //*******************
// ACCORDION HEADINGS

$('.accordion-collapsable').hide();

$(".accordion-item h2")
	.on('click', function(){
		var $self = $(this);

		if ( ! $self.siblings('.accordion-collapsable').is(":visible") ) {

			$self.closest('.accordion-container').find(".accordion-collapsable").slideUp("slow");
			$self.siblings('.accordion-collapsable').slideDown("slow");

		}
	})
	.first().trigger('click');



// FILTER dropdown
 
$(document).ready(function() {
		$('li.dropdown').removeClass('hover');
			$('li.dropdown').hover(function(){
			$(this).addClass('hover');	
		},function(){
			$(this).removeClass('hover');	
		})
	});


//FILTER results builder

$(document).ready(function(){
	

$('.small-list li a').click(function(e){
		e.preventDefault();
		var parameter = $(this).text();
		var label = 
		$('.filter-results').add('<span class="label">' + label + ': </span>');//.append('<span class="property">' + year + '</span>');
	})




	/*$('.small-list.org li a').click(function(e){
		e.preventDefault();
		var organisation = $(this).text();
		$('.filter-results .results').append('<span class="label">Organisation: </span>').append('<span class="property">' + organisation + '</span>');
	})
	$('.small-list.country li a').click(function(e){
		e.preventDefault();
		var country = $(this).text();
		$('.filter-results .results').append('<span class="label">Country: </span>').append('<span class="property">' + country + '</span>');
	})
	$('.small-list.region li a').click(function(e){
		e.preventDefault();
		var region = $(this).text();
		$('.filter-results .results').append('<span class="label">Year: </span>').append('<span class="property">' + year + '</span>');
	})
	$('.small-list.theme li a').click(function(e){
		e.preventDefault();
		var theme = $(this).text();
		$('.filter-results .results').append('<span class="label">Year: </span>').append('<span class="property">' + year + '</span>');
		
	})
	$('.small-list.type li a').click(function(e){
		e.preventDefault();
		var type = $(this).text();
		$('.filter-results .results').append('<span class="label">Year: </span>').append('<span class="property">' + year + '</span>');
	})
	$('.small-list.language li a').click(function(e){
		e.preventDefault();
		var language = $(this).text();
		$('.filter-results .results').append('<span class="label">Year: </span>').append('<span class="property">' + year + '</span>');
	})

 	
 	$('.filter-results .clear').append('<a href=""><span class="ss-icon ss-standard">&#xF073;</span>Clear filters</a>');
 	$('.filter-results .clear').click(function(){
 		$('.filter-results').detach();
 	});*/
 	


})