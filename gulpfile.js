var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	sourcemaps = require('gulp-sourcemaps');

// Because of order...
var frameworkFiles = [
	"framework/Common.js",
	"framework/ContentManager.js",
	"framework/GameComponent.js",
	"framework/GameTime.js",
	"framework/MathHelper.js",
	"framework/Rectangle.js",
	"framework/Matrix.js",
	"framework/Quaternion.js",
	"framework/Vector2.js",
	"framework/Vector3.js",
	"framework/Vector4.js",
	"framework/Input/Keyboard.js",
	"framework/Input/Mouse.js",
	"framework/Input/TouchPanel.js",
	"framework/Input/Gamepad.js",
	"framework/Input/Keys.js",
	"framework/Graphics/GraphicsDevice.js",
	"framework/Graphics/SpriteBatch.js",
	"framework/Graphics/RenderTarget.js",
	"framework/Graphics/SpriteBatch.js",
	"framework/Graphics/SpriteFont.js",
	"framework/Preloader.js",
	"framework/Game.js"
];

var engineFiles = [
	"dist/atlantis.framework.min.js",
	"engine/Random.js",
	"engine/AudioManager.js",
	"engine/StorageManager.js",
	"engine/LevelManager.js",
	"engine/Graphics/Animation.js",
	"engine/Graphics/Camera2D.js",
	"engine/Graphics/Sprite.js",
	"engine/Graphics/SpriteText.js",
	"engine/Graphics/SpriteGroup.js",
	"engine/Graphics/Tilemap.js",
	"engine/Graphics/TmxLoader.js",
	"engine/Input/KeyboardComponent.js",
	"engine/Input/TouchComponent.js",
	"engine/Level.js",
	"engine/GameApplication.js"
];

gulp.task("framework", function () {
    return gulp.src(frameworkFiles)
        .pipe(concat("atlantis.framework.min.js"))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"));
});

gulp.task("engine", ["framework"], function () {
	return gulp.src(engineFiles)
        .pipe(concat("atlantis.min.js"))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"));
});

gulp.task("default", function() {
    gulp.start("engine");
});