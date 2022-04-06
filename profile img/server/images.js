document.getElementById("upload_widget_opener").addEventListener("click", function () {

    cloudinary.openUploadWidget({
      cloud_name: "djnwekzyj",
      upload_preset: "kit_default",
      cropping: true,
      croppingCoordinatesMode: "face",
      croppingAspectRatio: 1,
      showSkipCropButton: false
    },
    function (error, result) {
      if (error) throw error;

      $("#userImage").attr("src", result[0].url);
      console.log("result!", result)
      const profilePic = result[0].url;
      addPhoto(profilePic);
    });
  });

  function addPhoto (url) {
    const data = {
      type: "jpg",
      name: window.userId,
      data: url,
      UserId: window.userId
    };

    $.ajax({
      type: "POST",
      url: "/api/images",
      data: data
    }).then((res) => {
      console.log("res loaded!: ", res)
    });
  }