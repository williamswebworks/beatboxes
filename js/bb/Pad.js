dojo.provide('bb.Pad');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

dojo.declare('bb.Pad', [dijit._Widget, dijit._Templated], {
	sample: '',    // A path to an MP3
	_sample: null, // the Audio object
	lit: false,
	volume: 1,
	
	baseClass: 'bbPad',
	templateString: dojo.cache(dojo.moduleUrl('bb', 'templates/Pad.html')),
	
	postCreate: function() {
		this.inherited(arguments);
		this.connect(this.domNode, 'mousedown', this.toggle);
	},
	
	toggle: function() {
		this.set('lit', !this.get('lit'));
	},
		
	play: function() {
		dojo.addClass(this.domNode, 'playing');

		if (this.lit) this._sample.play();

		setTimeout(dojo.hitch(this, function() {
			dojo.removeClass(this.domNode, 'playing');
		}), 100);
	},
	
	_setLitAttr: function(lit) {
		dojo.toggleClass(this.domNode, 'lit', lit);
		
		if (lit) {
			this._sample = this._sample || new Audio(this.sample);
		} else {
			this._sample = null;
		}

		this.lit = lit;
	},
	
	_setVolumeAttr: function(volume) {
		if (this._sample) this._sample.volume = volume;
		this.volume = volume;
	}
});
