const { createBucket, getBucketContents, uploadImageToBucket } = require('./uploadImageToS3');

const getImagesHandler = async () => {
    const location = await createBucket();
    const contents = await getBucketContents();
    return {contents, location}
}

const uploadImageHandler = () => {
    const response = uploadImageToBucket();
    return response;
}

module.exports = {
    getImagesHandler,
    uploadImageHandler
}
