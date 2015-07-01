# Atavist Custom Themes

Making your own Atavist theme is simple. It’s mostly a matter of defining a few variables, and maybe a mixin or two, in Sass. If you’d like your theme to use custom fonts, you can include them via a third-party service or as uploaded font files. 

Why use a CSS preprocessor? For one thing, it enables expressive but DRY theming, allowing for a single aesthetic decision — say, a color selection — to be made once, in a variable, and propagated throughout a stylesheet where applicable. For another, it allows for themes to be abstracted from template markup, which will evolve over time.

Why use Sass? We like it.

Custom themes can be developed from within Atavist by users at the Business tier or higher. If you don’t have an Atavist account, [go get one](https://atavist.com/signup). Once signed in, click “Develop” from the top menu and “Theme” from the left sidebar. You’ll be looking at the theme-building interface.


## Defining theme styles

Rule #1: Don’t write raw CSS. *Don’t write raw CSS.* You define styles with theme variables and mixins. 

Rule #2: You don’t need to redefine every theme variable and mixin that exist. In fact, you really shouldn’t. You can make a distinct theme with just a handful of variables. 


### Theme variables

For the most part, a theme will consist of Sass variable definitions, like this: 

```
$primaryBackgroundColor: white;
``` 

Variables exist for both high- and low-level theming decisions. If your theme specifes, for example, only a `$primaryBackgroundColor` and `$primaryTextColor`, other color values — the color of icons, the color of navigational elements, the color of hyperlink underlines — will be inferred. If you’d like to dig deeper, you can do so by defining more specific variables, like `$linkUnderlineColor-h2` (the color of link underlines within h2 elements). 

To see what variables exist, browser our theme variable and mixin [reference doc](#). 


### Theme mixins

For a few types of elements, styles can be defined as mixins, or groups of styles. In many cases, these mixins are composed, at least in part, of style properties defined line-by-line as Sass variables. This allows theme creators to define styles either piecemeal or holistically. Here, for example, is how the `atavist-sidebar` mixin is compiled:

	@mixin atavist-sidebar {
	    @if mixin-exists(atavist-sidebar-theme) {
	    	@include atavist-sidebar-theme;
	    } @else {
			.atavist-sidebar {
				font-size: $sidebarBlockFontSize;
				line-height: $sidebarBlockLineHeight;
				p, pre, article & ul, article & ol, blockquote {
					font-family: $sidebarBlockBodyTextFontFamily;
					font-size: $sidebarBlockBodyTextFontSize;				
				}
				.template-setting-paragraph-spacing-Spaces & p:not(.atavist-caption), .template-setting-paragraph-spacing-Spaces & pre {
					margin-top: $sidebarBlockParagraphTopMargin;
				}			
			}
		}
	}

If you, as a theme creator, would like to change nothing but the Sidebar block’s font size there’s a variable for that you can define: `$sidebarBlockFontSize`. If, on the other hand, you’d like to redefine styles for the Sidebar block holistically, you can redefine the mixin entirely. To do that, add a mixin to your theme Sass. To name a theme-specific mixin, add `-theme` to the mixin’s name, like this: 

	@mixin atavist-sidebar-theme {
		font-size: 1em;
		line-height: 1.2;
		color: #333;
	}

To see what mixins exist, browse our theme variable and mixin [reference doc](#). 


### Adding CSS overrides. 

You shouldn’t use raw CSS in your themes, but if you absolutely must, you can declare styles inside a special mixin: `theme-junk-drawer`. These styles will be appended to the end of the reader-facing stylesheet. 

	@mixin theme-junk-drawer {	
		/* CSS overrides here */
	}

## Adding fonts to your theme

You can add fonts to your theme from within the Atavist theme-building interface. 

### External fonts

You can add fonts from third-party services to your theme. Select a font provider and, depending on the provider, add the requested path or service-specific ID.

### Uploaded fonts

If you have webfont files on hand, you can upload the assets and use the fonts in your theme. Upload the webfont files individually (must be WOFF, TTF, SVG, or EOT files), and give them a font family name, like `Avenir` or `"Helvetica Neue"`. Use the same name for all font files associated with a given font family. Then, in your custom theme Sass, use the font family names just as you would normally in CSS, e.g. `$primaryFontFamily: "My Custom Font", Helvetica, sans-serif;`.
