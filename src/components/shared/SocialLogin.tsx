import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const SocialLogin = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSocialLogin = (provider: string) => {
    signIn(provider, {
      callbackUrl,
    });
  };

  return (
    <div className="flex flex-col space-y-3">
      <button
        onClick={() => handleSocialLogin('github')}
        className="flex cursor-pointer items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-600"
      >
        <Image
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub Logo"
          width={24}
          height={24}
          className="mr-2 rounded-full"
        />
        Login with GitHub
      </button>
      <button
        onClick={() => handleSocialLogin('google')}
        className="flex cursor-pointer items-center justify-center rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-600"
      >
        <Image
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          alt="GitHub Logo"
          width={24}
          height={24}
          className="mr-2 rounded-full"
        />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
