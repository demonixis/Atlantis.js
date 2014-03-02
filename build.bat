SET js_framework=--js=Framework/Compatibility.js
SET js_framework=%js_framework% --js=Framework/ContentManager.js
SET js_framework=%js_framework% --js=Framework/GameComponent.js
SET js_framework=%js_framework% --js=Framework/GameTime.js
SET js_framework=%js_framework% --js=Framework/Helpers.js
SET js_framework=%js_framework% --js=Framework/MathHelper.js
SET js_framework=%js_framework% --js=Framework/Matrix.js
SET js_framework=%js_framework% --js=Framework/Quaternion.js
SET js_framework=%js_framework% --js=Framework/Rectangle.js
SET js_framework=%js_framework% --js=Framework/Vector2.js
SET js_framework=%js_framework% --js=Framework/Vector3.js
SET js_framework=%js_framework% --js=Framework/Vector4.js
SET js_framework=%js_framework% --js=Framework/Input/Keys.js
SET js_framework=%js_framework% --js=Framework/Input/KeyboardManager.js
SET js_framework=%js_framework% --js=Framework/Input/PointerManager.js
SET js_framework=%js_framework% --js=Framework/Graphics/RenderTarget.js
SET js_framework=%js_framework% --js=Framework/Graphics/GraphicsDevice.js
SET js_framework=%js_framework% --js=Framework/Graphics/Texture2D.js
SET js_framework=%js_framework% --js=Framework/Graphics/SpriteBatch.js
SET js_framework=%js_framework% --js=Framework/Game.js

SET js_engine=--js=Engine\AudioManager.js
SET js_engine=%js_engine% --js=Engine/StateManager.js
SET js_engine=%js_engine% --js=Engine/StorageManager.js
SET js_engine=%js_engine% --js=Engine/Interpolator.js
SET js_engine=%js_engine% --js=Engine/Input/KeyboardComponent.js
SET js_engine=%js_engine% --js=Engine/GameApplication.js
SET js_engine=%js_engine% --js=Engine/Graphics/Animation.js
SET js_engine=%js_engine% --js=Engine/Graphics/Sprite.js
SET js_engine=%js_engine% --js=Engine/Graphics/SpriteGroup.js


java -jar compiler.jar %js_framework% --js_output_file=Build\Atlantis.Framework.min.js
java -jar compiler.jar %js_engine% --js_output_file=Build\Atlantis.Engine.min.js
java -jar compiler.jar %js_framework% %js_engine% --js_output_file=Build\AtlantisEngine.Complete.min.js

yuidoc .