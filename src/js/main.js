/// <reference path='../libs/aos/aos.js' />
/// <reference path='../libs/jarallax/jarallax.js' />
/// <reference path='../libs/jarallax/jarallax-element.js' />
/// <reference path='../libs/slick/slick.js' />
/// <reference path='../libs/countTo/jquery.countTo.js' />
/// <reference path='../libs/isotope/isotope.pkgd.js' />
/// <reference path='../libs/fancybox/jquery.fancybox.js' />
/// <reference path='../libs/nice-select/jquery.nice-select.js' />
/// <reference path='../libs/ion.rangeSlider/js/ion.rangeSlider.js' />

(function($) {

	/*-- Strict mode enabled --*/
	'use strict';

	/*-- Global variables --*/
	var nHtmlNode    = document.documentElement,
		nBodyNode    = document.body || document.getElementsByTagName('body')[0],
		nAppNode     = document.getElementById('app'),
		nHeader      = document.getElementById('top-bar'),
		nStartScreen = document.getElementById('start-screen'),
		nHero        = nStartScreen || document.getElementById('hero'),

		jWindow   = $(window),
		jBodyNode = $(nBodyNode),
		jAppNode  = $(nAppNode),
		jHeader   = $(nHeader),
		jHero     = $(nHero),

		iHeaderHeight = 0,
		bNavAnchor    = jHeader.data('nav-anchor'),
		bNavSticky    = jHeader.data('nav-fixed'),
		bMenuOpen     = false,

		animationEnd  = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',

		rAF = window.requestAnimationFrame ||
			  window.mozRequestAnimationFrame ||
			  window.webkitRequestAnimationFrame ||
			  window.msRequestAnimationFrame||
			  function (callback) {
				  setTimeout(callback, 1000 / 60);
			  };

	/* scroll animate
	================================================== */
	AOS.init({
		offset: 120,
		delay: 100,
		duration: 450, // or 200, 250, 300, 350.....
		easing: 'ease-in-out-quad',
		once: true,
		disable: 'mobile'
	});

	var VendiGO = {
		onReady: function ()
		{
			this.jarallax();
			this.slick();
			this.fancybox();
			this.ionRangeSlider();
			this.niceSelect();

			this.header();
			this.startScreenSlider();
			this.sideMenuToggle();
			this.goodsFilterToggle();
			this.isotopeSorting();
			this.accordion();
			this.tabs();
			this.alert();
			this.counters();
			this.quantityCounter();
			this.scrollTo();
			this.scrollTop();
			this.contactForm();
		},
		onLoad: function ()
		{
			this.googleMap();
		},
		jarallax: function ()
		{
			if ( 'function' !== typeof jarallax ) return console.error( "Error: jarallax is not a function. Be sure to include 'jarallax.js'");

			var nJarallax = document.querySelectorAll('.jarallax');

			if ( device.desktop() && nJarallax.length > 0 )
			{
				jarallax(nJarallax, {
					type: 'scroll', // scroll, scale, opacity, scroll-opacity, scale-opacity
					zIndex: -20
				});
			};
		},
		slick: function ()
		{
			if ( !$.fn.slick ) return console.error( "Error: slick is not a function. Be sure to include 'slick.js'");

			var jSlider = $('.js-slick');

			if ( !jSlider.length > 0 ) return;

			jSlider.each(function ( i, slider ) {

				$(slider)
					.on('init', function(event, slick) {
						var slidesLength = slick.$slides.length,
							galleryLinks = slick.$slider.find(".slick-cloned [data-fancybox]");

						if ( galleryLinks.length > 0 )
						{
							galleryLinks
								.removeAttr("data-fancybox")
								.each(function( i, galleryLink ) {
									var $this = $( galleryLink ),
										clonedIndex = parseInt($this.parents('.slick-cloned').attr("data-slick-index")),
										originalIndex = clonedIndex < 0 ? clonedIndex + slidesLength : clonedIndex - slidesLength;

									$this.attr("data-fancybox-target", originalIndex);
								});
						};
					})
					.slick({
						autoplay: true,
						autoplaySpeed: 3000,
						adaptiveHeight: true,
						dots: true,
						arrows: false,
						speed: 800,
						mobileFirst: true,
						slidesToShow: 1,
						slidesToScroll: 1,
						touchThreshold: 15,
						prevArrow: '<i class="fontello-angle-left slick-prev"></i>',
						nextArrow: '<i class="fontello-angle-right slick-next"></i>'
					})
					.on('click', '[data-fancybox-target]', function(e) {
						var $this   = $(this),
							$target = $this.attr("data-fancybox-target"),
							$slides = $this.parents('.slick-track').find('[data-fancybox]');

						$slides
							// .eq( ( $(this).attr("data-fancybox-index") || 0) % $slides.length )
							.eq( $target )
							.trigger("click.fb-start", { $trigger: $(this) });

						return false;
					});
			});
		},
		fancybox: function ()
		{
			if ( !$.fn.fancybox ) return console.error( "Error: fancybox is not a function. Be sure to include 'fancybox.js'");

			var galleryElement = $("[data-fancybox]");

			if ( !galleryElement.length > 0 ) return;

			// https://stackoverflow.com/questions/51589004/jquery-slick-carousel-and-fancybox-conflict
			galleryElement.fancybox({
				parentEl: nAppNode,
				buttons : [
					'slideShow',
					'fullScreen',
					'thumbs',
					'close'
				],
				loop : true,
				protect: true,
				wheel : false,
				transitionEffect : "tube",
				onInit: function ()
				{

				},
				beforeShow: function( instance, current )
				{
					current.opts.$orig.closest(".slick-initialized").slick('slickPause');
				},
				afterShow : function( instance, current )
				{
					current.opts.$orig.closest(".slick-initialized").slick('slickGoTo', parseInt(current.index), false);
				},
				afterClose: function (instance, slide, e)
				{
					slide.opts.$orig.closest(".slick-initialized").slick('slickPlay').trigger('blur');
				}
			});
		},
		ionRangeSlider: function ()
		{
			if ( !$.fn.ionRangeSlider ) return console.error( "Error: ionRangeSlider is not a function. Be sure to include 'ion.rangeSlider.js'");

			var jRangeSlider = $('.js-range-slider');

			if ( !jRangeSlider.length > 0 ) return;

			var min = $('.range-slider-min-value'),
				max = $('.range-slider-max-value');

			jRangeSlider.ionRangeSlider({
				onStart: function (data)
				{
					// fired then range slider is ready
				},
				onChange: function (data)
				{
					// fired on every range slider update

					min.val(data.from);
					max.val(data.to);
				},
				onFinish: function (data)
				{
					// fired on pointer release
				},
				onUpdate: function (data)
				{
					// fired on changing slider with Update method
				}
			});
		},
		niceSelect: function ()
		{
			if ( !$.fn.niceSelect ) return console.error( "Error: niceSelect is not a function. Be sure to include 'nice-select.js'");

			var jSelect = $('.js-select');

			if ( !jSelect.length > 0 ) return;

			jSelect.niceSelect();
		},

		header: function ()
		{
			if ( !nHeader ) return;

			var jMenuLine      = jHeader.children('.top-bar__line-menu'),
				iTop           = jMenuLine.offset().top;

			var nMenu          = document.getElementById('top-bar__navigation'),
				nMenuToggler   = document.getElementById('top-bar__navigation-toggler'),

				jMenu          = $(nMenu),
				jMenuToggler   = $(nMenuToggler),

				jMenuLink      = jMenu.find('li a'),
				jSubmenu       = jMenu.find('.submenu'),
				bHeaderSticky  = false,
				updatePosition = function ()
				{
					if ( (window.pageYOffset || document.documentElement.scrollTop) >= iTop )
					{
						if ( !bHeaderSticky )
						{
							jHeader.addClass('is-sticky')

							bHeaderSticky = !bHeaderSticky;
						};
					}
					else if ( bHeaderSticky )
					{
						jHeader.removeClass('is-sticky');

						bHeaderSticky = !bHeaderSticky;
					};
				},
				hideMobileMenu = function ()
				{
					if ( window.innerWidth > 1199 && bMenuOpen )
					{

						jHeader.removeClass('is-expanded');
						jMenuToggler.removeClass('is-active');
						jSubmenu.removeAttr('style');
						nHtmlNode.style.overflow = '';
						bMenuOpen = false;
					}
				};

			iHeaderHeight = jMenuToggler.is(':visible') ? 65 : 85;

			if ( bNavAnchor )
			{
				jBodyNode.scrollspy({
					target: nHeader,
					offset: iHeaderHeight + 1
				});
			};

			if ( jSubmenu.length > 0 )
			{
				jSubmenu.parent('li').addClass('has-submenu');
			};

			jMenuToggler.on('touchend click', function (e)
			{
				e.preventDefault();

				var $this = $(this);

				if ( bMenuOpen )
				{
					$this.removeClass('is-active');
					jHeader.removeClass('is-expanded');
					nHtmlNode.style.overflow = '';
					bMenuOpen = !bMenuOpen;
				}
				else
				{
					$this.addClass('is-active');
					jHeader.addClass('is-expanded');
					nHtmlNode.style.overflow = 'hidden';
					bMenuOpen = !bMenuOpen;
				};

				return false;
			});

			jMenuLink.on('click', function (e)
			{
				var $this       = $(this),
					$parent     = $this.parent(),
					bHasSubmenu = !!$this.next(jSubmenu).length;

				if ( bMenuOpen && bHasSubmenu )
				{
					if ( $this.next().is(':visible') )
					{
						$parent.removeClass('drop_active');
						$this.next().slideUp('fast');

					} else {

						$this.closest('ul').find('li').removeClass('drop_active');
						$this.closest('ul').find('.submenu').slideUp('fast');
						$parent.addClass('drop_active');
						$this.next().slideDown('fast');
					};

					return false;
				};
			});

			jWindow.on('resize', debounce(hideMobileMenu, 100));

			if ( bNavSticky )
			{
				jWindow.on('scroll', throttle(updatePosition, 100)).scroll();
			};
		},
		startScreenSlider: function ()
		{
			if ( !nStartScreen ) return;

			var StartScreenSlider = $('#start-screen__slider');

			if ( StartScreenSlider.length > 0 )
			{
				var slideCount = $('#start-screen__slider-count');

				StartScreenSlider
					.on('init afterChange', function (event, slick, currentSlide, nextSlide) {
						var i = (currentSlide ? currentSlide : 0) + 1;
						slideCount.text(i + '/' + slick.slideCount);
					})
					.slick({
						autoplay: true,
						autoplaySpeed: 3000,
						adaptiveHeight: true,
						dots: true,
						arrows: false,
						speed: 800,
						mobileFirst: true,
						slidesToShow: 1,
						slidesToScroll: 1,
						touchThreshold: 15,
						prevArrow: '<i class="fontello-angle-left slick-prev"></i>',
						nextArrow: '<i class="fontello-angle-right slick-next"></i>'
					});
			}
		},
		sideMenuToggle: function ()
		{
			var nSideMenu = document.getElementById('side-menu');

			if ( !nSideMenu ) return;

			var isHidden  = true,
				isActive  = false,

				jSideMenu    = $(nSideMenu),
				jBtnToggler  = $('.js-side-menu-toggler');

			jBtnToggler.on('touchend click', function ()
			{
				isActive = !isActive;

				var $this = $(this);

				if ( isActive )
				{
					$this.addClass('is-active');
					jSideMenu.off(transitionEnd);

					if ( isHidden )
					{
						// first click
						jSideMenu.removeClass('d-none').delay(100).queue(function ()
						{
							$(this).addClass('is-active').dequeue();
						});
					}
					else
					{
						jSideMenu.addClass('is-active');
					}

					isHidden = false;
				}
				else
				{
					jSideMenu.removeClass('is-active').one(transitionEnd, function ()
					{
						$this.removeClass('is-active');
					});
				};

				return false;
			});

			jWindow.on('scroll', throttle(function()
			{
				if ( !isActive ) return;

				jSideMenu.removeClass('is-active').one(transitionEnd, function ()
				{
					jBtnToggler.removeClass('is-active');
				});

				isActive = false;

			}, 500));
		},
		goodsFilterToggle: function ()
		{
			var jGoodsFilter = $('.goods-filter');

			if ( !jGoodsFilter.length > 0 ) return;

			var jBtnToggler = $('.js-toggle-filter'),
				isActive    = false;

			jBtnToggler.on('touchend click', function ()
			{
				isActive = !isActive;

				if ( isActive )
				{
					jGoodsFilter.addClass('is-active');
					nHtmlNode.style.overflow = 'hidden';
				}
				else
				{
					jGoodsFilter.removeClass('is-active');
					nHtmlNode.style.overflow = '';
				};

				return false;
			});
		},
		isotopeSorting: function ()
		{
			var jIsotopeSort = $('.js-isotope-sort');

			if ( !jIsotopeSort.length > 0 ) return;

			jIsotopeSort.each(function ( i, sort )
			{
				var $this         = $( sort ),
					jSortLinks    = $this.find('a'),
					jIsoContainer = $("#" + $this.data('target')).children('.js-isotope'),
					fbLink = jIsoContainer.find('[data-fancybox]'),
					fbType = fbLink.attr('data-fancybox');

				jSortLinks.on('click', function(e)
				{
					var currentLink   = $(this),
						currentOption = currentLink.data('cat');

					$this.find('.selected').removeClass('selected');
					currentLink.addClass('selected');

					if (currentOption !== '*') {

						$('.' + currentOption).find('[data-fancybox]').attr('data-fancybox', currentOption);

						currentOption = '.' + currentOption;
					}
					else
					{
						fbLink.attr('data-fancybox', fbType)
					}

					jIsoContainer.isotope({filter : currentOption});

					return false;
				});
			});
		},
		accordion: function ()
		{
			var oAccordion = $('.accordion-container');

			if ( !oAccordion.length > 0 ) return;

			oAccordion.each(function ( i, accordion )
			{
				var $this       = $( accordion ),
					oAccType    = $this.data('type') === 'accordion' ? true : false,
					oAccItem    = $this.find('.accordion-item'),
					oAccTrigger = $this.find('.accordion-toggler');

				oAccItem.eq(0).addClass('active').find('article').show();

				oAccTrigger.on('click', function (j)
				{
					j.preventDefault();

					var $this    = $(this),
						parent   = $this.parent(),
						dropDown = $this.next('article');

					parent.toggleClass('active');

					if (oAccType)
					{
						parent.siblings(oAccItem).removeClass('active').find('article').not(dropDown).slideUp();
					}

					dropDown.stop(false, true).slideToggle();

					return false;
				});
			});
		},
		tabs: function ()
		{
			var oTab = $('.tab-container');

			if ( !oTab.length > 0 ) return;

			var oTabTrigger = oTab.find('.tab-nav__item');

			oTab.each(function ( i , tab )
			{
				$( tab )
					.find('.tab-nav__item:eq(0)').addClass('active').end()
					.find('.tab-content__item:eq(0)').addClass('is-visible');
			});

			oTabTrigger.on('click', function (g)
			{
				g.preventDefault();

				var $this = $(this),
					index = $this.index(),
					parent = $this.closest('.tab-container');

				$this.addClass('active').siblings(oTabTrigger).removeClass('active');

				parent
					.find('.tab-content__item.is-visible').removeClass('is-visible').end()
					.find('.tab-content__item:eq(' + index + ')').addClass('is-visible');

				return false;
			});
		},
		alert: function ()
		{
			var jAlert = $('.alert--dismissible');

			if ( !jAlert.length > 0 ) return;

			jAlert.each(function (i, alert)
			{
				var $this = $( alert ),
					closeBtn = $this.find('.alert__close');

				closeBtn.on('click', function ()
				{
					$this.hide(); // or .remove() method
				});
			});
		},
		counters: function ()
		{
			var jCounter = $('.js-count');

			function _countInit()
			{
				jCounter.each(function( i, counter )
				{
					var $this = $( counter );

					if( $this.is_on_screen() && !$this.hasClass('animate') )
					{
						$this
							.addClass('animate')
							.countTo({
								from: 0,
								speed: 2000,
								refreshInterval: 100
							});
					};
				});
			};

			if ( !jCounter.length > 0 ) return;

			_countInit();

			jWindow.on('scroll', throttle(function(e)
			{
				// _countInit();

				if( rAF ) {
					rAF(function(){
						_countInit();
					});
				} else {
					_countInit();
				}

			}, 400));
		},
		quantityCounter: function ()
		{
			var jCounter = $('.js-quantity-counter');

			if ( !jCounter.length > 0 ) return;

			jCounter.each(function (i, counter)
			{
				var $this     = $( counter ),
					input     = $this.children('.__q-input'),
					minus_btn = $this.children('.__btn--minus'),
					plus_btn  = $this.children('.__btn--plus'),
					count = 0;

				minus_btn.on('click touchend', function (e)
				{
					e.preventDefault();
					e.stopPropagation();
					count = parseInt(input.val()) - 1;
					count = count < 1 ? 1 : count;
					input.val(count);
					input.change();
					return false;
				});

				plus_btn.on('click touchend', function (e)
				{
					e.preventDefault();
					e.stopPropagation();
					input.val(parseInt(input.val()) + 1);
					input.change();
					return false;
				});
			});
		},
		googleMap: function ()
		{
			var maps = $('.g_map');

			if ( !maps.length > 0 ) return;

			var apiKey = maps.attr('data-api-key'),
				apiURL;

			if (apiKey)
			{
				apiURL = 'http://maps.google.com/maps/api/js?key='+ apiKey +'&sensor=false';
			}
			else
			{
				apiURL = 'http://maps.google.com/maps/api/js?sensor=false';
			}

			$.getScript( apiURL , function( data, textStatus, jqxhr )
			{
				maps.each(function ()
				{
					var current_map = $(this),
						latlng = new google.maps.LatLng(current_map.attr('data-longitude'), current_map.attr('data-latitude')),
						point = current_map.attr('data-marker'),

						myOptions = {
							zoom: 14,
							center: latlng,
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							mapTypeControl: false,
							scrollwheel: false,
							draggable: true,
							panControl: false,
							zoomControl: false,
							disableDefaultUI: true
						},

						stylez = [
							{
								featureType: "all",
								elementType: "all",
								stylers: [
									{ saturation: -100 } // <-- THIS
								]
							}
						];

					var map = new google.maps.Map(current_map[0], myOptions);

					var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });
					map.mapTypes.set('Grayscale', mapType);
					map.setMapTypeId('Grayscale');

					var marker = new google.maps.Marker({
						map: map,
						icon: {
							size: new google.maps.Size(60,73),
							origin: new google.maps.Point(0,0),
							anchor: new google.maps.Point(0,73),
							url: point
						},
						position: latlng
					});

					google.maps.event.addDomListener(window, "resize", function ()
					{
						var center = map.getCenter();
						google.maps.event.trigger(map, "resize");
						map.setCenter(center);
					});
				});
			});
		},
		scrollTo: function ()
		{
			var jLink = $('a[href*="#"]').not('[href="#"]').not('[href="#0"]'),
				nMenuToggler = document.getElementById('top-bar__navigation-toggler'),
				jMenuToggler = $(nMenuToggler);

			jLink.on('touchend click', function (e)
			{
				var $this = $(this).blur();

				if ( location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname )
				{
					var target = $(this.hash);

					target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

					if ( target.length )
					{
						$('html,body').stop().animate({
							scrollTop: target.offset().top - iHeaderHeight
						}, 1000);
					};

					if ( bNavAnchor && bMenuOpen )
					{
						jMenuToggler.click();
					};

					return false;
				};
			});
		},
		scrollTop: function ()
		{
			var	nBtnToTopWrap = document.getElementById('btn-to-top-wrap'),
				jBtnToTopWrap = $(nBtnToTopWrap);

			if ( !jBtnToTopWrap.length > 0 ) return;

			var nBtnToTop = document.getElementById('btn-to-top'),
				jBtnToTop = $(nBtnToTop),
				iOffset   = jBtnToTop.data('visible-offset');

			jBtnToTop.on('click', function (e)
			{
				e.preventDefault();

				$('body,html').stop().animate({ scrollTop: 0 } , 1500);

				return false;
			});

			jWindow.on('scroll', throttle(function(e)
			{
				if ( jWindow.scrollTop() > iOffset )
				{
					if ( jBtnToTopWrap.is(":hidden") )
					{
						jBtnToTopWrap.fadeIn();
					};

				}
				else
				{
					if ( jBtnToTopWrap.is(":visible") )
					{
						jBtnToTopWrap.fadeOut();
					};
				};

			}, 400)).scroll();
		},
		contactForm: function ()
		{
			var jForm = $('.js-contact-form');

			if ( !jForm.length > 0 ) return;

			jForm.each(function ( i, form )
			{
				var $this = $( form );

				$this.on('submit', function ()
				{
					var $this = $(this),
						str = $this.serialize(),
						note = $this.find('.form__note');

					$.ajax({
						type: "POST",
						url: "send_mail/contact_process.php",
						data: str,
						success: function (msg)
						{
							var result = '<span style="color: green"><br/>Your message has been sent. Thank you!</span>';

							note.html(result);

							$this.get(0).reset();

							setTimeout(function() { note.html('') }, 3000);
						},
						error: function (err)
						{
							var result = '<span style="color: red"><br/>Your message not sent! Error: "'+err.responseJSON.message+'"</span>';

							note.html(result);
						},
						complete: function ()
						{
							
						}
					});

					return false;
				});
			});
		}
	};

	$(document).ready(function()
	{
		VendiGO.onReady();

		$('.js-toggle-submenu').on('click', function (e)
		{
			var _ = $(this),
				submenu = _.next('ul');

			_.toggleClass('is-active');

			submenu.toggleClass('is-active d-block')
		})
	});

	jWindow.on('load', function ()
	{
		VendiGO.onLoad();

		var jIsotope = $('.js-isotope');

		if ( jIsotope.length > 0 && $.fn.isotope )
		{
			jIsotope.isotope('layout');
		};
	});

	$.fn.is_on_screen = function ()
	{
		var viewport = {
			top: jWindow.scrollTop(),
			left: jWindow.scrollLeft()
		};
		viewport.right = viewport.left + jWindow.width();
		viewport.bottom = viewport.top + jWindow.height();

		var bounds = this.offset();
		bounds.right = bounds.left + this.outerWidth();
		bounds.bottom = bounds.top + this.outerHeight();

		return ( !( viewport.right < bounds.left ||
					viewport.left > bounds.right ||
					viewport.bottom < bounds.top ||
					viewport.top > bounds.bottom
				));
	};

	// Create a safe reference to the Underscore object for use below.
	function now()
	{
		return new Date().getTime();
	};

	function throttle(func, wait, options)
	{
		var timeout, context, args, result;
		var previous = 0;

		if (!options) options = {};

		var later = function later()
		{
			previous = options.leading === false ? 0 : now();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};

		var throttled = function throttled()
		{
			var at = now();
			if (!previous && options.leading === false) previous = at;
			var remaining = wait - (at - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait)
			{
				if (timeout)
				{
						clearTimeout(timeout);
						timeout = null;
				}
				previous = at;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			}
			else if (!timeout && options.trailing !== false)
			{
				timeout = setTimeout(later, remaining);
			}
			return result;
		};

		throttled.cancel = function ()
		{
			clearTimeout(timeout);
			previous = 0;
			timeout = context = args = null;
		};

		return throttled;
	};

	// Pure js debounce function to optimize resize method
	function debounce(func, wait, immediate)
	{
		var timeout;

		return function ()
		{
			var context = this,
				args = arguments;

			clearTimeout(timeout);

			timeout = setTimeout(function()
			{
				timeout = null;

				if (!immediate) func.apply(context, args);
			}, wait);

			if (immediate && !timeout) func.apply(context, args);
		};
	};
}(jQuery));