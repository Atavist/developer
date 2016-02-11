Polymer({
	properties: {
		the_image: {
			type: Object,
			notify: true
		},
		the_caption: {
			type: String,
			notify: true
		},
		the_url: {
			type: String,
			observer: 'the_urlChanged'
		},
		target_same_window: {
			type: String,
			observer: 'target_same_windowChanged'
		}
	},

	ready: function() {
		if (this.querySelector('atavist-image').supportsRealSize) {
			this.querySelector('.atavist-simple-image-wrapper').classList.add('atavist-simple-image-wrapper-sized');
		}
		this.querySelector('a').addEventListener('click', this._clicked.bind(this));
	},
	the_urlChanged: function(val) {
		if (!this.editable()) {
			this.querySelector('a').href = val;	
		}
	},
	target_same_windowChanged: function(val) {
		this.querySelector('a').target = this._target_same_window() ? null : '_blank';
	},
	_clicked: function(e) {
		if (this._target_same_window() && this.the_url) {
			window.location.href = this.the_url;
			e.preventDefault();
			return false;
		}
		return true;
	},
	_target_same_window: function() {
		return this.target_same_window === 'true';
	}

});
