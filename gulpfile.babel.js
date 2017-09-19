'use strict';

import gulp     from 'gulp';
import plugins  from 'gulp-load-plugins';
import browser  from 'browser-sync';
import rimraf   from 'rimraf';
import panini   from 'panini';
import yargs    from 'yargs';
import lazypipe from 'lazypipe';
import fs       from 'fs';
import path     from 'path';
import merge    from 'merge-stream';
import yaml     from 'js-yaml';
import gutil    from 'gulp-util';


// VARS
// ======================================================================
  const $ = plugins();
  const PRODUCTION = !!(yargs.argv.production);
  const { PORT, PATHS } = loadConfig();

  function loadConfig() {
    let ymlFile = fs.readFileSync('vitrine-config.yml', 'utf8');
    return yaml.load(ymlFile);
  }


// TASKS
// ======================================================================
  gulp.task('build',    gulp.series(clean, pages, sass, images, inline));
  gulp.task('default',  gulp.series('build', server, watch));  


// PAGES / IMAGES / SASS 
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
                .pipe(gulp.dest(PATHS.dist+'/css'));
  }


// FUNCTIONS
// ======================================================================
  function clean(done) { rimraf(PATHS.dist, done); }
  function resetPages(done) { panini.refresh(); done(); }
  
  function inline() {
    return  gulp.src(PATHS.dist+'/**/*.html')
                .pipe($.if(PRODUCTION, inliner(PATHS.dist+'/css/vitrine.css')))
                .pipe(gulp.dest(PATHS.dist));
  }

  function inliner(css) {
    var cssfile = fs.readFileSync(css).toString();
    
    var pipe = lazypipe()
      .pipe($.inlineCss, {
        applyStyleTags: false,
        applyLinkTags: true,
        preserveMediaQueries: true,
        removeStyleTags: false,
        removeLinkTags: false
      })
      .pipe($.replace, '<!-- <style> -->', cssfile)
      .pipe($.replace, '<link rel="stylesheet" type="text/css" href="css/vitrine.css">', '')
      .pipe($.htmlmin);

    return pipe();
  }


// SERVER / WATCH
// ======================================================================
  function server(done) { browser.init({ server: PATHS.dist }); done(); }

  function watch() {
    gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, inline, browser.reload));
    gulp.watch(['src/layouts/**/*', 'src/partials/**/*']).on('all', gulp.series(resetPages, pages, inline, browser.reload));
    gulp.watch(['src/assets/scss/**/*.scss', 'form/*.scss']).on('all', gulp.series(resetPages, sass, pages, inline, browser.reload));
    gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
    gulp.watch('src/data/*').on('all', gulp.series(resetPages, pages, inline, browser.reload));
    gulp.watch('vitrine-config.yml').on('all', gulp.series(resetPages, pages, inline, browser.reload));
  }
