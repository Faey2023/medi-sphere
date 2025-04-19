module.exports = {
  env: {
    SERVER_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  images: {
    domains: [
      'cdn1.iconfinder.com',
      'github.githubassets.com',
      'cdn.pixabay.com', // fallback image
      'lh3.googleusercontent.com', // if using Google provider
      'avatars.githubusercontent.com', // if using GitHub provider
      'localhost',
      'demo2.themelexus.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'demo2.themelexus.com',
        pathname: '**',
      },
    ],
  },
};
