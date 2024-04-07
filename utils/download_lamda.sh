#!/bin/bash

# Define your Lambda function names
declare -a lambda_functions=("getPosts" "deletePost" "updatePost" "getPost" "createPost")

# Directory where to save the Lambda functions
lambda_dir="lambda"

# Create the lambda directory if it doesn't exist
mkdir -p "$lambda_dir"

# Loop through all Lambda function names
for function_name in "${lambda_functions[@]}"
do
   echo "Downloading $function_name..."
   
   # Create a directory for the function
   mkdir -p "$lambda_dir/$function_name"
   
   # Get the function's deployment package URL
   package_url=$(aws lambda get-function --function-name $function_name --query 'Code.Location' --output text --profile default)
   
   # Download the deployment package
   curl "$package_url" --output "$lambda_dir/$function_name/code.zip"
   
   # Unzip the package and remove the zip file
   unzip "$lambda_dir/$function_name/code.zip" -d "$lambda_dir/$function_name/"
   rm "$lambda_dir/$function_name/code.zip"
   
   echo "$function_name downloaded and unpacked."
done

echo "All functions downloaded."

