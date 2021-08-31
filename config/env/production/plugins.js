module.exports = {
  upload: {
    provider: "google-cloud-storage",
    providerOptions: {
      serviceAccount: env.json("GCS_SERVICE_ACCOUNT"),
      bucketName: env("GCS_BUCKET_NAME"),
    },
  },
};
