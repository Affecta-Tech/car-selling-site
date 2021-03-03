import React, { useState } from 'react';
import './styles.css';


const DropArea = (props,id) => {
  const [data, setData] = useState(false);
  const [imageUpload, setImageUpload] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageTask, setImageTask] = useState('');
  const [imageDone, setImageDone] = useState('');
  const renderImage = () => {
    if (imageUpload===''){
      return(
        <span className="download-arrow">
        <svg height = "50px" width = "50px">
          <path className="download-color" d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path>
        </svg>
      </span>

      )

    }
    if (imageUpload==='loading'){
      return(
        <div id="preloader">
          <div id="loader"></div>
        </div>
      )
    }
  }
  const renderImageInfo = () => {
    
    if (imageTask === ''){
      return ""
    }
    
    return(
      <div>
        <p>Name: {imageName}</p>
        <p>{imageDone}</p>
      </div>
    )
  }
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  const uploadFile = (formData,i,e)  => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8080/admin/upload_photo?id=${props.id}&name=${e.dataTransfer.files[i].name}`, {
        headers: {
          Accept: 'application/json'
        },body: formData, method: "POST", credentials: 'same-origin'
      });
      let response = await result.json();
      setImageTask(response)
      await sleep(2000)
      setImageUpload('')
      setImageDone('Upload Complete')
      props.sendData("upload complete")
      return response
    }
    return fetchData()
  }

  const onDrop = e => {
    e.preventDefault();
    setImageName('')
    setImageTask('')
    setImageUpload('loading')
    let i

    sleep(500).then(() => {
      console.log("waiting"); 
      
    })
    
    for(i in e.dataTransfer.files){
      if (typeof(e.dataTransfer.files[i]) === "object" ){
      console.log(e.dataTransfer.files[i])

      // Create an object of formData 
      const formData = new FormData(); 

      // Update the formData object 
      formData.append( 
        "upload_data", 
        e.dataTransfer.files[i]
      ); 
      // Details of the uploaded file 
      setImageName((e.dataTransfer.files[i].name)); 
        console.log(id)
        console.log("PROPS ",props.id)

          // hard coding dataset_id for now until I get formData to work
          
          uploadFile(formData,i,e)
          
      } else {
        return "Choose a dataset"
      }
    }
  };

  const onDragOver = e => {
    e.preventDefault();
  };

  return (
    <div>
      <div
      className="drag-container"
        onDrop={e => onDrop(e)}
        onDragOver={e => onDragOver(e)}
      >
        {renderImage()}


        {/* {data && <img style={dropAreaImageStyle} src={data} />} */}
      </div>
      <br />
      <div className="button-wrapper">
        {data && <button text="Remove" onClick={() => setData(false)}></button>}
      </div>
      {renderImageInfo()}
    </div>
  );
};


export default DropArea;