dojo.provide('bb.PadArray');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

dojo.declare('bb.PadArray', [dijit._Widget], {
	samples: ['kick', 'snare', 'tom-low', 'tom-high', 'hat-closed', 'hat-open', 'ride', 'crash'],
	beats: 8,
	
	_beats: new dijit.WidgetSet(),
	
	buildRendering: function() {
		this.inherited(arguments);
		
		var beat;
		for (var i = 0; i < this.beats; i++) {
			beat = new bb.Beat({samples: this.samples});
			beat.placeAt(this.domNode);
			
			this._beats.add(beat);
		}
	},
	
	play: function() {},
	
	stop: function() {}
});

dojo.declare('bb.Beat', [dijit._Widget], {
	samples: [],

	_pads: new dijit.WidgetSet(),
	
	baseClass: 'bbBeat',
	
	buildRendering: function() {
		this.inherited(arguments);
		
		dojo.forEach(this.samples, function(sample) {
			var pad = new bb.Pad({file: sample});
			pad.placeAt(this.domNode);

			this._pads.add(pad);
		}, this);
	},
	
	play: function() {
		dojo.forEach(this._pads, function(pad) {
			pad.play();
		});
	}
});


dojo.declare('bb.Pad', [dijit._Widget, dijit._Templated], {
	file: '',
	lit: false,
	
	baseClass: 'bbPad',
	templateString: dojo.cache(dojo.moduleUrl('bb', 'templates/Pad.html')),
	
	postCreate: function() {
		this.inherited(arguments);
		this.connect(this.domNode, 'onclick', function() {
			alert(this.file);
		});
	},
		
	play: function() {
		console.log('PLAYING: ' + this.file);
	}
});
