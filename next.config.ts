module.exports = {
  images: {
    domains: [
      'cdn1.iconfinder.com',
      'github.githubassets.com',
      'cdn.pixabay.com', // fallback image
      'lh3.googleusercontent.com', // if using Google provider
      'avatars.githubusercontent.com', // if using GitHub provider
      'www.squarepharma.com.bd',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
        // pathname: '/dx4vanvsp/**',
      },
      {
        protocol: 'https',
        hostname: 'demo2.themelexus.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
        pathname: '**',
      },
    ],
  },
};
