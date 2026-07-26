import HomeCanvas from "@/components/homeCanvas/HomeCanvas";
import HomeIntro from "@/components/homeIntro/HomeIntro";

const HomePage: React.FC = () => {
  return (
    <main
      id="home"
      className="dot-grid flex flex-1 flex-col gap-16 overflow-hidden px-10 py-12 lg:flex-row lg:gap-20"
    >
      <HomeIntro />

      <HomeCanvas />
    </main>
  );
};

export default HomePage;
