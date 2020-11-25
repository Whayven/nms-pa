import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import { v4 as randomString } from "uuid";

const UploadImage = (props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [url, setUrl] = useState("");

  const getSignedRequest = ([file]) => {
    setIsUploading(true);
    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;
    axios
      .get("/api/sign-s3", {
        params: {
          "file-name": fileName,
          "file-type": file.type,
        },
      })
      .then((response) => {
        const { signedRequest, url } = response.data;
        uploadFile(file, signedRequest, url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile = (file, signedRequest, url) => {
    const options = {
      header: {
        "Content-Type": file.type,
      },
    };
    const { planetid } = props;
    const { setImages } = props;
    axios
      .put(signedRequest, file, options)
      .then((response) => {
        setIsUploading(false);
        setUrl(url);
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
        axios.post("/api/upload/image", { url, planetid })
        .then(({ data }) => {
          setImages(state => [...state, data])
        })
        .catch((err) => console.log(err));
      })
      .catch((err) => {
        setIsUploading(false);
        alert(err.stack);
      });
  };

  return (
    <Dropzone
      onDropAccepted={getSignedRequest}
      accept="image/*"
      multiple={false}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          style={{
            position: "relative",
            width: 160,
            height: 80,
            borderWidth: 5,
            marginTop: 25,
            borderColor: "black",
            borderStyle: "dashed",
            borderRadius: 5,
            display: "inline-block",
            fontSize: 17,
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <GridLoader />
          ) : (
            <p>Drag and drop file or click to upload.</p>
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default UploadImage;
