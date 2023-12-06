// returned Null indicates a valid email
const isValid = {
  file: (value) => {
    // return new Promise((resolve, reject) => {
    // Check file type
    if (!value.type.startsWith("image/jp")) {
      return "Please upload a valid image file (jpeg/jpg).";
    }

    // Check file size
    const maxSizeMB = 5;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (value.size > maxSizeBytes) {
      return `File size must not exceed ${maxSizeMB}MB.`;
    }

    // check dimensions
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();

      //Read the contents of Image File.
      reader.readAsDataURL(value);
      reader.onload = function (e) {
        //Initiate the JavaScript Image object.
        const image = new Image();

        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;

        //Validate the File Height and Width.
        image.onload = () => {
          const width = image.naturalWidth;
          const height = image.naturalHeight;
          console.log(width, height);

          if (height < 70 || width < 70) {
            resolve("Image resolution must be at least 70x70 pixels.");
          } else {
            resolve(null);
          }
        };
        //image.onerror = reject("Error loading the image.");
      };
    });

    return promise;
  },

  phone: (value) => {
    if (value.length < 13) {
      return "Please enter a correct number";
    }
    return null;
  },

  name: (value) => {
    if (value.length > 60 || value.length < 2) {
      return "Email length should be 2-60 characters";
    }
    return null;
  },

  email: (value) => {
    if (value.length > 100 || value.length < 2) {
      return "Email length should be 2-100 characters";
    }

    const emailRegex =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    if (!emailRegex.test(value)) {
      return "Please enter a valid email address.";
    }

    return null;
  },
};

export default isValid;
