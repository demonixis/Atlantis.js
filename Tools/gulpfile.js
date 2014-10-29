var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	clean = require("gulp-clean");
	
var frameworkFiles = [
	"../Framework/Compatibility.js",
	"../Framework/Common.js",
	"../Framework/ContentManager.js",
	"../Framework/GameComponent.js",
	"../Framework/GameTime.js",
	"../Framework/MathHelper.js",
	"../Framework/Rectangle.js",
	"../Framework/Matrix.js",
	"../Framework/Quaternion.js",
	"../Framework/Vector2.js",
	"../Framework/Vector3.js",
	"../Framework/Vector4.js",
	"../Framework/Input/Keyboard.js",
	"../Framework/Input/Mouse.js",
	"../Framework/Input/TouchPanel.js",
	"../Framework/Input/Gamepad.js",
	"../Framework/Input/Keys.js",
	"../Framework/Graphics/GraphicsDevice.js",
	"../Framework/Graphics/SpriteBatch.js",
	"../Framework/Graphics/RenderTarget.js",
	"../Framework/Graphics/SpriteBatch.js",
	"../Framework/Graphics/SpriteFont.js",
	"../Framework/Preloader.js",
	"../Framework/Game.js"
];

var engineFiles = [
	"../Build/Atlantis.Framework.min.js",
	"../Engine/Random.js",
	"../Engine/AudioManager.js",
	"../Engine/StorageManager.js",
	"../Engine/LevelManager.js",
	"../Engine/Graphics/Animation.js",
	"../Engine/Graphics/Camera2D.js",
	"../Engine/Graphics/Sprite.js",
	"../Engine/Graphics/SpriteGroup.js",
	"../Engine/Graphics/Tilemap.js",
	"../Engine/Graphics/TmxLoader.js",
	"../Engine/Input/KeyboardComponent.js",
	"../Engine/Input/TouchComponent.js",
	"../Engine/Level.js",
	"../Engine/GameApplication.js"
];

gulp.task("framework", function () {
    return gulp.src(frameworkFiles)
        .pipe(concat("Atlantis.Framework.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("../Build"));
});

gulp.task("engine", ["framework"], function () {
	return gulp.src(engineFiles)
        .pipe(concat("Atlantis.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("../Build"));
});

gulp.task("default", function() {
    gulp.start("engine");
});