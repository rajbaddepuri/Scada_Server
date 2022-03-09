import { Text } from "react-konva";
import { getPloyPoints } from "./JSONUtil.js";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { androidToRgba, getTagValueApi ,hextoRGBA } from './Utils';


const UNCText = (shapeProps) => {
  const [hide, setHidden] = useState(true);
  const [display_on_off_text, setOnOffText] = useState('');
  const [display_numeric, setDisplayNumericValue] = useState(0);
  const [display_array, setDisplayArray] = useState();

  const { text, parentX, parentY } = shapeProps;

  var value = " ";

  value = text.static_text.toString()
  value = value.replace(/&amp;/g, '')
  value = value.replace(/#xa;/g, '')
  value = value.replace(/&/g, '')
  value = value.replace(/#x9;/g, '')
  value = value.replace(/  /g, '')

  useEffect(() => {
   console.log("UNCText")
  })


  //Display Numeric-----------------------------------------------------------------------------------------------------------
  if(text.display_numeric != undefined)
  {
    value = text.display_numeric.expression.__cdata ;

    if(value){
     console.log("Display_Numeric-")

    //Removing DataTypes ---Float,
    value = value.replace("static","");
     value = value.replace("int","");
     value = value.replace("float","");
     value = value.replace("double","");
     value = value.replace("bool","");
     value = value.replace("boolean","");
  
  //Replacing line with $;
     value = value.replace(/\r\n|\n|\r/gm ,"$");

     value = value + "$;";
     console.log(value)
     var staticExpression = "val=6.5;$if(_HTR_1A == 1)${$val = val + 1;$if(val >= 100)$val = 0;$return val;$}$else${$val = _DTms_0003+val;$return val;$}$;";
     var staticE ="_DTms_0010$;"
  try{
      axios({
      method: 'post',
      url: "http://192.168.0.45/ScadaClient/api/ExpressionEval/GetExprVal",
      headers: {}, 
      data: {
        InputScript:value, // This is the body part
      }
    }).then((res)=>{
    //  console.log("OUTPUT")
    //  console.log(res)
    //  console.log(res.data.data)
      if(res.data.error === "false"){
        // var data = display_numeric;
        // data[value] = res.data.data;     
       setDisplayNumericValue(res.data.data);
       } 
    });
  }catch(e){
   // console.log(e)
  }
  
  }else
  {
    value = text.static_text.toString()
    value =  value.replace(/&amp;/g,'')
    value =  value.replace(/#xa;/g,'')    
    value =  value.replace(/&/g,'')   
    value =  value.replace(/#x9;/g,'') 
    value =  value.replace(/  /g,'') 

  }
}


  //Display_on_off-------------------------------------------------------------------------------------------------------
  if (text.display_on_off != undefined) {
    value = text.display_on_off.__cdata;
    if (value) {
      // //console.log("Display_on_off")

      //Removing DataTypes ---Float,
      value = value.replace("static", "");
      value = value.replace("int", "");
      value = value.replace("float", "");
      value = value.replace("double", "");
      value = value.replace("bool", "");
      value = value.replace("boolean", "");


      value = value.replace(/\r\n|\n|\r/gm, "$");

      value = value + "$;";
      //console.log(value)
          axios({
            method: 'post',
            url: "http://192.168.0.45/ScadaClient/api/ExpressionEval/GetExprVal",
            headers: {}, 
            data: {
              InputScript:value, // This is the body part
            }
          }).then((res)=>{

            if(res.data.error == "false")
            {
              if(  parseInt(res.data.data)  > 50)
              {
              setOnOffText(text.display_on_off.text_on);
              }else{
           setOnOffText(text.display_on_off.text_off);
              }
            }   
          });

    } else {
      value = text.static_text.toString()
      value = value.replace(/&amp;/g, '')
      value = value.replace(/#xa;/g, '')
      value = value.replace(/&/g, '')
      value = value.replace(/#x9;/g, '')
      value = value.replace(/  /g, '')
    }
  }

  //Hiddden_When-------------------------------------------------------------------------------------------------------------
  if (text.security != undefined) {
    var value = text.object.security?.hidden_when?.__cdata;
    if (value) {
      axios({
        method: 'post',
        url: "http://192.168.0.45/ScadaClient/api/ExpressionEval/GetExprVal",
        headers: {}, 
        data: {
          InputScript:value, // This is the body part
        }
      }).then((res)=>{
      
        console.log(res.data)
        if(res.data.error === "false")
        {
     if(parseInt(res.data.data) >50)
     {
      //console.log("true")
      setHidden(true);
     }else {
      //console.log("False")
      setHidden(false);
     }
    }

      })
    } else {
      value = text.static_text.toString()
      value = value.replace(/&amp;/g, '')
      value = value.replace(/#xa;/g, '')
      value = value.replace(/&/g, '')
      value = value.replace(/#x9;/g, '')
      value = value.replace(/  /g, '')
    }
  }



  //Display_array-----------------------------------------------------------------------------------------------------------
  if (text.display_array != undefined) {

    // value = text.static_text.toString()
    // value =  value.replace(/&amp;/g,'')
    // value =  value.replace(/#xa;/g,'')    
    // value =  value.replace(/&/g,'')   
    // value =  value.replace(/#x9;/g,'') 
    // value =  value.replace(/  /g,'') 
    // //console.log(value)
    // setDisplayArray(val)
    // // //console.log("---------------------------------DirectText.display_array.index_expression.__cdata--------------------------------------")
    // // //console.log(val)
    // var first = 10;

    // if(val.includes("+"))
    // {
    //     val = val.split("+");

    //     if(val[0].includes("("))
    //     {
    //     first = preFunctions.mainFunction(val[0],this.state.ProjectId,text.object.object_id)
    //     }else{
    //       first = parseInt(val[0],10)

    //     }
    // val = first  + parseInt(val[1],10)
    // }
  }

  if (text.display_numeric == undefined &&
    text.display_on_off == undefined &&
    text.display_array == undefined) {

    value = text.static_text.toString()
    value = value.replace(/&amp;/g, '')
    value = value.replace(/#xa;/g, '')
    value = value.replace(/&/g, '')
    value = value.replace(/#x9;/g, '')
    value = value.replace(/  /g, '')
  }


  return <Text fontFamily={text.font_family}
  align={"center"}

    fontSize={text.font_size}
    fill={hextoRGBA(text.color)}
    visible={text.object.security != undefined ? hide : true}
  //  text={"Normal Text"}
    text={text.display_numeric != undefined ? text.display_numeric.expression.__cdata ? display_numeric : value :
      text.display_on_off != undefined ? text.display_on_off?.__cdata ? display_on_off_text : value : text.display_array != undefined ? value :
        value}
    x={parseFloat(parentX) +parseFloat(text.box.axis_anchor) + parseFloat(text.box.axis_offset_left) + ((parseFloat(text.box.left)) / 2)}
    y={parseFloat(parentY) +5 +parseFloat(text.box.axis_anchor) + parseFloat(text.box.axis_offset_top) + ((parseFloat(text.box.top)) / 2)}
  />
}



export default UNCText;
