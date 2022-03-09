import { Line } from "react-konva";
import { getPolygonPoints } from "./CanvasUtils.js";
import { useState  } from 'react';
import axios from 'axios';
import { useEffect } from "react";
import { hextoRGBA, lineStyle ,gradientStartPoints ,gradientEndPoints } from './Utils';


const UNCPolygon = (shapeProps) => {
  const { shape, parentX, parentY } = shapeProps;

const [hide, setHide] = useState(0);
const [dynamcifill, setDynamicFill] = useState(0);
const [fillColor, setFillColor] = useState('');



  //Dynamci_fILL---------------------------------------------------------------
if(shape.dynamic_fill != undefined)
{
  var value = shape.dynamic_fill.on_off.on_color_when.__cdata;
  ////console.log("Polygon-Dynamci_fill")

      //Removing DataTypes ---Float,
      value = value.replace("static","");
       value = value.replace("int","");
       value = value.replace("float","");
       value = value.replace("double","");
       value = value.replace("bool","");
       value = value.replace("boolean","");
    
    
       value = value.replace(/\r\n|\n|\r/gm ,"$");
  
       value = value + "$;";
//   axios({
//     method: 'post',
//     url: "http://192.168.0.45/ScadaClient/api/ExpressionEval/GetExprVal",
//     headers: {}, 
//     data: {
//       InputScript:value, // This is the body part
//     }
//   }).then((res)=>{
  
//     if(res.data[0]?.error == false)
//     {
//  if(res.data[0].data == 'True')
//  {
//   /// //console.log("DynamicFill")
//   //  this.androidToRgba(shape.dynamic_fill.on_off.on_color)
//   setDynamicFill(androidToRgba(shape.dynamic_fill.on_off.on_color))
  
//  }else if(res.data == 'False'){
//   /////console.log("NDynamicFill")
//   setDynamicFill(androidToRgba(shape.dynamic_fill.on_off.off_color))
//  }
// }
  
//   });
}

 //hidden_When-------------------------------------------------------------------------------------
 if(shape.object.security != undefined)
 {
   var value = shape.object.security.hidden_when.__cdata ;
   ////console.log("Polygon-Hidden-When");

      //Removing DataTypes ---Float,
      value = value.replace("static","");
       value = value.replace("int","");
       value = value.replace("float","");
       value = value.replace("double","");
       value = value.replace("bool","");
       value = value.replace("boolean","");
    
    
       value = value.replace(/\r\n|\n|\r/gm ,"$");
  
       value = value + "$;";
//    axios({
//      method: 'post',
//      url: "http://192.168.0.45/ScadaClient/api/ExpressionEval/GetExprVal",
//      headers: {}, 
//      data: {
//        InputScript:value, // This is the body part
//      }
//    }).then((res)=>{
//     if(res.data[0]?.error == "false"){
    
//   if(res.data[0].data == "True")
//   {
//    setHide(true)
//   // //console.log("Visible")
//   }else if(res.data[0].data == "False"){
//    setHide(false)
//    ////console.log("Not Visible")
//   }else
//   {

//   }
// }
//    });
 }

  return (
    <Line
      key={"Polygon_" + shape.object.object_id + shape.object.object_number}
      id={"Polygon_" + shape.object.object_id + shape.object.object_number}
      points={getPolygonPoints(shape, parentX, parentY)}

    //fill={shape.fill == undefined ? "" : shape.fill.fill == "#5b5b5b" ? "#c0c0c0"  :shape.fill.fill}
       fill = {shape.dynamic_fill != undefined ? dynamcifill : shape.fill != undefined ? hextoRGBA(shape.fill.fill) : "white"}
      visible={ shape.object.security != undefined ? hide :  true }
      strokeWidth={parseFloat(shape.line.line_width) ?? 2}
      stroke = {hextoRGBA(shape.line.color)  ?? "black"}
     // strokeWidth={parseInt(shape.line.line_width)}
      draggable={false}
      dashEnabled={true}
      dash={lineStyle(shape.line.style)}
      closed={parseInt(shape.polyline.closed)}
      // fillLinearGradientStartPointX={this.getXPoint(shape)+parseFloat(obj.x1)}
      // fillLinearGradientStartPointY={this.getYPoint(shape)+parseFloat(obj.y1)}
      // fillLinearGradientColorStops={1,shape.gradient===undefined?"nofill":hextoRGBA(shape.gradient.gradient_color)}
    >

      
    </Line>
  );
};

export default UNCPolygon;
