const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const { setMaxIdleHTTPParsers } = require("http");
// import { FormData } from 'formdata-node';
// import fetch, { blobFrom } from 'node-fetch';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(fileUpload());


app.listen(process.env.PORT || 3000, function () {
    console.log("Listening to the server 3000");
});

app.get("/", function (req, res) {

    res.render("upload");

});

app.post("/", function (req, res) {

    let gname = req.body.gname;
    let tagline = req.body.tagline;
    let about = req.body.about;

    if (req.files) {

        let logo = req.files.logo;

        let filename = logo.name;

        logo.mv(__dirname + "/uploads/" + filename, function (err) {
            if (err) throw new Error(err);
        });


    }

    const options = {

        method: 'POST',
        url: 'http://localhost:1337/api/group-infos',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer a4711ad6dca0506204872d5b1143fb47fc37b15937ff7a0d0489fa61d01b0f5125ec493078b20277eb5f3d056491600068eb270b2533992c3330be894f67ac0a3369f7ae362b191caf5f1fe969580c6aca6f234dbfc499f78eb32f9604a8f7913bfc793470ca35501e50f5783ba6a0baae01133731630da8b981fd27c6182592'
        },
        body: {
            data: {

                name: gname,
                about: about,
                tagline: tagline,
                secyContact: '1234',

            }

        },

        json: true

    };



    request(options, function (error, response, body) {
        if (error) throw new Error(error);


    });

    res.send("<h1>data received!!</h1>");

});

function doRequest(url) {

    const options = {

        method: 'GET',
        url: url,
        headers: {
            Authorization: 'Bearer a4711ad6dca0506204872d5b1143fb47fc37b15937ff7a0d0489fa61d01b0f5125ec493078b20277eb5f3d056491600068eb270b2533992c3330be894f67ac0a3369f7ae362b191caf5f1fe969580c6aca6f234dbfc499f78eb32f9604a8f7913bfc793470ca35501e50f5783ba6a0baae01133731630da8b981fd27c6182592'
        }

    };

    return new Promise(function (resolve, reject) {
        request(options, function (error, res, body) {
            if (!error && res.statusCode === 200) {
                console.log("Here", body);
                resolve(body);
            } else {
                console.log("You are in rejection state!!", res.statusCode);
                reject(error);
            }
        });
    });

}

async function getRecords(url) {

    try {
        const resp = await doRequest(url);
        const records = JSON.parse(resp);
        return records;

    } catch (error) {
        console.error(error);
    }

}

app.get("/viewuploaded", async function (req, res) {

    let records = [{ "id": 1, "attributes": { "name": "pag", "about": "we foster programming culture in iit roorkee", "tagline": "happy coding!!", "secyContact": null, "createdAt": "2022-12-20T02:53:16.473Z", "updatedAt": "2022-12-20T02:53:22.972Z", "publishedAt": "2022-12-20T02:53:22.968Z", "instaHandle": null, "fbHandle": null, "linkedinHandle": null, "gmail": null, "githubHandle": null } }, { "id": 2, "attributes": { "name": "sds", "about": "we foster dev culture in iit roorkee", "tagline": "happy coding!!", "secyContact": "1234", "createdAt": "2022-12-22T04:06:07.348Z", "updatedAt": "2022-12-22T04:06:07.348Z", "publishedAt": "2022-12-22T04:06:07.326Z", "instaHandle": null, "fbHandle": null, "linkedinHandle": null, "gmail": null, "githubHandle": null } }, { "id": 3, "attributes": { "name": "mdg", "about": "we foster dev culture in iit roorkee", "tagline": "happy coding!!", "secyContact": "1234", "createdAt": "2022-12-22T04:07:25.086Z", "updatedAt": "2022-12-22T04:07:25.086Z", "publishedAt": "2022-12-22T04:07:25.075Z", "instaHandle": null, "fbHandle": null, "linkedinHandle": null, "gmail": null, "githubHandle": null } }, { "id": 6, "attributes": { "name": "img", "about": "we look into the info of iitr", "tagline": "happy coding!!", "secyContact": "1234", "createdAt": "2022-12-22T04:18:33.639Z", "updatedAt": "2022-12-22T04:18:33.639Z", "publishedAt": "2022-12-22T04:18:33.627Z", "instaHandle": null, "fbHandle": null, "linkedinHandle": null, "gmail": null, "githubHandle": null } }, { "id": 8, "attributes": { "name": "blocsoc", "about": "we foster blochain culture in iitr", "tagline": "blochain is the futute!!", "secyContact": "1234", "createdAt": "2022-12-22T05:25:45.434Z", "updatedAt": "2022-12-22T05:25:45.434Z", "publishedAt": "2022-12-22T05:25:45.424Z", "instaHandle": null, "fbHandle": null, "linkedinHandle": null, "gmail": null, "githubHandle": null } }, { "id": 9, "attributes": { "name": "infosec", "about": "we foster ethical hacking culture in iit roorkee", "tagline": "hack it!!", "secyContact": "1234", "createdAt": "2022-12-22T05:42:04.097Z", "updatedAt": "2022-12-22T05:45:33.450Z", "publishedAt": "2022-12-22T05:42:04.086Z", "instaHandle": null, "fbHandle": null, "linkedinHandle": null, "gmail": null, "githubHandle": null } }, { "id": 10, "attributes": { "name": "acm", "about": "....", "tagline": "acm !!", "secyContact": "1234", "createdAt": "2022-12-22T06:05:09.618Z", "updatedAt": "2022-12-22T06:05:09.618Z", "publishedAt": "2022-12-22T06:05:09.605Z", "instaHandle": null, "fbHandle": null, "linkedinHandle": null, "gmail": null, "githubHandle": null } }];

    let media = [{ "id": 1, "name": "Screenshot from 2022-12-22 11-06-32.png", "alternativeText": null, "caption": null, "width": 1846, "height": 1053, "formats": { "thumbnail": { "name": "thumbnail_Screenshot from 2022-12-22 11-06-32.png", "hash": "thumbnail_Screenshot_from_2022_12_22_11_06_32_576d7fcc57", "ext": ".png", "mime": "image/png", "path": null, "width": 245, "height": 140, "size": 48.22, "url": "/uploads/thumbnail_Screenshot_from_2022_12_22_11_06_32_576d7fcc57.png" }, "small": { "name": "small_Screenshot from 2022-12-22 11-06-32.png", "hash": "small_Screenshot_from_2022_12_22_11_06_32_576d7fcc57", "ext": ".png", "mime": "image/png", "path": null, "width": 500, "height": 285, "size": 147.28, "url": "/uploads/small_Screenshot_from_2022_12_22_11_06_32_576d7fcc57.png" }, "medium": { "name": "medium_Screenshot from 2022-12-22 11-06-32.png", "hash": "medium_Screenshot_from_2022_12_22_11_06_32_576d7fcc57", "ext": ".png", "mime": "image/png", "path": null, "width": 750, "height": 428, "size": 291.35, "url": "/uploads/medium_Screenshot_from_2022_12_22_11_06_32_576d7fcc57.png" }, "large": { "name": "large_Screenshot from 2022-12-22 11-06-32.png", "hash": "large_Screenshot_from_2022_12_22_11_06_32_576d7fcc57", "ext": ".png", "mime": "image/png", "path": null, "width": 1000, "height": 570, "size": 474.48, "url": "/uploads/large_Screenshot_from_2022_12_22_11_06_32_576d7fcc57.png" } }, "hash": "Screenshot_from_2022_12_22_11_06_32_576d7fcc57", "ext": ".png", "mime": "image/png", "size": 296.44, "url": "/uploads/Screenshot_from_2022_12_22_11_06_32_576d7fcc57.png", "previewUrl": null, "provider": "local", "provider_metadata": null, "createdAt": "2022-12-22T05:45:15.257Z", "updatedAt": "2022-12-22T05:45:15.257Z" }, { "id": 2, "name": "Screenshot from 2022-12-22 12-28-24.png", "alternativeText": "screenshot", "caption": null, "width": 1846, "height": 1053, "formats": { "thumbnail": { "name": "thumbnail_Screenshot from 2022-12-22 12-28-24.png", "hash": "thumbnail_Screenshot_from_2022_12_22_12_28_24_96aa567c60", "ext": ".png", "mime": "image/png", "path": null, "width": 245, "height": 140, "size": 18.34, "url": "/uploads/thumbnail_Screenshot_from_2022_12_22_12_28_24_96aa567c60.png" }, "small": { "name": "small_Screenshot from 2022-12-22 12-28-24.png", "hash": "small_Screenshot_from_2022_12_22_12_28_24_96aa567c60", "ext": ".png", "mime": "image/png", "path": null, "width": 500, "height": 285, "size": 52.67, "url": "/uploads/small_Screenshot_from_2022_12_22_12_28_24_96aa567c60.png" }, "medium": { "name": "medium_Screenshot from 2022-12-22 12-28-24.png", "hash": "medium_Screenshot_from_2022_12_22_12_28_24_96aa567c60", "ext": ".png", "mime": "image/png", "path": null, "width": 750, "height": 428, "size": 98.28, "url": "/uploads/medium_Screenshot_from_2022_12_22_12_28_24_96aa567c60.png" }, "large": { "name": "large_Screenshot from 2022-12-22 12-28-24.png", "hash": "large_Screenshot_from_2022_12_22_12_28_24_96aa567c60", "ext": ".png", "mime": "image/png", "path": null, "width": 1000, "height": 570, "size": 149.32, "url": "/uploads/large_Screenshot_from_2022_12_22_12_28_24_96aa567c60.png" } }, "hash": "Screenshot_from_2022_12_22_12_28_24_96aa567c60", "ext": ".png", "mime": "image/png", "size": 64.61, "url": "/uploads/Screenshot_from_2022_12_22_12_28_24_96aa567c60.png", "previewUrl": null, "provider": "local", "provider_metadata": null, "createdAt": "2022-12-22T08:07:43.621Z", "updatedAt": "2022-12-22T17:30:11.980Z" }];

    getRecords('http://localhost:1337/api/group-infos')
        .then((resp) => {
            records = resp.data;
        })
        .then(() => {

            getRecords('http://localhost:1337/upload/files')
                .then((resp1) => {
                    console.log(resp1);
                    media = resp1.data;
                })
                .catch(error => {
                    console.log(error);
                });

        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            res.render("view", { records: records, media: media });
        });

});

