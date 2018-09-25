var ParallaxManager;
var ParallaxPart;

ParallaxPart = (function() {
  function ParallaxPart(element) {
    this.element = element;
    this.speed = parseFloat(this.element.getAttribute('data-parallax-speed'));
    this.maxScroll = parseInt(this.element.getAttribute('data-max-scroll'));
  }

  ParallaxPart.prototype.update = function(scrollY) {
    if (scrollY > this.maxScroll) { return; }
    var offset = -(scrollY * this.speed);
    this.setYTransform(offset);
  };

  ParallaxPart.prototype.setYTransform = function(value) {
    this.element.style.webkitTransform = "translate3d(0, " + value + "px, 0)";
    this.element.style.MozTransform    = "translate3d(0, " + value + "px, 0)";
    this.element.style.OTransform      = "translate3d(0, " + value + "px, 0)";
    this.element.style.transform       = "translate3d(0, " + value + "px, 0)";
    this.element.style.msTransform     = "translateY(" + value + "px)";
  };

  return ParallaxPart;

})();

ParallaxManager = (function() {
	ParallaxManager.prototype.parts = [];

	function ParallaxManager(elements) {
		if (Array.isArray(elements) && elements.length) {
			this.elements = elements;
		}
		if (typeof elements === 'object' && elements.item) {
			this.elements = Array.prototype.slice.call(elements);
		} else if (typeof elements === 'string') {
			this.elements = document.querySelectorAll(elements);
			if (this.elements.length === 0) {
				throw new Error('Issue: no elements were found');
			}
			this.elements = Array.prototype.slice.call(this.elements);
		} else {
			throw new Error("Parallax: Element variable is not a querySelector string, Array, or NodeList");
		}
		for (var i in this.elements) {
			this.parts.push(new ParallaxPart(this.elements[i]));
		}
		window.addEventListener("scroll", this.onScroll.bind(this));
  }

	ParallaxManager.prototype.onScroll = function() {
		window.requestAnimationFrame(this.scrollHandler.bind(this));
	};

	ParallaxManager.prototype.scrollHandler = function() {
		var scrollY = Math.max(window.pageYOffset, 0);
		for (var i in this.parts) { this.parts[i].update(scrollY); }
	};

  return ParallaxManager;

})();

new ParallaxManager('.parallax-layer');