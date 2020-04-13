/**
 * Fields in a request to compare faces between source and target image using S3
 */
export interface CompareFaceRequest {
  sourceImageS3Name: string
  targetImageS3Name: string
  simillarityThreshold: number
}
