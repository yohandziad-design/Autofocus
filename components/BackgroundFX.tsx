"use client";

/**
 * BackgroundFX Component
 * Creates a subtle, ambient lighting effect with animated, blurred halos,
 * simulating premium LED light bars.
 * This adds depth and a modern feel to the background without being distracting.
 * It's positioned fixed behind all other content.
 */
const BackgroundFX = () => {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0">
        {/* Multiple light halos for a dynamic, layered effect */}
        <div className="led-halo top-[-10%] left-[5%] h-[300px] w-[500px] animation-delay-0" />
        <div className="led-halo top-[20%] right-[-15%] h-[400px] w-[600px] animation-delay-2000" />
        <div className="led-halo bottom-[-20%] left-[15%] h-[350px] w-[550px] animation-delay-4000" />
        <div className="led-halo bottom-[5%] right-[5%] h-[250px] w-[400px] animation-delay-6000" />
      </div>
    </div>
  );
};

export default BackgroundFX;
