dojo.provide('bb.Keyboard');

dojo.require('dijit._Widget');
dojo.require('bb.Key');

dojo.declare('bb.Keyboard', [dijit._Widget], {
	keys: 24,
	middle: NaN,
	
	_keys: [],
	
	baseClass: 'bbKeyboard',

	buildRendering: function() {
		this.inherited(arguments);
		
		k = this;
		
		var key;
		for (var i = 0; i <= this.keys; i++) {
			key = new bb.Key({pitch: 220});
			key.placeAt(this.domNode);

			this._keys.push(key);
		}
		
		// Find middle C
		var c;
		this.middle = c = this.middle || Math.floor(this.keys / 2);
		this._keys[c].domNode.innerHTML = 'C';

		// Set up the black keys
		var isBlack;
		for (i = 0; i < this._keys.length; i++) {
			isBlack = ~dojo.indexOf([1,3,6,8,10], (i+(12*c)-c) % 12);
			dojo.toggleClass(this._keys[i].domNode, 'black', isBlack);
		}
	}
});
