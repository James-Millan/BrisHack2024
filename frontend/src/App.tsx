import { useState } from "react";

const authRedirect = "https://accounts.spotify.com/authorize/?client_id=288d966268824117b239c0f7ed003d0d&response_type=token&redirect_uri=http%3A%2F%2F127.0.0.1%3A5000%2Fcallback&scope=user-read-private+user-read-email%2C+user-library-read&state=OW5M366OWA2YW7XQ";

function App() {

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

export default App;
