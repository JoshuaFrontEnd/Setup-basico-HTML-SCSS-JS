const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sortCSSmq = require('sort-css-media-queries');
const browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', function () {
  browserSync.init({
    server: './html'
  });
  gulp.watch('html/assets/sass/**/*.scss', ['sass']);
  gulp.watch('html/*.html').on('change', browserSync.reload);
  gulp.watch('html/assets/js/*.js').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  var postCSSplugins = [
    require('autoprefixer')({
      browsers: ['last 2 versions', '> 2%']
    }),
    require('css-mqpacker')({
      sort: sortCSSmq
    })
  ];
  return gulp.src('html/assets/sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss(postCSSplugins))
    .pipe(gulp.dest('html/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['sass', 'serve']);