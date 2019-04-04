/*!
 * project-name v0.0.1
 * A description for your project.
 * (c) 2019 YOUR NAME
 * MIT License
 * http://link-to-your-git-repo.com
 */

/**
 * @function contentAccordion
 *
 * Simple content accordion.
 *
 * Example layout:
 *  <h2 class="accordion-header">
 *    <button aria-expanded="false">
 *      <span class="plus-icon"></span>
 *    </button>
 *  </h2>
 *  <div class="accordion-content">
 *      <p></p>
 *  </div>
 */

var contentAccordion = (function () {
  'use strict';
  
	//Gather all content headers on the page
	var headings = document.querySelectorAll('.accordion-header');
  
  var mq = window.matchMedia('(max-width: 1200px)');

	var clickHandler = function(evt) {
		if (!evt.target === '.accordion-header') return;
		var accordionheader = evt.target.parentNode;
		var accordionBtn = evt.target;
		var accordionContent = accordionheader.nextElementSibling;

		if (accordionBtn.getAttribute('aria-expanded') === 'false') {
			accordionBtn.classList.add('open');
			accordionBtn.setAttribute('aria-expanded', 'true');
			accordionContent.classList.remove('closed');
			accordionContent.setAttribute('aria-hidden', 'false');
		} else {
			accordionBtn.classList.remove('open');
			accordionBtn.setAttribute('aria-expanded', 'false');
			accordionContent.classList.add('closed');
			accordionContent.setAttribute('aria-hidden', 'true');
		}
	};

	var init = function() {

		for (var i = 0; i < headings.length; i++) {
			var header = headings[i];

			header.addEventListener('click', clickHandler, false);

			var accordionBtn = header.querySelector('button');
			var accordionContent = header.nextElementSibling;

			//Set our aria and class up for content and button elements
			if (header.classList.contains('mobile-accordion') && !mq.matches) {
				accordionBtn.setAttribute('aria-expanded', 'true');
        accordionContent.setAttribute('aria-hidden', 'false');
        accordionContent.classList.remove('closed');
			} else {
				accordionBtn.setAttribute('aria-expanded', 'false');
				accordionContent.setAttribute('aria-hidden', 'true');
				accordionContent.classList.add('closed');
			}
		}
	};
  init();
  
  mq.addListener(init);
  
})();

var hideButtonOnScroll = (function() {

  'use strict';
  
		var debounce = function(fn) {
			// Setup a timer
			var timeout;

			// Return a function to run debounced
			return function() {
				// Setup the arguments
				var context = this;
				var args = arguments;

				// If there's a timer, cancel it
				if (timeout) {
					window.cancelAnimationFrame(timeout);
				}

				// Setup the new requestAnimationFrame()
				timeout = window.requestAnimationFrame((function() {
					fn.apply(context, args);
				}));
			};
		};

		function init(evt) {
			var offset = 150,
        scrollTo = document.querySelector('.elevator');
      if (!scrollTo) return;

			if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
				scrollTo.classList.remove('hidden-visibility');
			} else {
				scrollTo.classList.add('hidden-visibility');
			}
  }
  
  window.addEventListener('scroll', debounce(init), false);
  
    return {
      init: init
    };
})();
hideButtonOnScroll.init();
/*
  Listens to clicks of the navigationToggle button and toggles the aria-expanded attribute

  Usage:
    <button id="navigationToggle" aria-controls="%navId%" /> %navId% could be mainNav, subNav, etc

    <div id="%navId%">...

  Result:
    <button id="navigationToggle" aria-controls="%navId%" class="spin" />
    <div id="%navId%" aria-expanded="true">...

  CSS:
    div[aria-expanded] {
      display: block;
    }
*/
var navigationToggle = (function() {
	var navigationToggle = document.querySelector('#navigationToggle');
	var mainNavLink = document.querySelectorAll('#navigationToggle>span');
	var targetId = navigationToggle.getAttribute('aria-controls');
	var targetElem = document.querySelector('#' + targetId);

	var clickHandler = function(evt) {
		if (evt.target.classList.contains('main-nav__link') || evt.target.classList.contains('mobile-button')) {
			toggle();
		}
	};

	var toggle = function() {
		if (navigationToggle.getAttribute('aria-expanded') === 'true') {
			navigationToggle.classList.remove('spin');
			navigationToggle.setAttribute('aria-expanded', 'false');
			targetElem.setAttribute('aria-hidden', 'true');
		} else {
			navigationToggle.classList.add('spin');
			navigationToggle.setAttribute('aria-expanded', 'true');
			targetElem.setAttribute('aria-hidden', 'false');
		}
	};

	var init = function() {
		//Aria setup
		navigationToggle.setAttribute('aria-expanded', 'false');
		targetElem.setAttribute('aria-hidden', 'true');
	};
	init();

	document.documentElement.addEventListener('click', clickHandler, false);
})();

/**
 * @function superSimpleSlider
 * @param  {type} function
 *
 */
var superSimpleSlider = (function() {
	'use strict';

	var slideIndex = 1;
	var mq = window.matchMedia('(max-width: 1024px)');

	function advanceSlides(n) {
		showSlides((slideIndex += n));
	}

  function showSlides(n) {
    var slide = document.querySelectorAll('.slider-item');

		if (!mq.matches && slide[slideIndex - 1].hasAttribute('style')) {
			for (var i = 0; i < slide.length; i++) {
				slide[i].style.display = 'block';
			}
		} else if (mq.matches) {
			if (n > slide.length) {
				slideIndex = 1;
			} else if (n < 1) {
				slideIndex = slide.length;
			}
			for (var i = 0; i < slide.length; i++) {
				slide[i].style.display = 'none';
			}
			if (slide.length !== 0) {
				slide[slideIndex - 1].style.display = 'block';
			}
		}
	}

	// Next and Previous controls for slideshow
	var sliderItems = function() {
		var sliderClass = document.querySelectorAll('.slider-btn');

		var sliderControls = function(evt) {
			if (evt.target.classList.contains('left')) {
				advanceSlides(-1);
			} else if (evt.target.classList.contains('right')) {
				advanceSlides(1);
			}
		};

		for (var i = 0; i < sliderClass.length; i++) {
			sliderClass[i].addEventListener('click', sliderControls, false);
		}
	};

	/**
	 * @function init
	 *
	 */
  var init = function () {
    var slide = document.querySelector('.slider-item');
    if (!slide) return;

		showSlides(slideIndex);
		sliderItems();
  };
  init();

	mq.addListener(init);
})();


(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], (function () {
			return factory(root);
		}));
	} else if (typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		root.VideoPlayer = factory(root);
	}
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, (function (window) {
  
  'use strict';

	var VideoPlayer = function (selector, options) {

		//
		// Variables
		//

    var videoPlayer = {};
    var defaults = {
      youtubeURL: '',
      vimeoURL: ''
		};
		var settings;


		//
		// Methods
    //
    
    /*!
		 * Merge two or more objects together.
		 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
		 * @param   {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
		 * @param   {Object}   objects  The objects to merge together
		 * @returns {Object}            Merged values of defaults and options
		 */
		var extend = function() {
			// Variables
			var extended = {};
			var deep = false;
			var i = 0;

			// Check if a deep merge
			if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
				deep = arguments[0];
				i++;
			}

			// Merge the object into the extended object
			var merge = function(obj) {
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						// If property is an object, merge properties
						if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
							extended[prop] = extend(extended[prop], obj[prop]);
						} else {
							extended[prop] = obj[prop];
						}
					}
				}
			};

			// Loop through each object and conduct a merge
			for (; i < arguments.length; i++) {
				var obj = arguments[i];
				merge(obj);
			}

			return extended;
		};

		var clickHandler = function(evt) {
      if (evt.target.hasAttribute('data-custom-video-poster')) {
        processURL();
      }
    };


		var processURL = function () {
      
      if (youtubeURL !== '') {
      
      } else if (vimeoURL !== '') {
      
      }

		};

		var init = function (options) {
      settings = extend(defaults, options || {});
      document.documentElement.addEventListener('click', clickHandler, false);
		};

		return videoPlayer;

	};

	return VideoPlayer;


}));
