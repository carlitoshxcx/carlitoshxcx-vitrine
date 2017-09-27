'use strict';

import pkg           from './package.json';
import gulp          from 'gulp';
import header        from 'gulp-header';
import uglify        from 'gulp-uglify';
import notify        from 'gulp-notify';
import gutil         from 'gulp-util';
import plugins       from 'gulp-load-plugins';
import browser       from 'browser-sync';
import merge         from 'merge-stream';
import lazypipe      from 'lazypipe';
import panini        from 'panini';
import rimraf        from 'rimraf';
import yaml          from 'js-yaml';
import yargs         from 'yargs';
import path          from 'path';
import fs            from 'fs';


// VARS
// ======================================================================
  const banner = ['/**',
                  ' * <%= pkg.name %> - <%= pkg.description %>',
                  ' * @author <%= pkg.author %>',
                  ' * @link <%= pkg.homepage %>',
                  ' * @version v<%= pkg.version %>',
                  ' */',
                  ''].join('\n');
  const $ = plugins();
  const PRODUCTION = !!(yargs.argv.production);

  var PORT, 
    COMPATIBILITY, 
    UNCSS_OPTIONS, 
    PATHS;


// TASKS
// ======================================================================
  gulp.task('build',    gulp.series(loadConfig, clean, pages, scripts, sass, images, inline));
  gulp.task('default',  gulp.series('build', server, watch));  


// PAGES / SCRIPTS / IMAGES / SASS 
// ======================================================================
  function pages() {
    return  gulp.src('src/pages/**/*.html')
                .pipe(panini({
                  root:     'src/pages',
                  layouts:  'src/layouts',
                  partials: 'src/partials',
                  data:     'src/data/',
                  helpers:  'src/helpers'
                }))
                .pipe(gulp.dest(PATHS.dist));
                // .pipe($.htmlmin({ collapseWhitespace: true, minifyCSS: true }))
  }

  function jsonp(){
    return gulp.src(PATHS.javascript+'/*.json')
              .pipe($.if(PRODUCTION, $.notify('JSONP.min: '+ pkg.version +' updated.')))
              .pipe($.if(!PRODUCTION,$.notify('JSONP: '+ pkg.version +' updated.')))
              .pipe(gulp.dest(PATHS.dist+'/js'));
  }

  function scripts(){
    jsonp();
    
    return gulp.src(PATHS.javascript+'/*.js')
              .pipe($.header(banner, { pkg : pkg } ))
              .pipe(gulp.dest(PATHS.dist+'/js'))
              .pipe($.if(PRODUCTION, $.uglify()))
              .pipe($.if(PRODUCTION, $.rename({ suffix: pkg.version + '.min' })))
              .pipe($.if(PRODUCTION, $.header(banner, { pkg : pkg } )))
              .pipe($.if(PRODUCTION, $.notify('JS.min: '+ pkg.version +' updated.')))
              .pipe($.if(!PRODUCTION,$.notify('JS: '+ pkg.version +' updated.')))
              .pipe(gulp.dest(PATHS.dist+'/js'));
              // .pipe($.htmlmin({ collapseWhitespace: true, minifyCSS: true }))
  }

  function images() {
    return  gulp.src('src/assets/img/**/*')
                .pipe($.imagemin({ progressive: true }))
                .pipe(gulp.dest('./'+PATHS.dist+'/assets/img'));
  }

  function sass() {
    return  gulp.src('src/assets/scss/vitrine.scss')
                .pipe($.if(!PRODUCTION, $.sourcemaps.init()))
                .pipe($.sass({
                  outputStyle: 'expanded'
                }).on('error', $.sass.logError))
                .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
                .pipe($.header(banner, { pkg : pkg } ))
                .pipe(gulp.dest(PATHS.dist+'/css'));
                // .pipe($.htmlmin({collapseWhitespace: true, minifyCSS: true }))
  }


// FUNCTIONS
// ======================================================================
  function clean(done) { rimraf(PATHS.dist, done); }
  function resetPages(done) { panini.refresh(); done(); }

  function loadConfig(done) {
    let ymlFile = fs.readFileSync('vitrine-config.yml', 'utf8');
    
    var config = yaml.load(ymlFile);
    
    console.log( config );

    PORT            = config.PORT,
    COMPATIBILITY   = config.COMPATIBILITY,
    UNCSS_OPTIONS   = config.UNCSS_OPTIONS,
    PATHS           = config.PATHS;

    done();
  }

  function inline() {
    return  gulp.src(PATHS.dist+'/**/*.html')
                .pipe($.if(PRODUCTION, inlinerCSS(PATHS.dist+'/css/vitrine.css')))
                .pipe($.if(PRODUCTION, inlinerJS(PATHS.dist+'/js/vitrine.js')))
                .pipe(gulp.dest(PATHS.dist))
                .pipe($.notify('Inline CSS/JS and minify HTML: OK!'));
                // .pipe($.htmlmin({ collapseWhitespace: true, minifyCSS: true }))
  }

  function inlinerCSS(css) {
    gutil.log("inlinerCSS("+css+")");
    var filecss = fs.readFileSync(css).toString();
    var pipe = lazypipe()
      .pipe($.inlineCss, {
        applyStyleTags: false,
        applyLinkTags: true,
        preserveMediaQueries: true,
        removeStyleTags: false,
        removeLinkTags: false
      })
      .pipe($.replace, '<!-- <style> -->', '<style>\n'+ filecss +'\n</style>')
      .pipe($.replace, '<link rel="stylesheet" type="text/css" href="css/vitrine.css">', '');

    return pipe();
  }

  function inlinerJS(js) {
    gutil.log("inlinerJS("+js+")");
    var filejs = fs.readFileSync(js).toString();
    var pipe = lazypipe()
      .pipe($.replace, '<!-- <scripts> -->', '<script type="text/javascript">\n'+ filejs +'\n</script>')
      .pipe($.replace, '<script type="text/javascript" src="js/vitrine.js"></script>', '');

    return pipe();
  }


// SERVER / WATCH
// ======================================================================
  function server(done) { browser.init({ server: PATHS.dist, port: PORT }); done(); }
  function refreshServer(done) { browser.reset(); browser.exit(); done(); }

  function watch() {
    gulp.watch('src/pages/**/*.html').on('all', gulp.series(resetPages, pages, inline, browser.reload));
    gulp.watch(['src/layouts/**/*', 'src/partials/**/*']).on('all', gulp.series(resetPages, pages, inline, browser.reload));
    gulp.watch(['src/assets/scss/**/*.scss', 'form/*.scss']).on('all', gulp.series(resetPages, sass, pages, inline, browser.reload));
    gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
    gulp.watch('src/assets/js/**/*').on('all', gulp.series(resetPages, scripts, pages, inline, browser.reload));
    gulp.watch('src/data/*').on('all', gulp.series(resetPages, pages, inline, browser.reload));
    gulp.watch('vitrine-config.yml').on('all', gulp.series(clean, resetPages, refreshServer, loadConfig, pages, inline, browser.reload));
  }
