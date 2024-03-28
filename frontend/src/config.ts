const config = {
  API_URL: process.env.API_URL,
};

if (!config.API_URL) throw new Error("API_URL is not defined");

export default config;
