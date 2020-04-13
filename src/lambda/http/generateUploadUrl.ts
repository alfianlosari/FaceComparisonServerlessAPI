import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

export const handler = middy(async (_: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const imageId = uuid.v4()

  const uploadUrl = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: imageId,
    Expires: urlExpiration
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      uploadUrl,
      name: imageId
    }, null, 2)
  }
})

handler.use(cors())

