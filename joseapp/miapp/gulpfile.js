//Minificar js y css

var gulp = require('gulp'),//require gulp global
    //minificar css require gulp-cssmin, gulp-rename, gulp-concat-css
	cssmin = require('gulp-cssmin'),//el nombre de las variables lo puedo cambiar
    rename = require('gulp-rename'),//lo que no puedo cambiar es el nombre del require, es decir siempre el archivo se va llamar 'gulp-cssmin', 'gulp-rename', 'gulp-concat-css' 
    concatCss = require('gulp-concat-css');
    //minificar js require gulp-concat y gulp uglify
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

//Proceso para minificar css
gulp.task('concat-css', function(){//en este caso el orden de los archivos si altera el resultado, se va a concatenar todos los css 
    return gulp.src(['www/css/index.css'])//primero concatena normalize, luego skeleton y por último styles
        .pipe(concatCss('all.css'))//el pipe cocatCss me va a renombrar el nuevo archivo
        .pipe(gulp.dest('www/css/'));//el pipe gulp.dest me va a llamar la carpeta en donde se va a guardar el css final, en este caso bundle.css
});

gulp.task('minify-css', ['concat-css'], function(){
  return gulp.src('www/css/all.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))//lo renombra agregandole el sufijo .min
    .pipe(gulp.dest('dist/'));
});

/*
* proceso para minificar js
*/
gulp.task('concat-files', function(){
    gulp.src('www/js/*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/'))//en la carpeta build se va a alojar mi archivo .min; esta carpeta se crea automáticamente
});