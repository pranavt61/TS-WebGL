import {GSquare} from "./Drawables/GSquare";
import {screen, resizeCanvas} from "./Main"
import {Tile,TileType} from "./Tile";

export var tileProps = {
   height: 1,
   width: 1,
   numX: 1,
   numY: 1
};

export class Tilemap
{
   tileMap:Tile[][];

   constructor(map:number[][])
   {
      tileProps.numY = map.length;
      tileProps.numX = map[0].length;

      console.log(tileProps.numX, ' : ', tileProps.numY);

      resizeCanvas();

      this.tileMap = [];
      for(let x = 0; x < tileProps.numX; x++)
      {
         this.tileMap.push([]);
         for(let y = 0; y < tileProps.numY; y++)
         {
            let t:TileType;
            // swap read of array, fixes issues
            switch(map[y][x])
            {
               case 0:
                  t = TileType.Empty;
                  break;
               case 1:
                  t = TileType.Solid;
                  break;
               default:
               console.error("Error: Invalid map code: ", map[y][x]);
                  t = TileType.Empty;
                  break;
            }
            this.tileMap[x].push
            (
               new Tile
               (
                  x* tileProps.width,
                  y * tileProps.height,
                  tileProps.width,
                  tileProps.height,
                  t
               )
            );
         }
      }

      resizeCanvas();
      console.log(tileProps.width + " : " + tileProps.height);
   }

   setTile(type:number):void
   {
      //TODO
      this.tileMap
   }

   getTile(x:number, y:number):Tile
   {
      return this.tileMap[x][y];
   }
}
