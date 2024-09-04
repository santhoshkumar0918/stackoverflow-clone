const env = {
  endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
  project: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  key: String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY),
};

export default env;
