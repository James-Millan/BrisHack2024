import { useState } from "react";

function App() {

  const [bearerToken, setBearerToken] = useState<string | null>(null);

  return (
    <div className="App bg-gradient-to-t to-green-500 from-green-900 h-screen w-screen">
      {bearerToken}
      {bearerToken === null &&
      // <a className="cursor-pointer bg-green-800 text-gray-100 p-5 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" href="/auth">Login with Spotify</a>
      <div className="cursor-pointer bg-green-800 text-gray-100 p-5 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" onClick={() => setBearerToken("Hi")}>Login with Spotify</div>
      }
    </div>
  );
}

export default App;
