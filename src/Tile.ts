import {GSquare} from "./Drawables/GSquare";
import {Vec2, Vec3} from "./Drawables/Vector"

export class Tile
{
   type:TileType;
   rect:GSquare;
   constructor(x: number, y:number, w:number, h:number, type:TileType)
   {
      this.type = type;

      let color:Vec3 = new Vec3();

      switch(type)
      {
         case TileType.Empty:
            color.setR(255);
            color.setG(255);
            color.setB(255);
            break;
         case TileType.Solid:
            color.setR(255);
            break;
         default:
            console.error("Error: invalid tile type");
            color.setG(255);
            break;
      }

      this.rect = new GSquare(new Vec2(x, y), new Vec2(w, h), color);
   }

   setType(type:number)
   {
      this.type = type;

      let color:Vec3 = new Vec3();

      switch(type)
      {
         case TileType.Empty:
            color.setR(255);
            color.setG(255);
            color.setB(255);
            break;
         case TileType.Solid:
            color.setR(255);
            break;
         default:
            console.error("Error: invalid tile type");
            color.setG(255);
            break;
      }

      this.rect.setColor(color);
   }

   getRect():GSquare
   {
      return this.rect;
   }

}

export enum TileType{
   Empty = 0,
   Solid = 1
}
