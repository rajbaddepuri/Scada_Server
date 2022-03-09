import { Ellipse, Rect } from "react-konva";
import { getRectPointX, getRectPointY } from "./CanvasUtils.js";
import React, { useState } from 'react'
import axios from 'axios';
import { hextoRGBA, lineStyle, gradientStartPoints, gradientEndPoints,androidToRgba } from './Utils';




const UNCEllipse = (shapeProps) => {
  const { shape, parentX, parentY } = shapeProps;


  const [hide, setHide] = useState(Boolean);
  const [dynamcifill, setDynamicFill] = useState('white');


  //Dynamic_Filll-----------------------------------------------------------------------
  if (shape.dynamic_fill != undefined) {
    var value = shape.dynamic_fill.on_off.on_color_when.__cdata;

    // //console.log("Ellipse-Dynamci_fill")

    //Removing DataTypes ---Float,
    value = value.replace("static", "");
    value = value.replace("int", "");
    value = value.replace("float", "");
    value = value.replace("double", "");
    value = value.replace("bool", "");
    value = value.replace("boolean", "");


    value = value.replace(/\r\n|\n|\r/gm, "$");

    value = value + "$;";
    console.log(value)
      axios({
        method: 'post',
        url: "http://"+process.env.REACT_APP_IP+"api/ExpressionEval/GetExprVal",
        headers: {}, 
        data: {
          InputScript:value, // This is the body part
        }
      }).then((res)=>{
        console.log(res)
       if(res.data.error === "false")
     if(res.data.data == 'True')
     {

      setDynamicFill(androidToRgba(shape.dynamic_fill.on_off.on_color))

     }else if(res.data.data == 'False'){

      setDynamicFill(androidToRgba(shape.dynamic_fill.on_off.off_color))
     }

      });

  }

  //hidden_When-------------------------------------------------------------------------------------
  if (shape.object.security != undefined) {
    var value = shape.object.security.hidden_when.__cdata;

    ////console.log("Ellipse-Hidden-When")

    //Removing DataTypes ---Float,
    value = value.replace("static", "");
    value = value.replace("int", "");
    value = value.replace("float", "");
    value = value.replace("double", "");
    value = value.replace("bool", "");
    value = value.replace("boolean", "");

    value = value.replace(/\r\n|\n|\r/gm, "$");

    value = value + "$;";
    //   axios({
    //     method: 'post',
    //     url: "http://192.168.0.45/ScadaClient/api/ExpressionEval/GetExprVal",
    //     headers: {}, 
    //     data: {
    //       InputScript:value, // This is the body part
    //     }
    //   }).then((res)=>{

    //    if(res.data[0]?.error == "false"){
    //  if(res.data[0].data == "True")
    //  {

    //  // //console.log("Visible")
    //  }else if(res.data[0].data == "False"){

    //   ////console.log("Not Visible")
    //  }
    // }
    //   });
  }


  //EllipseGradientStartPoints----------------------------------------
  function ellipseGradientStartPoints(shape, x1, x2, y1, y2) {
    ////console.log(shape.gradient.gradient_direction)

    switch (parseInt(shape.gradient.gradient_direction)) {
      //-0---GRADIENT_LEFT_TO_RIGHT     
      case 0:
        return { x: -x2 / 2, y: y2 };
      //-1--GRADIENT_RIGHT_TO_LEFT
      case 1:
        return { x: x2 / 2, y: y2 };
      //-2--GRADIENT_TOP_TO_BOTTOM
      case 2:
        return { x: x2, y: -y2 / 2 };
      //-3--GRADIENT_BOTTOM_TO_TOP 
      case 3:
        return { x: x2, y: y2 / 2 };
      //-4--GRADIENT_HORIZONTAL_TO_MIDDLE 
      case 4:
        return { x: -x2 / 2, y: y2 };

      //-5---GRADIENT_HORIZONTAL_FROM_MIDDLE 
      case 5:
        return { x: -x2 / 2, y: y2 };

      //-6--GRADIENT_HORIZONTAL_TO_MIDDLE 
      case 6:
        return { x: x2, y: y2 / 2 };

      // //--7--GRADIENT_VERTICAL_FROM_MIDDLE
      case 7:
        return { x: x2, y: - y2 / 2 };

      default: return { x: 0, y: 0 };
    }
  }

  //Ellipse Gardient End Point----------------------------------------------
  function ellipseGradientEndPoints(shape, x1, x2, y1, y2) {
    switch (parseInt(shape.gradient.gradient_direction)) {
      //-0---GRADIENT_LEFT_TO_RIGHT     
      case 0:
        return { x: x2 / 2, y: y2 };
      //-1--GRADIENT_RIGHT_TO_LEFT
      case 1:
        return { x: -x2 / 2, y: y2 };
      //-2--GRADIENT_TOP_TO_BOTTOM
      case 2:
        return { x: x2, y: y2 / 2 };
      //-3--GRADIENT_BOTTOM_TO_TOP 
      case 3:
        return { x: x2, y: - y2 / 2 };
      //-4--GRADIENT_HORIZONTAL_TO_MIDDLE 
      case 4:
        return { x: x2 / 2, y: y2 };
      //-5---GRADIENT_HORIZONTAL_FROM_MIDDLE
      case 5:
        return { x: x2 / 2, y: y2 };
      //-6--GRADIENT_VERTICAL_TO_MIDDLE 
      case 6:
        return { x: x2, y: - y2 / 2 };
      // //--7--GRADIENT_VERTICAL_FROM_MIDDLE
      case 7:
        return { x: x2, y: y2 / 2 };
      default: return { x: 0, y: 0 };
    }
  }

  //Gradient Fill Basedon the gradient_Direction----------------
  function gradientFill() {

    if (shape.gradient.gradient_direction < 4) {

      return [0, shape.dynamic_fill != undefined ? dynamcifill ?? "black" : shape.fill != undefined ? hextoRGBA(shape.fill.fill) : "grey" ?? "black"
        , 1, shape.gradient != undefined ? hextoRGBA(shape?.gradient?.gradient_color) : "grey" ?? "black"];
    } else if (shape.gradient.gradient_direction >= 4) {

      if (shape.gradient.gradient_direction == 4 || shape.gradient.gradient_direction == 6) {
        return [0, shape.dynamic_fill != undefined ? dynamcifill ?? "black" : shape.fill != undefined ? hextoRGBA(shape.fill.fill) : "grey" ?? "black",
          0.5, shape.gradient != undefined ? hextoRGBA(shape?.gradient?.gradient_color) : "grey" ?? "black"

          , 1, shape.dynamic_fill != undefined ? dynamcifill ?? "black" : shape.fill != undefined ? hextoRGBA(shape.fill.fill) : "grey" ?? "black"];
      }
      else if (shape.gradient.gradient_direction == 5 || shape.gradient.gradient_direction == 7) {
        return [0, shape.dynamic_fill != undefined ? dynamcifill ?? "black" : shape.fill != undefined ? hextoRGBA(shape?.gradient?.gradient_color) : "grey" ?? "black",
          0.5, shape.gradient != undefined ? hextoRGBA(shape.fill.fill) : "grey" ?? "black"

          , 1, shape.dynamic_fill != undefined ? dynamcifill ?? "black" : shape.fill != undefined ? hextoRGBA(shape?.gradient?.gradient_color) : "grey" ?? "black"];

      }
    }

  }


  return (
    <Ellipse
      key={"Ellipse_" + shape.object.object_id + shape.object.object_number}
      id={"Ellipse_" + shape.object.object_id + shape.object.object_number}

      x={getRectPointX(shape, parentX)}
      y={getRectPointY(shape, parentY)}
      width={parseFloat(shape.ellipse.x2)}
      height={parseFloat(shape.ellipse.y2)}

      visible={shape.object.security != undefined ? !hide : true}

      fillLinearGradientStartPoint={shape.gradient != undefined ?
        ellipseGradientStartPoints(shape, shape.ellipse.x1 / 2, shape.ellipse.x2 / 2,
          shape.ellipse.y1 / 2,
          shape.ellipse.y2 / 2
        ) : {}}

      fillLinearGradientEndPoint={shape.gradient != undefined ?
        ellipseGradientEndPoints(shape, shape.ellipse.x1 / 2, shape.ellipse.x2 / 2,
          shape.ellipse.y1 / 2,
          shape.ellipse.y2 / 2) : {}}
      //  fillLinearGradientColorStops={[0,"red",1,"green"]}

      fillLinearGradientColorStops={shape.gradient === undefined ? [] :
        gradientFill()}

      fill={shape.gradient === undefined ?
        shape.dynamic_fill != undefined ? dynamcifill :
          shape.fill != undefined ? hextoRGBA(shape.fill.fill) : "grey" : ""}

      strokeWidth={parseFloat(shape.line.line_width)}
      stroke={hextoRGBA(shape.line.color)}
      draggable={false}

      dashEnabled={true}
      dash={lineStyle(shape.line.style)}
    />
  );
};

export default UNCEllipse;
