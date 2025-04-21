module.exports = {
  images: {
    domains: [
      'cdn1.iconfinder.com',
      'github.githubassets.com',
      'cdn.pixabay.com', // fallback image
      'lh3.googleusercontent.com', // if using Google provider
      'avatars.githubusercontent.com', // if using GitHub provider
      'localhost',
      'demo2.themelexus.com',
      'www.squarepharma.com.bd',
      // 'res.cloudinary.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '**',
      },
    ],
  },
};
