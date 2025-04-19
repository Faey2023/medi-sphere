module.exports = {
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
  images: {
    domains: [
      'cdn1.iconfinder.com',
      'github.githubassets.com',
      'cdn.pixabay.com', // fallback image
      'lh3.googleusercontent.com', // if using Google provider
      'avatars.githubusercontent.com', // if using GitHub provider
      'demo2.themelexus.com', //for image
      'localhost',
    ],
  },
};
