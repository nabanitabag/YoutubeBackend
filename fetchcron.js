const cron = require("node-cron");

const VideoModel = require("./schema");
const { fetchVideos } = require("./fetchClient");
const secrets = require("./secrets");

module.exports = () => {
  cron.schedule("* * * * *", async () => {
    try {
      let done = false;

      for (const apiKey of secrets.YOUTUBE_API_KEY.split(",")) {
        try {
          if (done) {
            break;
          }

          const videos = await fetchVideos(
            apiKey,
            secrets.YOUTUBE_SEARCH_QUERY
          );

          await VideoModel.create(videos);
          done = true;
        } catch (err) {
          console.log("Error saving videos", err);
        }
      }

      if (!done) {
        throw new Error("Quota exhausted for all keys");
      }
    } catch (err) {
        console.log("Quota exhausted for all keys", err);
    }
  });
};
