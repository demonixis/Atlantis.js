SET js_framework=--js=Framework/Compatibility.js
SET js_framework=%js_framework% --js=Framework/Common.js
SET js_framework=%js_framework% --js=Framework/ContentManager.js
SET js_framework=%js_framework% --js=Framework/GameComponent.js
SET js_framework=%js_framework% --js=Framework/GameTime.js
SET js_framework=%js_framework% --js=Framework/MathHelper.js
SET js_framework=%js_framework% --js=Framework/Matrix.js
SET js_framework=%js_framework% --js=Framework/Quaternion.js
SET js_framework=%js_framework% --js=Framework/Rectangle.js
SET js_framework=%js_framework% --js=Framework/Vector2.js
SET js_framework=%js_framework% --js=Framework/Vector3.js
SET js_framework=%js_framework% --js=Framework/Vector4.js
SET js_framework=%js_framework% --js=Framework/Input/Keys.js
SET js_framework=%js_framework% --js=Framework/Input/Keyboard.js
SET js_framework=%js_framework% --js=Framework/Input/Mouse.js
SET js_framework=%js_framework% --js=Framework/Input/TouchPanel.js
SET js_framework=%js_framework% --js=Framework/Input/Gamepad.js
SET js_framework=%js_framework% --js=Framework/Graphics/RenderTarget.js
SET js_framework=%js_framework% --js=Framework/Graphics/GraphicsDevice.js
SET js_framework=%js_framework% --js=Framework/Graphics/SpriteFont.js
SET js_framework=%js_framework% --js=Framework/Graphics/SpriteBatch.js
SET js_framework=%js_framework% --js=Framework/Preloader.js
SET js_framework=%js_framework% --js=Framework/Game.js

SET js_engine=--js=Engine\AudioManager.js
SET js_engine=%js_engine% --js=Engine/Random.js
SET js_engine=%js_engine% --js=Engine/StateManager.js
SET js_engine=%js_engine% --js=Engine/StorageManager.js
SET js_engine=%js_engine% --js=Engine/Input/KeyboardComponent.js
SET js_engine=%js_engine% --js=Engine/GameApplication.js
SET js_engine=%js_engine% --js=Engine/Graphics/Animation.js
SET js_engine=%js_engine% --js=Engine/Graphics/Camera2D.js
SET js_engine=%js_engine% --js=Engine/Graphics/Sprite.js
SET js_engine=%js_engine% --js=Engine/Graphics/SpriteGroup.js
SET js_engine=%js_engine% --js=Engine/Graphics/Scene2D.js
SET js_engine=%js_engine% --js=Engine/Graphics/Tilemap.js
SET js_engine=%js_engine% --js=Engine/Graphics/TmxLoader.js

java -jar compiler.jar %js_framework% --js_output_file=Build\Atlantis.Framework.min.js
java -jar compiler.jar %js_framework% %js_engine% --js_output_file=Build\AtlantisEngine.min.js

yuidoc .