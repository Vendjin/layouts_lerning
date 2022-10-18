const gulp = require('gulp');
const browserSync = require('browser-sync');
const compileSASS = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// запуск сервера
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

// компилируем файлы sass, (не изменения файлов, а компиляция)
gulp.task('styles', function () {
    return gulp.src("src/sass/*.+(scss|sass)")
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
        .pipe(gulp.dest("src/css"))
        // после компилирования файлов обновляем браузер
        .pipe(browserSync.stream());
});

// отслеживаем изменения файлов
gulp.task('watch', function () {
    // проверяем изменения в sass файлах, и запускаем компиляцию sass файлов
    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel("styles"))
    // проверка изменений во всех html файлах и запуск обновления браузера
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

// задача для запуска всех задач командой gulp
// gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
gulp.task('default', gulp.parallel('watch', 'server'));