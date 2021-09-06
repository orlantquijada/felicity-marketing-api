module.exports = ({ env }) => ({
  upload: {
    provider: "google-cloud-storage",
    providerOptions: {
      serviceAccount: env.json("GCS_SERVICE_ACCOUNT"),
      bucketName: env("GCS_BUCKET_NAME"),
    },
  },
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
  },
});
