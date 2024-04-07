import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BlogPosts')

def lambda_handler(event, context):
    try:
        # Überprüfen, ob pathParameters existiert und postID enthält
        postID = event.get('pathParameters', {}).get('postID')
        if not postID:
            raise ValueError("postID not found in pathParameters")

        response = table.get_item(
            Key={
                'postID': postID
            }
        )
        if 'Item' in response:
            return {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'statusCode': 200,
                'body': json.dumps(response['Item'])
            }
        else:
            return {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'statusCode': 404,
                'body': json.dumps('Post not found.')
            }
    except Exception as e:
        return {
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'statusCode': 400,
            'body': json.dumps('Fehler: ' + str(e))
        }

