import React, {Component} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; 

const cropper = React.createRef(null);

class CropperInput extends Component {
  cropImage = () => {
      const {setImage} = this.props;
      if(typeof cropper.current.getCroppedCanvas()==='undefined'){
          return;
      }
      cropper.current.getCroppedCanvas().toBlob(blob=>{
          setImage(blob)
      },'image/jpeg')
  }

  render() {
      const {imagePreview} = this.props
    return (
      <Cropper
        ref={cropper}
        src={imagePreview}
        style={{height: 200, width: '100%'}}
        preview='.img-preview'
        aspectRatio={1}
        viewMode={1}
        dragMode='move'
        guides={false}
        scalable={true}
        cropBoxMovable = {true}
        cropBoxResizable = {true}
        crop={this.cropImage} />
    );
  }
}

export default CropperInput;