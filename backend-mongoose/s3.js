require('dotenv').config()
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName="ubereatsimagesbucket"
const region="us-east-2"
const accessKeyId="AKIA4EDW53R62HO63MPE"
const secretAccessKey="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"

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

function uploadFile(file){
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise()
}

exports.uploadFile = uploadFile

function getFileStream(fileKey){
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream