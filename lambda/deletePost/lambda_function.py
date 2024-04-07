import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BlogPosts')

def lambda_handler(event, context):
    postID = event['pathParameters']['id']

    response = table.delete_item(
        Key={
            'postID': postID
        }
    )
    return {
        'statusCode': 204,  # 204 No Content for successful deletion without a response body
        'headers': {
            'Access-Control-Allow-Origin': '*',  # Adjust for production
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        }
    }
