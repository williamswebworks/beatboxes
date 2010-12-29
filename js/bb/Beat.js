dojo.provide('bb.Beat');

dojo.require('dijit._Widget');
dojo.require('bb.Pad');

dojo.declare('bb.Beat', [dijit._Widget], {
	samples: [],

	_pads: [],
	
	baseClass: 'bbBeat',
	
	create: function() {
		// TODO: Why do I have to do this?
		this._pads = [];
		this.inherited(arguments);
	},
	
	postMixInProperties: function() {
		this.inherited(arguments);
	},
	
	buildRendering: function() {
		this.inherited(arguments);
		
		this.samples.reverse();
		
		dojo.forEach(this.samples, function(sample) {
			var pad = new bb.Pad({sample: sample});
			pad.placeAt(this.domNode);
			pad.startup();

			this._pads.push(pad);
		}, this);
		
		this.samples.reverse();
	},
	
	play: function() {
		dojo.forEach(this._pads, function(pad) {
			pad.play();
		});
	}
});
