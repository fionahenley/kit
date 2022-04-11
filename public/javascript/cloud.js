var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djnwekzyj/upload';
var CLOUDINARY_UPLOAD_PRESET = 'kit_default';

var imgPreview = document.getElementById('img-preview')
var userId = document.getElementById('userId').value;
var fileUpload = document.getElementById('file-upload')

fileUpload.addEventListener('change', function(event) {
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);


axios({
    url: CLOUDINARY_URL,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
   data: formData
}).then(function(res){
console.log(res);
imgPreview.src = res.data.secure_url
saveImage(res.data.secure_url);
}).catch(function(err){
console.error(err);
});


});


function saveImage(image_url) {

    // const response = await fetch('/api/users/:userId', {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //         image_url
    //     }),
    //     headers: { 'Content-Type': 'application/json' }
    //   });

    //   console.log(response);



    axios({
        url: window.location.origin + '/api/users/' + userId,
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
        }, 

        data: JSON.stringify({
            user_image: image_url, 
        })

    }).then(function(res){
        console.log(res);        
        }).catch(function(err){
        console.log(err);
        });
}
