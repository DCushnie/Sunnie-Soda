function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none shrink">
      
      {/* Purple Blob */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] 
                      bg-purple-400 opacity-40 rounded-full 
                      blur-3xl mix-blend-multiply 
                      animate-[floatSlow_22s_ease-in-out_infinite]" />
    
      <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] 
                      bg-yellow-400 dark:bg-yellow-200 opacity-40 rounded-full 
                      blur-3xl mix-blend-multiply 
                      animate-[floatFast_22s_ease-in-out_infinite]" />

      {/* Blue Blob */}
      <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] 
                      bg-blue-400 opacity-40 rounded-full 
                      blur-3xl mix-blend-multiply 
                      animate-[floatMedium_9s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] 
                      bg-pink-400 opacity-40 rounded-full 
                      blur-3xl mix-blend-multiply 
                      animate-[floatSlow_9s_ease-in-out_infinite]" />

      {/* Pink Blob */}
      <div className="absolute top-[30%] right-[20%] w-[400px] h-[400px] 
                      bg-pink-400 opacity-40 rounded-full 
                      blur-3xl mix-blend-multiply 
                      animate-[floatFast_10s_ease-in-out_infinite]" />
      
     
        <div
          className="
            absolute
            w-[600px] h-[600px]
            rounded-full
            bg-gradient-to-br from-green-400 to-blue-400
            opacity-40
            blur-3xl
            animate-[wander_8s_ease-in-out_infinite]
          "
        />


      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
    </div>
  );
};

export default AnimatedBackground;
