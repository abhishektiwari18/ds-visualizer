var speed;
function initialize()
{
var elements=document.getElementById("elements").value;
var canvasId=document.getElementById("canvas");
document.getElementById("sorting").disabled = true;
document.getElementById("pause").setAttribute("class","pause btn btn-success");
elements=initializeList(elements);
var maxWidth=maxWidthOfElement(elements);
var defaultHeight=50;
var defaultWidth=50;
if(maxWidth>defaultWidth)
{
var temp=Math.floor(maxWidth+maxWidth+(maxWidth)/2);
defaultWidth=temp;
}//if
speed=100-document.getElementById("myRange").value;
document.getElementById("myRange").oninput=function(){
speed=100-this.value;
}
var shape=new Shape(defaultHeight,defaultWidth,elements,elements.length,canvasId);
shape.initializePass(20,20);
shape.toAnimate();
shape.initializePass(20+defaultWidth+40,20); 
//shape.initializePass(20+defaultWidth+40,20);
shape.selectionSort();

}//initialize function ends here

function initializeList(elements)
{
this.width=50;
this.height=50;
var elementsList=elements.split(",");
for(var i=0;i<elementsList.length;i++) elementsList[i]=parseInt(elementsList[i]);
return elementsList;
} // initializeList

function maxWidthOfElement(elements)
{
var maxWidth=0;
var tempWidth;
var context = document.getElementById("canvas").getContext("2d");
context.font = "20px Times New Roman";
for(var i=0;i<elements.length;i++)
{
var metrics = context.measureText(elements[i]);
tempWidth=metrics.width;
if(tempWidth>maxWidth)  maxWidth=tempWidth;
}
return maxWidth;
}

class Rectangle
{
constructor()
{
this.xCoordinate=0;
this.yCoordinate=0;
this.width=0;
this.height=0;
this.xList=[];
this.yList=[];
this.direction="";
this.statement="";
this.value=0;
}//rectangle constructor ends here
}// rectangle class ends here

class Shape
{
constructor(height,width,elementsList,numberOfElements,canvasId)
{
this.height=height;
this.width=width;
this.elements=elementsList;
this.numberOfElements=numberOfElements;
this.rectangles=new Array();
this.counter=0;
this.initialX=0;
this.initialY=0;
this.canvas=canvasId;
this.rectanglesXCoordinates=new Array();
this.rectanglesYCoordinates=new Array();
this.centerX=0;
this.centerY=0;
this.tempSpeed=100;//change
this.speed=this.tempSpeed-speed;//change
}// shape constructor


initializePass(x,y)
{
this.initialX=x;
this.initialY=y;
var c1=this.canvas.width-this.width;
var c2=(this.canvas.height/2);
this.centerX=c1;
this.centerY=c2;
var rectangle;
for(var i=0;i<this.numberOfElements;i++)
{
rectangle=new Rectangle();
rectangle.xCoordinate=x;
rectangle.yCoordinate=y;
rectangle.width=this.width;
rectangle.height=this.height;
rectangle.direction="diagonal";
rectangle.statement="";
var temp=this.getCoordinatesList(c1,c2,rectangle.xCoordinate,rectangle.yCoordinate);
rectangle.xList=temp[0];
rectangle.yList=temp[1];
rectangle.value=this.elements[i];
this.rectangles.push(rectangle);
this.rectanglesXCoordinates[i]=rectangle.xCoordinate;
this.rectanglesYCoordinates[i]=rectangle.yCoordinate;
y=y+this.height;
if(y+rectangle.height>= canvas.height) canvas.height+=(canvas.height)/5; //change
}//for
}//initializePass


getCoordinatesList(x1,y1,x2,y2)
{
x1=parseInt(x1)
x2=parseInt(x2)
y1=parseInt(y1)
y2=parseInt(y2)
var dFactor=5
var temp;
var ordinates=new Array();
var m=(y2-y1)/(x2-x1);
var c=y1-(m*x1);
var xcords=new Array();
var ycords=new Array();
if(x1<=x2)
{
if(x2==x1)
{
if(y2<y1)
{
for(;y1>=y2;y1-=dFactor)
{
xcords.push(x1);
ycords.push(y1);
}
}//upr ane ke liye if
else
{
for(;y1<=y2;y1+=dFactor)
{
xcords.push(x1);
ycords.push(y1);
}
}//niche jane ke liye else
}
else
{
for(;x1<=x2;x1+=dFactor)
{
temp=(m*x1)+c;
xcords.push(x1);
ycords.push(temp);
}
}
}//bada if khtm
else
{
for(;x1>=x2;x1-=dFactor)
{
temp=(m*x1)+c;
xcords.push(x1);
ycords.push(temp);
}
}
ordinates.push(xcords);
ordinates.push(ycords);
return ordinates;
}

toAnimate()
{
console.log("TO ANIMATE CHALA");
if(this.rectangles.length==this.counter) return;
var rectangle=this.rectangles[this.counter];
this.animate(rectangle);
this.counter++;
}

animate(rectangle)
{
var THIS=this;
var c1=this.centerX;
var c2=this.centerY;
var elementsList=this.elements;
var value=rectangle.value;
var t=function()
{
THIS.toAnimate()
}
var x1=rectangle.xCoordinate;
var y1=rectangle.yCoordinate;
var width=rectangle.width;
var height=rectangle.height;
var tempRectX= rectangle.xList;
var tempRectY=rectangle.yList;
var i=0;
var currentImg,nextImg,tempImg;

var isPaused = false;
$('.pause').on('click', function(e) {
document.getElementById("play").setAttribute("class","play btn btn-success");
document.getElementById("pause").setAttribute("class","pause btn btn-secondary");
e.preventDefault();
isPaused = true;
});

$('.play').on('click', function(e) {
document.getElementById("play").setAttribute("class","play btn btn-secondary");
document.getElementById("pause").setAttribute("class","pause btn btn-success");
e.preventDefault();
isPaused = false;
});

var intervals=setInterval(function(){
if(!isPaused)
{
var context=this.canvas.getContext('2d');
if(i==tempRectX.length)
{
clearInterval(intervals);
t();
return;
}
if(rectangle.direction=="right")
{
if(i>1) context.putImageData(tempImg,Math.floor(tempRectX[i-1]),Math.floor(tempRectY[i-1]));
if(i>0) tempImg=context.getImageData(Math.floor(tempRectX[i]),Math.floor(tempRectY[i]),width,height);
if(i!=0) context.putImageData(currentImg,Math.floor(tempRectX[i]),Math.floor(tempRectY[i]));
currentImg=context.getImageData(Math.floor(tempRectX[i]),Math.floor(tempRectY[i]),width,height);//if(i==0)
if(i+1!=tempRectX.length) nextImg=context.getImageData(Math.floor(tempRectX[i+1]),Math.floor(tempRectY[i+1]),width,height);
i++;
}
else
{
if(rectangle.direction=="down" || rectangle.direction=="up" || rectangle.direction=="left")
{
if(i>1) context.putImageData(tempImg,Math.floor(tempRectX[i-1]),Math.floor(tempRectY[i-1]));
if(i>0) tempImg=context.getImageData(Math.floor(tempRectX[i]),Math.floor(tempRectY[i]),width,height);
if(i!=0) context.putImageData(currentImg,Math.floor(tempRectX[i]),Math.floor(tempRectY[i]));
currentImg=context.getImageData(Math.floor(tempRectX[i]),Math.floor(tempRectY[i]),width,height);//if(i==0)
if(i==0) tempImg=context.getImageData(Math.floor(tempRectX[i]),Math.floor(tempRectY[i])+height+5,width,height);//need to change
if(i==0) context.putImageData(tempImg,Math.floor(tempRectX[i]),Math.floor(tempRectY[i]));
if(i+1!=tempRectX.length) nextImg=context.getImageData(Math.floor(tempRectX[i+1]),Math.floor(tempRectY[i+1]),width,height);
i++;
}
else
{
if(rectangle.direction="diagonal") 
{
context.font="27px Lucida Console";
//rectangle.statement="These Are The Elements You Have Entered For Sorting";
context.fillText(rectangle.statement,120,150);
context.font="20px Times New Roman";
if(i==1) context.putImageData(tempImg,Math.round(tempRectX[i-1])-2,Math.round(tempRectY[i-1])-2);
if(i>1) context.putImageData(tempImg,Math.round(tempRectX[i-1]),Math.round(tempRectY[i-1]));
if(i>0) tempImg=context.getImageData(Math.round(tempRectX[i]),Math.round(tempRectY[i]),width,height);
if(i!=0) context.putImageData(currentImg,Math.round(tempRectX[i]),Math.round(tempRectY[i]));
if(i==0)
{
tempImg=context.getImageData(Math.round(tempRectX[i])-2,Math.round(tempRectY[i])-2,width+4,height+4);//need to change
context.strokeRect(tempRectX[i],tempRectY[i],width,height);
context.fillText(value,tempRectX[i]+5,tempRectY[i]+30);
}
currentImg=context.getImageData(Math.round(tempRectX[i]),Math.round(tempRectY[i]),width,height);//if(i==0)
i++;
}//diagonal wala if move rect khtm
}//else
}//else
}//if(!isPaused)
},speed);//this.speed
}//animate



selectionSort()
{
var e,f,m,g,x,size;

var heightFactor=50;//change
var xOffset,yOffset;
x=this.elements;
size=this.numberOfElements;

//xOffset=150,yOffset=90
xOffset=3*this.width,yOffset=(2*this.width)-30;                               //minimum gape should be more than 20
//111,9,1,22222,3,4

e=0;
while(e<=size-2)
{
m=e;
f=e+1;
while(f<=size-1)
{
var rect1=new Rectangle();
rect1.xCoordinate=this.rectanglesXCoordinates[m];
rect1.yCoordinate=this.rectanglesYCoordinates[m];
rect1.width=parseInt(this.width);
rect1.height=parseInt(this.height);
var tempRect1;
tempRect1=this.getCoordinatesList(rect1.xCoordinate,rect1.yCoordinate,rect1.xCoordinate+xOffset,rect1.yCoordinate);
rect1.xList=tempRect1[0];
rect1.yList=tempRect1[1];
rect1.xList[rect1.xList.length]=rect1.xCoordinate+xOffset
rect1.yList[rect1.yList.length]=rect1.yCoordinate
rect1.direction="right";
//console.log("rect1 push",this.rectangles,rect1)
this.rectangles.push(rect1);
//console.log(rect1.xCoordinate,rect1.yCoordinate,rect1.xList[rect1.xList.length-1],rect1.yList[rect1.yList.length-1])
var rect2=new Rectangle();
rect2.xCoordinate=this.rectanglesXCoordinates[f];
rect2.yCoordinate=this.rectanglesYCoordinates[f];
rect2.width=parseInt(this.width);
rect2.height=parseInt(this.height);
tempRect1=this.getCoordinatesList(rect2.xCoordinate,rect2.yCoordinate,rect2.xCoordinate+yOffset,rect2.yCoordinate);
rect2.xList=tempRect1[0];
rect2.yList=tempRect1[1];

rect2.xList[rect2.xList.length]=rect2.xCoordinate+yOffset
rect2.yList[rect2.yList.length]=rect2.yCoordinate

rect2.direction="right"
this.rectangles.push(rect2);

if(x[f]<x[m])
{
var rect3=new Rectangle();
rect3.xCoordinate=rect1.xCoordinate+xOffset;
rect3.yCoordinate=rect1.yCoordinate;
rect3.width=parseInt(this.width);
rect3.height=parseInt(this.height);
tempRect1=this.getCoordinatesList(rect3.xCoordinate,rect3.yCoordinate,rect3.xCoordinate-xOffset,rect3.yCoordinate);
rect3.xList=tempRect1[0];
rect3.yList=tempRect1[1];
rect3.xList[rect3.xList.length]=rect3.xCoordinate-xOffset
rect3.yList[rect3.yList.length]=rect3.yCoordinate
rect3.direction="left"
this.rectangles.push(rect3);
//console.log(rect3.xCoordinate,rect3.yCoordinate,rect3.xList[rect3.xList.length-1],rect3.yList[rect3.yList.length-1])
var rect4=new Rectangle();
rect4.xCoordinate=rect2.xCoordinate+yOffset
rect4.yCoordinate=rect2.yCoordinate;
rect4.width=parseInt(this.width);
rect4.height=parseInt(this.height);
tempRect1=this.getCoordinatesList(rect4.xCoordinate,rect4.yCoordinate,rect4.xCoordinate-yOffset,rect4.yCoordinate);
rect4.xList=tempRect1[0];
rect4.yList=tempRect1[1];
rect4.xList[rect4.xList.length]=rect4.xCoordinate-yOffset
rect4.yList[rect4.yList.length]=rect4.yCoordinate
rect4.direction="left";
this.rectangles.push(rect4);
m=f;
}
else
{
var rect3=new Rectangle();
rect3.xCoordinate=rect1.xCoordinate+xOffset;
rect3.yCoordinate=rect1.yCoordinate;
rect3.width=parseInt(this.width);
rect3.height=parseInt(this.height);
tempRect1=this.getCoordinatesList(rect3.xCoordinate,rect3.yCoordinate,rect3.xCoordinate-xOffset,rect3.yCoordinate);
rect3.xList=tempRect1[0];
rect3.yList=tempRect1[1];
rect3.xList[rect3.xList.length]=rect3.xCoordinate-xOffset
rect3.yList[rect3.yList.length]=rect3.yCoordinate
rect3.direction="left"
this.rectangles.push(rect3);
//console.log(rect3.xCoordinate,rect3.yCoordinate,rect3.xList[rect3.xList.length-1],rect3.yList[rect3.yList.length-1])
var rect4=new Rectangle();
rect4.xCoordinate=rect2.xCoordinate+yOffset
rect4.yCoordinate=rect2.yCoordinate;
rect4.width=parseInt(this.width);
rect4.height=parseInt(this.height);
tempRect1=this.getCoordinatesList(rect4.xCoordinate,rect4.yCoordinate,rect4.xCoordinate-yOffset,rect4.yCoordinate);
rect4.xList=tempRect1[0];
rect4.yList=tempRect1[1];
rect4.xList[rect4.xList.length]=rect4.xCoordinate-yOffset
rect4.yList[rect4.yList.length]=rect4.yCoordinate
rect4.direction="left";
this.rectangles.push(rect4);
//----------------------directon no change
}//else khtm hua
f++;
}

if(m!=e)
{
var rect5=new Rectangle();
rect5.xCoordinate=this.rectanglesXCoordinates[e];
rect5.yCoordinate=this.rectanglesYCoordinates[e];
rect5.width=parseInt(this.width);
rect5.height=parseInt(this.height);
var tempRect1;
tempRect1=this.getCoordinatesList(rect5.xCoordinate,rect5.yCoordinate,rect5.xCoordinate+xOffset,rect5.yCoordinate);
rect5.xList=tempRect1[0];
rect5.yList=tempRect1[1];
rect5.xList[rect5.xList.length]=rect5.xCoordinate+xOffset
rect5.yList[rect5.yList.length]=rect5.yCoordinate
rect5.direction="right";
this.rectangles.push(rect5);

var rect6=new Rectangle();
rect6.xCoordinate=this.rectanglesXCoordinates[m];
rect6.yCoordinate=this.rectanglesYCoordinates[m];
rect6.width=parseInt(this.width);
rect6.height=parseInt(this.height);
tempRect1=this.getCoordinatesList(rect6.xCoordinate,rect6.yCoordinate,rect6.xCoordinate+yOffset,rect6.yCoordinate);
rect6.xList=tempRect1[0];
rect6.yList=tempRect1[1];
rect6.xList[rect6.xList.length]=rect6.xCoordinate+yOffset
rect6.yList[rect6.yList.length]=rect6.yCoordinate
rect6.direction="right"
this.rectangles.push(rect6);






var rect7=new Rectangle();
rect7.xCoordinate=rect5.xCoordinate+xOffset;//200
rect7.yCoordinate=rect5.yCoordinate;
rect7.width=parseInt(this.width);
rect7.height=parseInt(this.height);
tempRect1=this.getCoordinatesList(rect7.xCoordinate,rect7.yCoordinate,rect6.xCoordinate+xOffset,rect6.yCoordinate);
rect7.xList=tempRect1[0];
rect7.yList=tempRect1[1];
rect7.xList[rect7.xList.length]=rect6.xCoordinate+xOffset
rect7.yList[rect7.yList.length]=rect6.yCoordinate;
rect7.direction="down"
this.rectangles.push(rect7);

var rect8=new Rectangle();
rect8.xCoordinate=rect6.xCoordinate+yOffset
rect8.yCoordinate=rect6.yCoordinate;
rect8.width=parseInt(this.width);
rect8.height=parseInt(this.height);
tempRect1=this.getCoordinatesList(rect8.xCoordinate,rect8.yCoordinate,rect5.xCoordinate+yOffset,rect5.yCoordinate);
rect8.xList=tempRect1[0];
rect8.yList=tempRect1[1];
rect8.xList[rect8.xList.length]=rect5.xCoordinate+yOffset
rect8.yList[rect8.yList.length]=rect5.yCoordinate
rect8.direction="up";
this.rectangles.push(rect8);
//---------------------------------------------------direction up down
var rect9=new Rectangle();
rect9.xCoordinate=rect8.xList[rect8.xList.length-1];
rect9.yCoordinate=rect8.yList[rect8.yList.length-1];
rect9.width=parseInt(this.width);
rect9.height=parseInt(this.height);
tempRect1=this.getCoordinatesList(rect9.xCoordinate,rect9.yCoordinate,rect9.xCoordinate-yOffset,rect9.yCoordinate);
rect9.xList=tempRect1[0];
rect9.yList=tempRect1[1];
rect9.xList[rect9.xList.length]=rect9.xCoordinate-yOffset
rect9.yList[rect9.yList.length]=rect9.yCoordinate
rect9.direction="left"
this.rectangles.push(rect9);

var rect10=new Rectangle();
rect10.xCoordinate=rect7.xList[rect7.xList.length-1];
rect10.yCoordinate=rect7.yList[rect7.yList.length-1];
rect10.width=parseInt(this.width);
rect10.height=parseInt(this.height);
var tempRect1;
tempRect1=this.getCoordinatesList(rect10.xCoordinate,rect10.yCoordinate,rect10.xCoordinate-xOffset,rect10.yCoordinate);
rect10.xList=tempRect1[0];
rect10.yList=tempRect1[1];
rect10.xList[rect10.xList.length]=rect10.xCoordinate-xOffset
rect10.yList[rect10.yList.length]=rect10.yCoordinate
rect10.direction="left";
this.rectangles.push(rect10);
g=x[e];
x[e]=x[m];
x[m]=g;
}

e++; //----------------------------------------next pass 

var newX=this.initialX+this.width+40;
var newY=this.initialY;
console.log(newX,newY);
this.elements=x;
this.initializePass(newX,newY);
}//bda wala while ends here
};//Selectionsort function ends here



}//shape class
