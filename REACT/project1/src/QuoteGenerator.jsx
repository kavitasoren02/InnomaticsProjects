import React, { useState , useEffect } from 'react'

const QuoteGenerator = () => {

  const [quote, setQuote] = useState("Click the button to get inspired");
  const [image, setImage] = useState("https://static.vecteezy.com/system/resources/thumbnails/053/482/382/small/heart-shaped-moss-sculpture-in-lush-green-field-nature-art-concept-for-eco-friendly-design-photo.jpg");

  const motivationalQuotes = [
    {
      text: "Peace comes from within. Do not seek it without. – Buddha",
      image: "https://mrwallpaper.com/images/high/settling-down-is-peaceful-mro55jav3t5dx2c4.webp"
    },
    {
      text: "The greatest weapon against stress is our ability to choose one thought over another. – William James",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIls0SWebbbEeoMUlPC6VQav3-zHe5zUePMJdha2aWrpFG_HSNLtzJh6Lp9HbXwH9Vix4&usqp=CAU"
    },
    {
      text: "Calm mind brings inner strength and self-confidence, so that’s very important for good health. – Dalai Lama",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Bg6AE9nrSyfz13zjwFmvuvoP6wK-Fw9wOx0nU4VnfxFi2rj5XaulvLH4NxyBzImmbio&usqp=CAU"
    },
    {
      text: "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change. – Unknown",
      image: "https://cdn.magicdecor.in/com/2024/09/11140741/Feng-Shui-Buddha-Peaceful-Awakening-Wallpaper-Mural-M.jpg"
    },
    {
      text: "You cannot always control what goes on outside. But you can always control what goes on inside. – Wayne Dyer",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFsxvV7vzqMc_CZICCQVjsWMowMoyYOC18b5W-cE7laZ-XucK9Ba2Q-nWUCimyNFHvUeU&usqp=CAU"
    },
    {
      text: "Almost everything will work again if you unplug it for a few minutes, including you. – Anne Lamott",
      image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3BmLXM5NS1wYS0yMDQwXzQuanBn.jpg"
    },
    {
      text: "Self-care is not a luxury. It is a necessity for a balanced life. – Unknown",
      image: "https://png.pngtree.com/thumb_back/fh260/background/20250121/pngtree-tranquil-sands-and-stones-a-peaceful-sunset-beach-escape-image_16927497.jpg"
    },
    {
      text: "Nothing can bring you peace but yourself. – Ralph Waldo Emerson",
      image: "https://img.freepik.com/free-photo/beautiful-shot-nose-small-boat-sailing-sea-with-amazingclouds-red-sky_181624-2428.jpg?semt=ais_hybrid"
    },
    {
      text: "Take a deep breath. Inhale peace. Exhale stress. – Unknown",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv47LDBfB51EcRpT_5hDeuZnPgH-DK_oEVHYjc8lZERvr4wb20_SAkb10LASQ83gONWvo&usqp=CAU"
    },
    {
      text: "Happiness is not the absence of problems, it's the ability to deal with them. – Steve Maraboli",
      image: "https://wallpapers.com/images/hd/meditation-background-7gaisjacneo3jj4r.jpg"
    }
  ];

  function generateQuote() {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    const randomQuote = motivationalQuotes[randomIndex];
    setQuote(randomQuote.text);
    setImage(randomQuote.image);
  }


  // Automatically update quote every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      generateQuote();
    }, 2000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{...styles.container, backgroundImage: `url(${image})`}}>
      <div style={styles.overlay}>
        <h2>😊 Random Quote Generator</h2>
        <p style={styles.quote}>{quote}</p>
        {/* <button style={styles.button} onClick={generateQuote}>
          Get New Quote
        </button> */}
      </div>
    </div>
  )
}

export default QuoteGenerator

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
    padding: "2rem",
    borderRadius: "8px",
    textAlign: "center",
    color: "#fff"
  },
  quote: {
    fontSize: "22px",
    margin: "1rem 0"
  },
  button: {
    backgroundColor: "#fff",
    color: "#333",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  }
};
