import {screen, numRects, VertexData, IndexData} from "../Main";
import {GVec2} from "./GVec";

export class GSquare{

   //contains all vertex data for this rect
   rectPoints:number[][];
   screenPos:GVec2;
   width:number;
   height:number;

   constructor(x: number, y:number, w:number, h:number, r:number, g:number, b:number)
   {
      this.rectPoints = [];
      this.screenPos = new GVec2(x,y);
      this.width = w;
      this.height = h;

      //init points
      this.rectPoints.push([(x/screen.x),(y)/screen.y]);
      this.rectPoints.push([(x + w)/screen.x,(y)/screen.y]);
      this.rectPoints.push([(x + w)/screen.x,(y - h)/screen.y]);
      this.rectPoints.push([(x)/screen.x,(y - h)/screen.y]);

      for(let i = 0; i < this.rectPoints.length; i ++)
      {
         this.rectPoints[i][0] += -1;                          // screen x offset
         this.rectPoints[i][1] += -(1 - this.height/screen.y); // screen y offset(leave this offset, keeps tilemap in place)
         this.rectPoints[i][1] *= -1;                          // invert y

         //add color data
         this.rectPoints[i].push(r);
         this.rectPoints[i].push(g);
         this.rectPoints[i].push(b);
      }

      //add to vertex buffer
      for(let i = 0; i < this.rectPoints.length; i ++)
         for(let j = 0; j < this.rectPoints[i].length; j ++)
            VertexData.push(this.rectPoints[i][j]);

      //add to index buffer
      let i = 4 * numRects;
      IndexData.push(i);
      IndexData.push(i + 1);
      IndexData.push(i + 2);
      IndexData.push(i);
      IndexData.push(i + 2);
      IndexData.push(i + 3);

      numRects++;
   }
}
