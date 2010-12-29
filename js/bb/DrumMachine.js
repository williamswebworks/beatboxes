dojo.provide('bb.DrumMachine');

dojo.require('dijit._Widget');

// This widget ties a bb.PadArary with its play, pause, volume, and tempo controls

dojo.declare('bb.DrumMachine', [dijit._Widget], {
	play: '',
	pause: '',
	volume: '',
	tempo: '',

	padArray: '',
	
	startup: function() {
		this.inherited(arguments);
		
		this.play     = dijit.byId(this.play)     || dojo.byId(this.play);
		this.pause    = dijit.byId(this.pause)    || dojo.byId(this.pause);
		this.volume   = dijit.byId(this.volume)   || dojo.byId(this.volume);
		this.tempo    = dijit.byId(this.tempo)    || dojo.byId(this.tempo);
		this.padArray = dijit.byId(this.padArray) || dojo.byId(this.padArray);
		
		dojo.connect(this.play, 'click', this.padArray, 'play');

		dojo.connect(this.pause, 'click', this.padArray, 'pause');
		
		this.connect(this.volume, 'onChange', function(volume) {
			this.padArray.set('volume', volume/100);
		});

		this.volume.set('value', this.volume.value);

		this.connect(this.tempo, 'onChange', function(tempo) {
			this.padArray.set('bpm', tempo);
		});

		this.tempo.set('value', this.tempo.get('value'));
		
		this.connect(this.padArray, 'play', function() {
			dojo.addClass(this.domNode, 'playing');
		});

		this.connect(this.padArray, 'pause', function() {
			dojo.removeClass(this.domNode, 'playing');
		});
	}
});
