# Sushikiriz WordPress Theme

A modern, feature-rich WordPress theme designed for flexibility and performance. Built with Bootstrap, Gulp, and Advanced Custom Fields (ACF).

## Description

Sushikiriz (also known as Bravad) is a professional WordPress theme that provides a comprehensive set of custom blocks, WooCommerce integration, and extensive customization options. Perfect for building dynamic websites with portfolio showcases, team pages, sale points, and more.

## Features

### Content Blocks
- **Text Block** - Rich text content with WYSIWYG editor
- **Text & Image Block** - Combined text and image layouts
- **Gallery Block** - Responsive image galleries with optional links
- **Slideshow Block** - Image carousels with customizable slides per view
- **Portfolio Block** - Showcase portfolio items
- **Team Block** - Display team members
- **FAQ Block** - Accordion-style frequently asked questions
- **Features Block** - Highlight key features
- **Tabs Block** - Tabbed content organization
- **Sale Points Block** - Display points of sale or locations
- **Google Map Block** - Integrated maps
- **Form Block** - Contact and custom forms
- **Files Block** - File downloads and attachments
- **Posts Block** - Display blog posts with filtering
- **Reusable Block** - Reference WordPress reusable blocks

### Theme Features
- **WooCommerce Integration** - Full e-commerce support with customized templates
- **Custom Post Types** - Portfolio, Team, Points of Sale
- **Advanced Search** - Enhanced search functionality
- **Custom Comment System** - Improved comment handling
- **Shortcodes** - Collection of useful shortcodes
- **Responsive Design** - Mobile-first, Bootstrap-based layout
- **SVG Icon System** - Optimized icon sprites
- **Customizer Options** - WordPress Customizer integration
- **Meta Boxes** - Custom fields for enhanced content control

## Requirements

- **WordPress** 5.0 or higher
- **PHP** 7.0 or higher
- **Advanced Custom Fields (ACF)** Pro plugin
- **Node.js** and **npm** (for development)

## Installation

1. Download or clone this repository
2. Upload the theme to your WordPress installation's `wp-content/themes/` directory
3. Install and activate the Advanced Custom Fields Pro plugin
4. Import the ACF fields from `acf-fields.json`
5. Activate the theme from WordPress admin panel

## Development Setup

### Prerequisites

Install Node.js and npm on your development machine.

### Installing Dependencies

```bash
npm install
```

### Build Process

The theme uses Gulp for asset compilation and optimization.

#### Available Gulp Tasks

```bash
# Build all assets (default task)
gulp

# Watch for changes and auto-compile
gulp watch

# Compile styles only
gulp style

# Compile JavaScript only
gulp scripts

# Process SVG icons
gulp svg_sprite

# Optimize images
gulp img_min
```

### File Structure

```
sushikiriz/
├── assets/              # Compiled assets (CSS, JS, images)
├── inc/                 # PHP classes and functions
│   ├── woocommerce/     # WooCommerce customization
│   └── *.php            # Theme classes
├── src/                 # Source files
│   ├── js/              # JavaScript source
│   │   ├── frontend/    # Frontend scripts
│   │   └── backend/     # Admin scripts
│   ├── style/           # SCSS source
│   └── svg/             # SVG icons
├── templates/           # Template files
│   ├── blocks/          # Block templates
│   └── parts/           # Template parts
├── woocommerce/         # WooCommerce template overrides
├── functions.php        # Main theme functions
├── style.css            # Theme stylesheet (metadata)
└── gulpfile.js          # Build configuration
```

## Customization

### ACF Fields

The theme relies heavily on Advanced Custom Fields. Import the field groups from `acf-fields.json` through the ACF admin interface.

### Blocks

Custom content blocks are located in `templates/blocks/`. Each block is a PHP template that can be customized.

### Shortcodes

Available shortcodes are documented in the admin area under Templates > Shortcodes.

### Hooks and Filters

The theme provides numerous hooks and filters for customization:
- Template hooks: `inc/bravad-template-hooks.php`
- Template functions: `inc/bravad-template-functions.php`
- WooCommerce hooks: `inc/woocommerce/woocommerce-template-hooks.php`

## Browser Support

The theme is built with the following browser support targets:
- Last 2 versions of major browsers
- Safari 5+
- IE 9+
- iOS 6+
- Android 4+

## Version

**Current Version:** 2.2.3

See `changelog.txt` for detailed version history and updates.

## Credits

- **Author:** Sébastien Gagné
- **Theme URI:** https://bravad.ca
- **Dependencies:**
  - Bootstrap 4.6.0
  - jQuery 3.6.0
  - Gulp build system
  - Various Gulp plugins

## License

This theme is licensed under the GNU General Public License v2 or later.

License URI: http://www.gnu.org/licenses/gpl-2.0.html

## Support

For bug reports and feature requests, please use the [GitHub Issues](https://github.com/bastiegag/sushikiriz/issues) page.

## Changelog

See `changelog.txt` for a complete list of changes and updates.