const config = {
  BASE_API_URL: process.env.BASE_API_URL,
  HTTP_PROTOCOL: process.env.HTTP_PROTOCOL,
  WS_PROTOCOL: process.env.WS_PROTOCOL,
};

for (const key in config)
  if (!config[key as keyof typeof config])
    throw new Error(`Environment variable ${key} is not defined`);

export default {
  HTTP_URL: `${config.HTTP_PROTOCOL}://${config.BASE_API_URL}/api`,
  WS_URL: `${config.WS_PROTOCOL}://${config.BASE_API_URL}/ws`,
};
