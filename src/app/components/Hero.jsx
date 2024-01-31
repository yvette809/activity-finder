const Hero = () => {
  return (
    <div className="relative h-screen mb-3">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: 'url("/assets/main.webp")' }}
      />

      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

      {/* Text Overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">
          Seize the Day! Book Your Activity for Unforgettable Fun
        </h1>
    
      </div>
    </div>
  );
};

export default Hero;
