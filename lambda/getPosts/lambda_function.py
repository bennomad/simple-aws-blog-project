import json
import boto3

def lambda_handler(event, context):
    try:
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('BlogPosts')
    
        # Scan operation to fetch all items
        response = table.scan()
        items = response['Items']
    
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # CORS header
                'Content-Type': 'application/json'
            },
            'body': json.dumps(items)
        }
    except Exception as e:
        return {
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'statusCode': 400,
            'body': json.dumps('Error while fetching posts: ' + str(e))
        }
