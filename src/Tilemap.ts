import {GSquare} from "./Drawables/GSquare";
import {screen} from "./Main"
import {Tile,TileType} from "./Tile";

export class Tilemap
{
   numTilesX:number = 10;
   numTilesY:number = 10;
   tileHeight:number = 10;
   tileWidth:number = 10;
   tileMap:Tile[][];

   constructor(map:number[][])
   {
      this.numTilesX = map.length;
      this.numTilesY = map[0].length;

      this.tileWidth = screen.x/this.numTilesX * 2;
      this.tileHeight = screen.y/this.numTilesY * 2;

      this.tileMap = [];
      for(let x = 0; x < this.numTilesX; x++)
      {
         this.tileMap.push([]);
         for(let y = 0; y < this.numTilesY; y++)
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
               console.error("Error: Invalid map code");
                  t = TileType.Empty;
                  break;
            }
            this.tileMap[x].push(new Tile(x*this.tileWidth,y*this.tileHeight,this.tileWidth,this.tileHeight,t));
         }
      }
   }
}
