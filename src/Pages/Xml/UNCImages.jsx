import { Stage, Layer, Image } from 'react-konva';
import { getPloyPoints } from "./JSONUtil.js";


const UNCImage = (shapeProps) => {
  const { imageFie,shape } = shapeProps;
  
  console.log(shape)
  
  return (
       
     <Image
    x={200}
    y={300}

    image= {imageFie}
    
    height ={150}
    width = {150}

    ref={node => {
  //    this.imageNode = node;
    }

}
  />
  );
};

export default UNCImage;
   //Render Images---------------------------------------------------------------------
