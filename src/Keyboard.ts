var KeyCode = {
   UP: 38,
   DOWN: 40,
   LEFT: 37,
   RIGHT: 39
};

export var KeyPressed = {
   UP: false,
   DOWN: false,
   LEFT: false,
   RIGHT: false
};


export var initKeyListeners = function()
{
   document.addEventListener('keydown', function(e) {
      switch(e.keyCode)
      {
         case KeyCode.UP:
            KeyPressed.UP = true;
            e.preventDefault();
            break;
         case KeyCode.DOWN:
            KeyPressed.DOWN = true;
            e.preventDefault();
            break;
         case KeyCode.LEFT:
            KeyPressed.LEFT = true;
            e.preventDefault();
            break;
         case KeyCode.RIGHT:
            KeyPressed.RIGHT = true;
            e.preventDefault();
            break;
         default:
            break;
      }
   });

   document.addEventListener('keyup', function(e) {
      switch(e.keyCode)
      {
         case KeyCode.UP:
            KeyPressed.UP = false;
            break;
         case KeyCode.DOWN:
            KeyPressed.DOWN = false;
            break;
         case KeyCode.LEFT:
            KeyPressed.LEFT = false;
            break;
         case KeyCode.RIGHT:
            KeyPressed.RIGHT = false;
            break;
         default:
            break;
      }
   });
};
