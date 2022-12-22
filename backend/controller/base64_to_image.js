const fs = require("fs");

module.exports = (base64, fileName) => {
  let base64Image = base64.split(";base64,").pop();
  fs.writeFile(
    "public/images/" + fileName,
    base64Image,
    { encoding: "base64" },
    function (err) {
      console.log("File created");
    }
  );
};
