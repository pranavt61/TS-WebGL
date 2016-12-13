export class Vec2
{
   private x:number;
   private y:number;
   constructor(x?:number, y?:number)
   {
      this.x = x;
      this.y = y;
   }

   getX():number{return this.x;}
   getY():number{return this.y;}

   setX(x:number){this.x = x;}
   setY(y:number){this.y = y;}

   set(vec ?: Vec2)
   {
      if(vec != null)
      {
         this.x = vec.getX();
         this.y = vec.getY();
      }
   }

   //find distance between this point and parameter
   dist(vec:Vec2):number
   {
      //TODO
      return 0;
   }
}

export class Vec3
{
   private x:number;
   private y:number;
   private z:number;

   constructor(x?:number, y?:number, z?:number)
   {
      this.x = x;
      this.y = y;
      this.z = z;
   }

   getX():number{return this.x;}
   getY():number{return this.y;}
   getZ():number{return this.z;}

   setX(x:number){this.x = x;}
   setY(y:number){this.y = y;}
   setZ(z:number){this.z = z;}

   //color coords
   getR():number{return this.x;}
   getG():number{return this.y;}
   getB():number{return this.z;}

   setR(x:number){this.x = x;}
   setG(y:number){this.y = y;}
   setB(z:number){this.z = z;}

   set(vec:Vec3)
   {
      this.x = vec.getX();
      this.y = vec.getY();
      this.z = vec.getZ();
   }

   //find distance between this point and parameter
   dist(vec:Vec3):number
   {
      //TODO
      return 0;
   }
}
