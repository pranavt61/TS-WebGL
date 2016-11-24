import {GSquare} from "./Drawables/GSquare";

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

      this.rect = new GSquare(x, y, w, h, r, g, b);
   }
}

export enum TileType{
   Empty = 0,
   Solid = 1
}
