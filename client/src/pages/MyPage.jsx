// In your page file, e.g., Home.jsx
import ParallaxText from "../components/ParallaxText";

function MyPage() {
  return (
    <section>
      {/* Scroll up/down to see the effect */}
      <div className="flex flex-col justify-center" style={{ height: "100vh", padding: "100px 0" }}>
        <ParallaxText baseVelocity={-3}>GSAP Rocks</ParallaxText>
        <ParallaxText baseVelocity={3}>Scroll Velocity</ParallaxText>
      </div>
    </section>
  );
}
export default MyPage;
