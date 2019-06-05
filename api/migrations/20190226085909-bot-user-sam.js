exports.up = function(r, conn) {
  return r
    .table('users')
    .insert({
      id: 'sam',
      description: "Spectrum's automated bot.",
      createdAt: new Date(),
      email: null,
      providerId: null,
      fbProviderId: null,
      githubProviderId: null,
      githubUsername: 'withspectrum',
      googleProviderId: null,
      isOnline: true,
      lastSeen: new Date(),
      modifiedAt: new Date(),
      name: 'Spectrum Bot',
      termsLastAcceptedAt: new Date(),
      username: 'spectrumbot',
      website: 'http://ec2-18-224-212-70.us-east-2.compute.amazonaws.com',
      profilePhoto: '/default_images/sam.png',
    })
    .run(conn);
};
exports.down = function(r, conn) {
  return r
    .table('users')
    .get('sam')
    .delete()
    .run(conn);
};
