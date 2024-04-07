import json
import boto3
from datetime import datetime
import uuid  # Import uuid library

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BlogPosts')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    # Generate a unique postID using uuid
    postID = str(uuid.uuid4())  # Convert UUID to string
    title = body['title']
    content = body['content']
    timestamp = datetime.now().isoformat()

    response = table.put_item(
        Item={
            'postID': postID,
            'title': title,
            'content': content,
            'timestamp': timestamp
        }
    )
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Post created successfully.', 'postID': postID})
    }
