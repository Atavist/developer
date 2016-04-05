Polymer({
	drawerClose: function(cb) {
		var nav = this.querySelector('nav'),
			article = this.querySelector('article'),
			menuButton = this.querySelector('.nav-menu-button'),
			footer = this.querySelector('.article-wrapper > footer'),
			revealed_els = [nav, menuButton, article];

		if (footer) revealed_els.push(footer);

		if (this.drawerOpened()) {
			this.addEventListener('drawerClosed', function(e) {
				e.target.removeEventListener(e.type, arguments.callee);
				if (cb) {
					setTimeout(cb);
				}
			});

			nav.classList.remove('nav-above-in-view');
			setTimeout(function() {
				for (var i = 0; i < revealed_els.length; i++) {
					revealed_els[i].classList.remove('nav-revealed');
				}

				menuButton.style.left = '0';
			}.bind(this));
		} else {
			if (cb) cb();
		}

	},

	drawerOpened: function() {
		return this.querySelector('nav').classList.contains('nav-revealed');
	},

	drawerClick: function() {
		var nav = this.querySelector('nav'),
			article = this.querySelector('article'),
			menuButton = this.querySelector('.nav-menu-button'),
			footer = this.querySelector('.article-wrapper > footer'),
			revealed_els = [nav, menuButton, article];

		if (footer) revealed_els.push(footer);

		if (!this.drawerOpened()) {
			nav.style.opacity = '1';
			nav.classList.add('nav-revealed');

			for (var i = 0; i < revealed_els.length; i++) {
				revealed_els[i].classList.add('nav-revealed');
			}

			menuButton.style.left = parseInt(menuButton.style.left, 10) + $(nav).outerWidth();
		} else {
			this.drawerClose();
		}
	},

	attached: function() {
		this.querySelector('.nav-menu-button').addEventListener('click', this.drawerClick.bind(this));
		var article = this.querySelector('article');
		article.addEventListener('click', function() {
			this.drawerClose();
		}.bind(this));
		article.addEventListener('transitionend', function(e) {
			if (e.target === article) {
				if (this.drawerOpened()) {
					this.querySelector('nav').classList.add('nav-above-in-view');
				} else {
					this.fire('drawerClosed');
					setTimeout(function() {
						this.querySelector('nav').style.opacity = '0';
					}.bind(this), 10);
				}
			}
		}.bind(this));

		this.addEventListener('sectionChange', function(e) {
			if (e.detail && e.detail.scroll === true) return;
			this.drawerClose();
		});

		this.beforeSectionChange(function(cb, section_n, other_data) {
			if (other_data && other_data.scroll === true) return;
			if (this.drawerOpened()) {
				this.drawerClose(cb);
				return false;
			}
		});
	}
});