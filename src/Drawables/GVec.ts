export class GVec2
{
   private x:number;
   private y:number;
   constructor(x:number, y:number)
   {
      this.x = x;
      this.y = y;
   }

   getX():number{return this.x;}
   getY():number{return this.y;}
}

export class GVec3
{
   private x:number;
   private y:number;
   private z:number;

   constructor(x:number, y:number, z:number)
   {
      this.x = x;
      this.y = y;
      this.z = z;
   }

   getX():number{return this.x;}
   getY():number{return this.y;}
   getZ():number{return this.z;}

}
