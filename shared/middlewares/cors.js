// @flow
import cors from 'cors';

export const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
      ? [
          'http://ec2-18-224-212-70.us-east-2.compute.amazonaws.com',
          'https://alpha.spectrum.chat',
          'https://admin.spectrum.chat',
          'https://hyperion.workers.spectrum.chat',
          'https://hyperion.alpha.spectrum.chat',
          process.env.NOW_URL,
        ].filter(Boolean)
      : [/localhost/],
  credentials: true,
};

export default cors(corsOptions);
