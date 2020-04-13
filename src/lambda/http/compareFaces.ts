import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CompareFaceRequest } from '../../requests/CompareFaceRequest'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const bucketName = process.env.IMAGES_S3_BUCKET

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const compareFaceRequest: CompareFaceRequest = JSON.parse(event.body)

        const rekognition = new AWS.Rekognition()
        const params = {
            SimilarityThreshold: compareFaceRequest.simillarityThreshold,
            SourceImage: {
                S3Object: {
                    Bucket: bucketName,
                    Name: compareFaceRequest.sourceImageS3Name
                }
            },
            TargetImage: {
                S3Object: {
                    Bucket: bucketName,
                    Name: compareFaceRequest.targetImageS3Name
                }
            }
        }

        const data = await rekognition.compareFaces(params).promise()
        return {
            statusCode: 200,
            body: JSON.stringify({
                ...data
            }, null, 2)
        }

    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify(error)
        }
    }




})

handler.use(cors())

