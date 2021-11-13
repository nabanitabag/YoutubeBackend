## Backend Assignment at FamPay

# Project Goal

To make an API to fetch latest videos sorted in reverse chronological order of the publishing date-time from YouTube for a given search query in paginated response

# Basic Requirements
- Server should call the YouTube API continuously in background (async) with some interval (say 10 seconds) for fetching the latest videos for a predefined search query and should store the data of videos (specifically these fields - Video title, description, publishing datetime, thumbnails URLs and any other fields you require) in a database with proper indexes.
- A GET API which returns the stored video data in a paginated response sorted in descending order of published datetime.
- A basic search API to search the stored videos using their title and description.
- Dockerize the project.
- It should be scalable and optimised.

# Steps to run

1. Clone the project

`git clone https://github.com/nabanitabag/YoutubeBackend.git`

2. Add the secret keys like YOUTUBE DATA API key to .env

3. Install dependencies

`npm install`

4. Run in development mode

`npm run dev`

4. Navigate to `http://localhost:3000` to see the app live
5. Monitor the data dumped into MongoDB by navigating to `http://localhost:8081`.


