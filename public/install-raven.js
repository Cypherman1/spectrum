Raven.config('https://3bd8523edd5d43d7998f9b85562d6924@sentry.io/154812', {
  whitelistUrls: [/ec2-18-224-212-70.us-east-2.compute.amazonaws.com/, /www.ec2-18-224-212-70.us-east-2.compute.amazonaws.com/],
}).install();
