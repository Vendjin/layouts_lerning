const gulp = require('gulp');
const browserSync = require('browser-sync');
const compileSASS = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// запуск сервера
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    // проверка изменений во всех html файлах и запуск обновления браузера
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

// компилируем файлы sass, (не изменения файлов, а компиляция)
gulp.task('styles', function () {
    return gulp.src("src/scss/**/*.+(scss|sass)")
        // компилируем код из src в sass в сжатом стиле в файл style.css
        .pipe(compileSASS(
            {outputStyle: 'compressed'}
        ).on('error', compileSASS.logError))
        // скомпилированный файл style.css переименуется в style.min.css
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        // после скольки изменений перекомпилировать файл
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        // скомпилированный код кладем в файл
        .pipe(gulp.dest("dist/css"))
        // после компилирования файлов обновляем браузер
        .pipe(browserSync.stream());
});

// отслеживаем изменения файлов
gulp.task('watch', function () {
    // проверяем изменения в sass файлах, и запускаем компиляцию sass файлов
    gulp.watch("src/scss/**/*.+(scss|sass|css)", gulp.parallel("styles"))

    gulp.watch("src/*.html").on("change", gulp.parallel('html'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"))

});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"))
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*.+(svg|png)")
        .pipe(gulp.dest("dist/icons"))
});

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
});


// задача для запуска всех задач командой gulp
// gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
gulp.task('default', gulp.parallel('watch', 'server','styles', 'html', 'scripts', 'fonts', 'icons', 'images'));