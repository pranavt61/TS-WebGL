import {GSquare} from "./Drawables/GSquare";
import {Vec2, Vec3} from "./Drawables/Vector"

export class Tile
{
   type:TileType;
   rect:GSquare;
   constructor(x: number, y:number, w:number, h:number, type:TileType)
   {
      this.type = type;

      let r:number = 0;
      let g:number = 0;
      let b:number = 0;

      switch(type)
      {
         case TileType.Empty:
            r = 1;
            g = 1;
            b = 1;
            break;
         case TileType.Solid:
            r = 1;
            break;
         default:
            console.error("Error: invalid tile type");
            g = 1;
            break;
      }

      this.rect = new GSquare(new Vec2(x, y),new Vec2(w, h), new Vec3(r, g, b));
   }

   setType(type:number)
   {
      //TODO
      switch(type)
      {
         case 0:
            this.rect.
            break;
         case 1:
            break;
         default:
            break;
      }
   }

   //testing
   setPosition(pos:Vec2):void
   {
      this.rect.setPosition(pos);
   }

   //testing
   setColor(col:Vec3):void
   {
      this.rect.setColor(col);
   }
}

export enum TileType{
   Empty = 0,
   Solid = 1
}
