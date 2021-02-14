import React, { useState } from 'react';
import './styles.css';


const DropArea = (props) => {
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
        <p>Task ID: {imageTask}</p>
        <p>{imageDone}</p>
      </div>
    )
  }
  const onDrop = e => {
    e.preventDefault();
    setImageName('')
    setImageTask('')
    setImageUpload('loading')
    let i
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    sleep(500).then(() => {
      console.log("waiting"); 
      
    })
    
    for(i in e.dataTransfer.files){
      if (typeof(e.dataTransfer.files[i]) === "object" ){
      console.log("uploadToDataset uploadToDataset uploadToDataset uploadToDataset", props.uploadToDataset)

        console.log(e.dataTransfer.files[i])


           
      // Create an object of formData 
      const formData = new FormData(); 

      // Update the formData object 
      formData.append( 
        "uploaded_file", 
        e.dataTransfer.files[i]
      ); 
     
      // Details of the uploaded file 
      setImageName((e.dataTransfer.files[i].name)); 

      // Request made to the backend api 
      // Send formData object 
    //   axios.post("api/uploadfile", formData); 
    //I tried this, Use FETCH instead
        //  const uploadFile = (formData, dataset_id)  => {
        //     const fetchData = async () => {
        //       const result = await fetch(`${BASE_URL}/storage_client/storage/upload_file?dataset_id=${dataset_id}`, {
        //         headers: {
        //           Accept: 'application/json', token: API_TOKEN
        //         },body: formData, method: "POST", credentials: 'same-origin'
        //       });
        //       let response = await result.json();
        //       setImageTask(response.taskId)
        //       await sleep(2000)
        //       setImageUpload('')
        //       setImageDone('Upload Complete')
        //       return response
        //     }
        //     return fetchData()
        //   }
        //   // hard coding dataset_id for now until I get formData to work
          
        //   uploadFile(formData, props.uploadToDataset)
          
      } else {
        return "Choose a dataset"
      }
    }
  
    // console.log(e.dataTransfer.files)




    // const {
    //   dataTransfer: { files }
    // } = e;
    // const { length } = files;
    // const reader = new FileReader();
    // if (length === 0) {
    //   return false;
    // }
    // const fileTypes = ["image/jpeg", "image/jpg", "image/png", "zipfile/zip"];
    // const { size, type } = files[0];

    // if (size / 1024 / 1024 > 2) {
    //   setErr("File size exceeded the limit of 2MB");
    //   return false;
    // }
    // setErr(false);

    // reader.readAsDataURL(files[0]);
    // reader.onload = loadEvt => {
      
    //   setData(loadEvt.target.result);
    //   console.log(loadEvt.target)
    // };
  };
  // const onDragStart = e => {
  //   e.preventDefault();
  // };
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