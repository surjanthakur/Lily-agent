import LilyLogo from '../assets/lily-logo.png';
import { toast } from 'react-toastify';

const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export default function Navbar() {
  const handleLoginUser = () => {
    const width = 500;
    const height = 600;

    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      `${BACKEND_URL}/google/login`,
      'google-login',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Popup blocked
    if (!popup) {
      toast.error('Please allow popups to login with Google.');
      return;
    }

    // Listen for OAuth result
    const handleMessage = (event) => {
      // Security: only accept message from your backend/frontend origin
      if (event.origin !== window.location.origin) {
        return;
      }

      if (event.data?.type === 'GOOGLE_LOGIN_SUCCESS') {
        toast.success('Successfully logged in with Google! 🎉');

        window.removeEventListener('message', handleMessage);
      }

      if (event.data?.type === 'GOOGLE_LOGIN_ERROR') {
        toast.error('Google login failed.');

        window.removeEventListener('message', handleMessage);
      }
    };

    window.addEventListener('message', handleMessage);
  };
  return (
    <nav className="sticky top-0 z-50 w-full  backdrop-blur-lg">
      <div
        className=" mx-auto flex h-25 w-full items-center justify-between px-6 sm:px-10 lg:px-14
        "
      >
        {/* ================= LOGO ================= */}
        <a
          href="/home"
          className="
            group
            relative
            inline-flex
            items-center
            rounded-md
            py-2
          "
        >
          <img
            src={LilyLogo}
            alt="Lily"
            className="
              h-20
              w-auto
              object-contain
              transition-transform
              duration-200
              group-hover:-rotate-100
            "
          />

          {/* hover underline */}
          <span
            className="
              absolute
              bottom-0
              left-0
              h-1
              w-0
              bg-lime-400
              transition-all
              duration-300
              group-hover:w-full
            "
          />
        </a>

        {/* ================= GOOGLE LOGIN ================= */}
        <button
          onClick={handleLoginUser}
          type="button"
          className="
              group
              flex
              min-h-14
              items-center
              justify-center
              gap-3
              rounded-xl
              border-2
              border-black
              bg-[#caff8a]
              px-6
              font-mono
              text-sm
              font-bold
              text-black
              shadow-[4px_5px_0px_#000]
              transition-all
              duration-200

              hover:-translate-y-1
              hover:bg-[#d6ff9b]
              hover:shadow-[6px_7px_0px_#000]

              active:translate-y-0
              active:shadow-[2px_3px_0px_#000]

              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-black
            "
        >
          <img
            src="https://cdn.reicon.dev/logos/google/original.svg"
            alt="Google"
            width={22}
            height={22}
            className="
                transition-transform
                duration-200
                group-hover:scale-110
              "
          />

          <span>Continue with Google</span>
        </button>
      </div>
    </nav>
  );
}
