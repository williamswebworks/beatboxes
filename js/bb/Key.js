dojo.provide('bb.Key');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

dojo.declare('bb.Key', [dijit._Widget, dijit._Templated], {
	sample: '',
	
	baseClass: 'bbKey',
	templateString: dojo.cache(dojo.moduleUrl('bb', 'templates/Key.html')),
	
	postCreate: function() {
		this.inherited(arguments);
		this.connect(this.domNode, 'mousedown', this.play);
	},
	
	play: function() {
		console.log(this.sample);
	}
});
