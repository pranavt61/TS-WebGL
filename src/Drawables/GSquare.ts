import {screen, numRects, VertexData, IndexData} from "../Main";
import {Vec2, Vec3} from "./Vector";

export class GSquare{

   //contains all vertex data for this rect
   rectPoints:number[][];
   screenPos:Vec2;
   dimension:Vec2;
   color:Vec3;
   id:number; // used to find position in vertexData

   constructor(position:Vec2, dimension:Vec2, color:Vec3)
   {

      this.rectPoints = [];
      this.screenPos = position;
      this.dimension = dimension;
      this.color = color;
      this.id = numRects ++;

      //transformations
      this.screenPos.setX(this.screenPos.getX() - screen.x);
      this.screenPos.setY(this.screenPos.getY() - screen.y);
      this.screenPos.setY(this.screenPos.getY() * -1);

      //this.dimension.setX(this.dimension.getX() + -1);
      //this.dimension.setY(this.dimension.getY() + -(1 - this.dimension.getY()/screen.y));
      //this.dimension.setY(this.dimension.getY() * -1);

      //TODO

      //init points
      this.rectPoints.push(
         [
            (this.screenPos.getX()/screen.x),
            (this.screenPos.getY())/screen.y
         ]);

      this.rectPoints.push(
         [
            (this.screenPos.getX() + this.dimension.getX())/screen.x,
            (this.screenPos.getY())/screen.y
         ]);
      this.rectPoints.push(
         [
            (this.screenPos.getX() + this.dimension.getX())/screen.x,
            (this.screenPos.getY() - this.dimension.getY())/screen.y
         ]);
      this.rectPoints.push(
         [
            (this.screenPos.getX())/screen.x,
            (this.screenPos.getY() - this.dimension.getY())/screen.y
         ]);

      for(let i = 0; i < this.rectPoints.length; i ++)
      {
         //add color data
         this.rectPoints[i].push(this.color.getX());
         this.rectPoints[i].push(this.color.getY());
         this.rectPoints[i].push(this.color.getZ());
      }

      //add to vertex buffer
      for(let i = 0; i < this.rectPoints.length; i ++)
         for(let j = 0; j < this.rectPoints[i].length; j ++)
            VertexData.push(this.rectPoints[i][j]);

      //add to index buffer
      let i = 4 * this.id;
      IndexData.push(i);
      IndexData.push(i + 1);
      IndexData.push(i + 2);
      IndexData.push(i);
      IndexData.push(i + 2);
      IndexData.push(i + 3);

   }

   setColor(color:Vec3):void{
      //TODO
      this.color.set(color);

      let i:number;

      for(i = this.id * 20; i < (this.id + 1) * 20; i += 5)
      {
         VertexData[i + 2] = color.getX();
         VertexData[i + 3] = color.getY();
         VertexData[i + 4] = color.getZ();
      }

   }

   setPosition(pos:Vec2):void
   {
      //TODO

      this.screenPos.set(pos);

      //reset VertexData
      let i = this.id * 20;
      VertexData[i]     = this.screenPos.getX() / screen.x;
      VertexData[i + 1] = this.screenPos.getY() / screen.y;

      VertexData[i + 5] = (this.screenPos.getX() + this.dimension.getX()) / screen.x;
      VertexData[i + 6] = this.screenPos.getY() / screen.y;

      VertexData[i + 10] = (this.screenPos.getX() + this.dimension.getX()) / screen.x;
      VertexData[i + 11] = (this.screenPos.getY() - this.dimension.getY()) / screen.y;

      VertexData[i + 15] = (this.screenPos.getX()) / screen.x;
      VertexData[i + 16] = (this.screenPos.getY() - this.dimension.getY()) / screen.y;
   }

   getPosition():Vec2
   {
      return this.screenPos;
   }
}
