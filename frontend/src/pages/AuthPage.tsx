import { useState } from "react";

function AuthPage() {

  const [bearerToken, setBearerToken] = useState<string | null>(null);

  return (
    <div className="App bg-gradient-to-t to-green-500 from-green-900 h-screen w-screen">
      {bearerToken}
      {bearerToken === null &&
      <a href={authRedirect} className="cursor-pointer bg-green-800 text-gray-100 p-5 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" >Login with Spotify</a>
      }
    </div>
  );
}

export default AuthPage;
