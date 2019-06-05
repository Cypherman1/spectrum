// @flow
import cors from 'cors';

export const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
      ? [
          'http://ec2-18-224-212-70.us-east-2.compute.amazonaws.com',
          'https://alpha.ec2-18-224-212-70.us-east-2.compute.amazonaws.com',
          'https://admin.ec2-18-224-212-70.us-east-2.compute.amazonaws.com',
          'https://hyperion.workers.ec2-18-224-212-70.us-east-2.compute.amazonaws.com',
          'https://hyperion.alpha.ec2-18-224-212-70.us-east-2.compute.amazonaws.com',
          process.env.NOW_URL,
        ].filter(Boolean)
      : [/localhost/],
  credentials: true,
};

export default cors(corsOptions);
