//to do : integrate into server.js file cloudinary work 
// for cloudinary

const { cloudinary } = require('/cloudinary');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.get('/api/images', async (req, res) => {
    const { resources } = await cloudinary.search
        .expression('folder:kit_default')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
});
app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'kit_default',
        });
        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('listening on 3001');
});








// app.post("/image", upload.single("image"), (req, res) => { res.send(req.file); });

// app.post("/image", upload.single("image"), async (req, res) => {
//   const result = await cloudinary.v2.uploader.upload(req.file.path);
//   res.send(result);
// });

// app.get("/api/image", async (req, res) => {
//   const images = await cloudinary.v2.api.resources({
//     type: "upload",
//     prefix: "image"
//   });
//   return res.json(images);
// });
