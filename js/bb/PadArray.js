dojo.provide('bb.PadArray');

dojo.require('dijit._Widget');
dojo.require('bb.Beat');

dojo.declare('bb.PadArray', [dijit._Widget], {
	samplesDir: '',
	samples: [],
	beats: 8,
	bpm: 120,
	volume: NaN,
	
	_beats: [],
	_pads: [],

	_on: NaN,
	_timeout: NaN,
	_msPerBeat: NaN,
	
	_touching: false,
	_touchActivates: false,
	
	baseClass: 'bbPadArray',
	
	buildRendering: function() {
		this.inherited(arguments);
		
		var beat;
		for (var i = 0; i < this.beats; i++) {
			beat = new bb.Beat({samples: dojo.map(this.samples, function(sample) {
				return this.samplesDir + '/' + sample;
			}, this)});

			beat.placeAt(this.domNode);
			beat.startup();
			
			this._beats.push(beat);
		}
	},
	
	startup: function() {
		this.inherited(arguments);
		
		dojo.forEach(this._beats, function(beat) {
			this._pads = this._pads.concat(beat._pads);
		}, this);
		
		dojo.forEach(this._pads, function(pad) {
			this.connect(pad.domNode, 'mousedown', function() {
				this.set('_touching', true);
				this.set('_touchActivates', pad.get('lit'));
			});

			this.connect(document, 'mouseup', function() {
				this.set('_touching', false);
			});
			
			this.connect(pad.domNode, 'mousemove', function() {
				if (this._touching) pad.set('lit', this._touchActivates);
			});
		}, this);
	},
	
	action: function() {
		if (this._on === this.beats) this._on = 0;
		this._beats[this._on].play();
		
		this._on += 1;
		
		this._timeout = setTimeout(dojo.hitch(this, this.action), this._msPerBeat);
	},
	
	play: function() {
		this.set('_on', 0);
		this.action();
	},
	
	pause: function() {
		clearTimeout(this._timeout);
	},
	
	_setBpmAttr: function(bpm) {
		this.bpm = bpm;
		this._msPerBeat = (1 / (bpm / 60 )) * 500; // Actualy, it's double
	},
	
	_setVolumeAttr: function(volume) {
		dojo.forEach(this._pads, function(pad) {
			pad.set('volume', volume);
		});
	}
});
