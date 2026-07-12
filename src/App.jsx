import { useState } from "react";
import "./styles/theme.css";

import Hero from "./components/Hero";
import Message from "./components/Message";
import PhotoGallery from "./components/PhotoGallery";
import PromiseSection from "./components/PromiseSection";
import WishSection from "./components/WishSection";
import BackgroundMusic from "./components/BackgroundMusic";

import { content } from "./data/content";

function App() {
  const [showContent, setShowContent] = useState(false);

  return (
    <div>
      {/* Background Music */}
      <BackgroundMusic songUrl={content.songUrl} />

      {/* Hero Section */}
      <Hero
        name={content.name}
        photoUrl={content.photos[0].url}
        onEnter={() => setShowContent(true)}
      />

      {/* Show Content After Button Click */}
      {showContent && (
        <div className="container">
          <Message letter={content.letter} />

          <PhotoGallery photos={content.photos} />

          <PromiseSection promises={content.promises} />

          <WishSection />

          {/* Footer */}
          <center>
          <footer className="footer">
            <h2>🔱</h2>
            <p>Mere Mahadev tume wo sab denge jo tum deserve karte ho. 🧡</p>
            <small>✦ Hamesha khush rahena samji ✦</small>
          </footer>
          </center>
        </div>
      )}
    </div>
  );
}

export default App;