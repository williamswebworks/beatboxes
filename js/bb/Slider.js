dojo.provide('bb.Slider');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

dojo.declare('bb.Slider', [dijit._Widget, dijit._Templated], {
	min: 0,
	max: 100,
	value: 50,
	step: 1,
	units: '',
	immediate: true,
	
	orientation: 'horizontal', // Or 'vertical'
	axis: 'x',
	dim: 'w',
	side: 'left',
	
	_mouseIsDown: false,
	
	baseClass: 'bbSlider',
	templateString: dojo.cache(dojo.moduleUrl('bb', 'templates/Slider.html')),
	
	postCreate: function() {
		if (this.orientation === 'vertical') {
			this.axis = 'y';
			this.dim = 'h';
			this.side = 'top';
		}
		
		this.inherited(arguments);

		if (!this.immediate) {
			this.connect(this.beforeThumbNode, 'mousedown', function(e) {dojo.stopEvent(e); this.stepDown();});
			this.connect(this.afterThumbNode, 'mousedown', function(e) {dojo.stopEvent(e); this.stepUp();});
		}

		this.connect(this.trackNode, 'mousedown', function(e) {this._mouseIsDown = true; this.dragTrack(e);});
		this.connect(this.trackNode, 'mousemove', this.dragTrack);
		this.connect(document, 'mouseup', function() {this._mouseIsDown = false;});

		setTimeout(dojo.hitch(this, function() {this.set('value', this.value);}), 333);
	},
	
	dragTrack: function(e) {
		if (!this._mouseIsDown) return;
		
		var value = e[this.axis] - dojo.coords(this.trackNode)[this.axis];
		value = value / (dojo.coords(this.trackNode)[this.dim]);
		
		value = (value * (this.max - this.min)) + this.min;

		this.set('value', value);
	},
	
	moveThumb: function(percent) {
		var mouse = ((percent * dojo.coords(this.trackNode)[this.dim]) + dojo.coords(this.trackNode)[this.axis]);
		var newPos = (mouse) - dojo.coords(this.trackNode)[this.axis];
		newPos = Math.max(dojo.coords(this.thumbNode)[this.dim], newPos);
		newPos = Math.min(dojo.coords(this.trackNode)[this.dim] - dojo.coords(this.thumbNode)[this.dim], newPos);

		dojo.style(this.thumbNode, this.side, newPos + 'px');
		dojo.style(this.beforeThumbNode, 'right', (dojo.coords(this.trackNode)[this.dim] - newPos) + 'px');
		dojo.style(this.afterThumbNode, 'left', newPos + 'px');
	},
	
	stepUp: function() {
		this.set('value', this.value + this.step);
	},
	
	stepDown: function() {
		this.set('value', this.value - this.step);
	},
	
	_setValueAttr: function(value) {
		this.moveThumb((value - this.min) / (this.max - this.min));
		this.valueNode.innerHTML = Math.round(value);
		this.value = value;
		this.onChange(value);
	},
	
	onChange: function(value) {}
});
