const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseUrl = "";

    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);
    // on reader load something..
    reader.onload = () => {
      // console.log("Called", reader);
      // Make a fileInfo object
      baseUrl = reader.result;
      // console.log(baseUrl);
      resolve(baseUrl);
    };
  });
};

const saveFile1 = (e, callback) => {
  // setFileName(e.target.files[0].name);
  let file1;
  file1 = e.target.files[0];
  getBase64(file1)
    .then((result) => {
      file1["base64"] = result;
      // console.log("file is", file1);
      callback((prevState) => ({
        ...prevState,
        fileName: file1.name,
        file: file1,
      }));
    })
    .catch((err) => {
      // console.log(err);
    });
};

export {saveFile1};