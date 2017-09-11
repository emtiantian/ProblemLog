	$.fn.changeName = function(name) {
		this.attr("name", name);
		return this;
	}
	$.fn.showChange = function(fun) {
		fun(this);
		return this;
	}
	$.fn.changeStyle = function(colorStr) {
		this.css("color", colorStr);
	}
