import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BlogPosts')


def lambda_handler(event, context):
    # Check if 'body' is in event and is not None
    if 'body' not in event or event['body'] is None:
        return {
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'statusCode': 400,
            'body': json.dumps({'error': 'Request body is missing'})
        }

    # Assuming 'body' is present and not empty from this point forward
    body = json.loads(event['body'])
    postID = body['id']
    title = body.get('title')
    content = body.get('content')

    expression = "set "
    expressionValues = {}
    if title:
        expression += "title = :title, "
        expressionValues[':title'] = title
    if content:
        expression += "content = :content"
        expressionValues[':content'] = content

    response = table.update_item(
        Key={
            'postID': postID
        },
        UpdateExpression=expression,
        ExpressionAttributeValues=expressionValues,
        ReturnValues="UPDATED_NEW"
    )
    return {
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'statusCode': 200,
        'body': json.dumps('Post updated successfully.')
    }
