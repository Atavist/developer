Polymer({
	draggableInEditor: false,
	keep_markup: false,
	properties: {
		multi_video: {
			type: Object,
			notify: true
		},
		the_caption: {
			type: String,
			notify: true
		}
	},
	ready: function() {
		if (!this.editable()) {
			this.whenInView({
				enter: function() {
					/* This event will fire when any part of the video is visible */
					if (this.querySelector('atavist-video')) {
						this.querySelector('atavist-video').play();	
					}
				},
				exited: function() {
					/* This event will fire when the entire video is no longer visible */
					if (this.querySelector('atavist-video')) {
						this.querySelector('atavist-video').pause();
					}
				}
			});	
		}
	},
	
});
