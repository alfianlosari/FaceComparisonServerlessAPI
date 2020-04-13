# Serverless Face Rekognition App

This project is a simple face recognition and comparison API. It uses AWS Lambda and AWS Rekognition service built on top of nodeJS

# Functionality of the application

This application allows to perform face comparison between 2 faces passing the sourceImageS3Name and targetImageS3Name

# Setup

Configuration is located in `serverless.yaml` file. Please provide your own S3 image bucket name in the environment

# Presigned Upload URL request

PATH: `BASEURL`/faces/attachment
Client need to call this to get the presigned upload url for uploading images to S3


# Face Comparison Request

PATH: `BASEURL`/faces/compare
To perform face comparison you need to pass these as body of request:

* `sourceImageS3Name` (string) - name of source S3 file
* `targetImageS3Name` (string) - name of target S3 file
* `similarityThreshold` (number) - number between 1-00
