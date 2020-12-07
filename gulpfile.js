var autoprefixer = require( 'gulp-autoprefixer' ),
	concat       = require( 'gulp-concat' ),
	gulp         = require( 'gulp' ),
	cleancss 	 = require( 'gulp-clean-css' ),
	imagemin     = require( 'gulp-imagemin' ),
	jshint       = require( 'gulp-jshint' ),
	mmq          = require( 'gulp-merge-media-queries' ),
	notify       = require( 'gulp-notify' ),
	plumber      = require( 'gulp-plumber' ),
	rename       = require( 'gulp-rename' ),
	sass         = require( 'gulp-sass' ),
	sequence     = require( 'gulp-sequence' ),
	sourcemaps   = require( 'gulp-sourcemaps' ),
	svgsprite    = require( 'gulp-svg-sprite' ),
	terser       = require( 'gulp-terser' ),
	util         = require( 'gulp-util' );

/**
 * Default Gulp task
 */
gulp.task( 'default', gulp.series( style, style_admin, scripts, scripts_admin, done => {
	done();
}));

/**
 * Watch
 */
gulp.task( 'watch', gulp.series( style, scripts, scripts_admin, function() {
	// Styles
	gulp.watch( 'src/style/frontend/**/*.scss', gulp.series( style ) );
	gulp.watch( 'src/style/backend/**/*.scss', gulp.series( style_admin ) );
	gulp.watch( 'src/style/variables.scss', gulp.series( style, style_admin ) );

	// Scripts
	gulp.watch( 'src/js/frontend/**/*.js', gulp.series( scripts ) );
	gulp.watch( 'src/js/backend/**/*.js', gulp.series( scripts_admin ) );

	// SVG
    gulp.watch( 'src/svg/*.svg', function( event ) {
		sequence( svg_sprite, img_min ) ( function( err ) {
			if ( err ) console.log( err );
		});
    });
}));

/**
 * Styles
 */
gulp.task( 'style', gulp.series( style, done => {
	done();
}));

function style() {
	return  gulp.src( 'src/style/frontend/**/*.scss', { base: 'src' } )
				.pipe( plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) }) )
				.pipe( sourcemaps.init() )
				.pipe( sass({
					outputStyle: 'expanded'
				}).on( 'error', sass.logError ) )
				.pipe( autoprefixer({
					cascade: false,
					remove: false
				}) )
				.pipe( concat( 'style.css' ) )
				.pipe( cleancss( { format: 'beautify' } ) )
				.pipe( sourcemaps.write() )
				.pipe( gulp.dest( 'assets/css' ) )
				.pipe( sourcemaps.init( { loadMaps: true } ) )
				.pipe( rename( { suffix: '.min' } ) )
				.pipe( cleancss() )
				.pipe( sourcemaps.write() )
				.pipe( gulp.dest( 'assets/css' ) )
				.pipe( plumber.stop() );
}

gulp.task( 'style-admin', gulp.series( style_admin, done => {
	done();
}));

function style_admin() {
	return  gulp.src( 'src/style/backend/**/*.scss', { base: 'src' } )
				.pipe( plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) }) )
				.pipe( sourcemaps.init() )
				.pipe( sass({
					outputStyle: 'expanded'
				}).on( 'error', sass.logError ) )
				.pipe( autoprefixer({
					cascade: false,
					remove: false
				}) )
				.pipe( concat( 'admin.css' ) )
				.pipe( cleancss( { format: 'beautify' } ) )
				.pipe( sourcemaps.write() )
				.pipe( gulp.dest( 'assets/css' ) )
				.pipe( sourcemaps.init( { loadMaps: true } ) )
				.pipe( rename( { suffix: '.min' } ) )
				.pipe( cleancss() )
				.pipe( sourcemaps.write() )
				.pipe( gulp.dest( 'assets/css' ) );
}

/**
 * Scripts
 */
gulp.task( 'scripts', gulp.series( scripts, done => {
	done();
}));

function scripts() {
	return  gulp.src( ['src/js/frontend/layout/*.js', 'src/js/frontend/elements/*.js', 'src/js/frontend/functions.js'] )
				.pipe( sourcemaps.init() )
				.pipe( jshint( { esnext: true } ) )
				.pipe( jshint.reporter( 'default' ) )
				.pipe( concat( 'scripts.js' ) )
				.pipe( sourcemaps.write() )
				.pipe( gulp.dest( 'assets/js' ) )
				.pipe( terser() )
				.pipe( rename( { suffix: '.min' } ) )
				.pipe( gulp.dest( 'assets/js' ) );
}

gulp.task( 'scripts-admin', gulp.series( scripts_admin, done => {
	done();
}));

function scripts_admin() {
	return  gulp.src( 'src/js/backend/**/*.js' )
				.pipe( sourcemaps.init() )
				.pipe( jshint( { esnext: true } ) )
				.pipe( jshint.reporter( 'default' ) )
				.pipe( concat( 'admin.js' ) )
				.pipe( sourcemaps.write() )
				.pipe( gulp.dest( 'assets/js' ) )
				.pipe( terser() )
				.pipe( rename( { suffix: '.min' } ) )
				.pipe( gulp.dest( 'assets/js' ) );
}

/**
 * Images
 */
gulp.task( 'img-min', gulp.series( img_min, done => {
	done();
}));

function img_min() {
	return  gulp.src( 'src/img/*' )
				.pipe( imagemin() )
				.pipe( gulp.dest( 'assets/img' ) )
}

/**
 * SVG
 */
gulp.task( 'svg-sprite', gulp.series( svg_sprite, done => {
	done();
}));

function svg_sprite() {
    return  gulp.src( 'src/svg/*.svg' )
                .pipe( svgsprite({
                    mode : {
                        defs : true
                    }
                }) )
                .pipe( rename( 'icons.svg' ) )
                .pipe( gulp.dest( 'src/img' ) );
}
