# Simple Blog Platform

## Project Overview

The Simple Blog Platform is a cost-efficient, scalable, and easy-to-deploy cloud-based blogging platform. Built on AWS, it leverages serverless architecture to create a seamless blogging experience. This project integrates AWS Lambda, API Gateway, DynamoDB, and S3, serving as a practical demonstration of these technologies in action.

## Features

- **Blog Post Management**: Users can create, view, update, and delete blog posts.
- **Serverless Backend**: Utilizes AWS Lambda functions written in Python for running backend logic without managing servers.
- **RESTful API**: Amazon API Gateway manages API endpoints, facilitating communication between the frontend and backend.
- **Data Storage**: Uses Amazon DynamoDB, a NoSQL database service, for storing blog posts.
- **Static Website Hosting**: The frontend is hosted on Amazon S3, offering a reliable and scalable hosting solution.

## Architecture

The architecture centers around AWS services to manage the blog's operations. The frontend, a static website hosted on S3, interacts with backend services via API Gateway. This gateway routes requests to the appropriate Lambda functions for processing, with DynamoDB serving as the database for blog content. This serverless setup ensures the platform is scalable and maintenance-light.

## Deployment Guide

### Prerequisites

- AWS account
- AWS CLI configured with access credentials

### Steps

1. **Static Website on S3**:
    - Create an S3 bucket for website hosting.
    - Upload your static website files.
    - Enable public access and set up website hosting.

2. **Lambda Functions**:
    - Create Lambda functions for CRUD operations on blog posts.
    - Assign appropriate roles for DynamoDB access.

3. **DynamoDB Table**:
    - Set up a DynamoDB table named `BlogPosts` with a primary key `id`.

4. **API Gateway**:
    - Create a new API in API Gateway.
    - Set up resources and methods for blog post operations, linking them to the corresponding Lambda functions.

5. **CORS Configuration**:
    - Enable CORS on your API Gateway to ensure your S3-hosted frontend can interact with your backend.

## API Functionality
- **GET /posts**: Retrieves a list of all blog posts.
- **POST /posts**: Creates a new blog post.
- **GET /posts/{id}**: Retrieves a specific blog post by ID.
- **PUT /posts/{id}**: Updates an existing blog post.
- **DELETE /posts/{id}**: Deletes a specific blog post.

## Future Improvements

- **User Authentication**: Implement user authentication to manage access.
- **Restricting API Usage**: Implement restricted API key usage. 
- **UI/UX Enhancements**: Continuously improve the frontend design for better user experience.


