const AWS = require('aws-sdk');
const sns = new AWS.SNS()
const uuidv4 = require('uuid/v4');
const parseS3Event = require('./parse-s3-event');
const TOPIC_ARN = process.env.TOPIC_ARN;

exports.handler = (event) => {
    let message = parseS3Event(event);
    return saveToSNS(message);
};

saveToSNS = (data) => {
    if (!data) {
        return Promise.resolve();
    }
    return sns.publish({
        Message: JSON.stringify(data),
        TopicArn: TOPIC_ARN
    })
    .promise()
    .catch(err => {
        console.log(err);
        return err;
    });
};