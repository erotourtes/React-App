export const envConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  let envFilePath = '.env.local';
  if (env === 'local') envFilePath = '';

  return {
    envFilePath,
  };
};
