const { CreateBucketCommand, S3Client, ListObjectsV2Command, PutObjectCommand } = require("@aws-sdk/client-s3");
const { fromSSO } = require("@aws-sdk/credential-provider-sso");
const fs = require('fs')

const s3Client = new S3Client({ 
    region: "us-east-1",
    credentials: fromSSO({ profile: "AdministratorAccess-144829763726" })
});

const createBucket = async () => {
    const command = new CreateBucketCommand({
        Bucket: 'images24'
    })
    try {
    const location = await s3Client.send(command)
    console.log("Bucket created with location", location)
    return location.Location;
    } catch (error) {
        console.log("Error", error)
        return null;
    }
}

const getBucketContents = async () => {
    const command = new ListObjectsV2Command({
        Bucket: 'images24'
    })
    try {
    const response = await s3Client.send(command)
    const contents = response.Contents || []
    console.log("Bucket - Contents", response);
    return contents;
    } catch (error) {
        console.log("Error", error)
        return null;
    }
}

const uploadImageToBucket = () => {
    fs.readFile('./images/housingLogo.webp',async (err, data) => {
        if (err) {
            return null
        } else {
            const command = new PutObjectCommand({
                Bucket: 'images24',
                Key: 'housingLogo.webp',
                Body: data
            })
            try {
                const response = await s3Client.send(command)
                console.log("Response", response)
                return response;
            } catch (error) {
                console.log("Error", error)
                return null;
            }
        }
    });
}

module.exports = {
    getBucketContents,
    createBucket,
    uploadImageToBucket
}