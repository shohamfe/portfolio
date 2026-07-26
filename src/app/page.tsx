import FolderGrid from "@/components/folderGrid/FolderGrid";
import HomeIntro from "@/components/homeIntro/HomeIntro";

const HomePage: React.FC = () => {
  return (
    <main className="dot-grid flex flex-1 flex-col gap-16 px-10 py-12 lg:flex-row lg:gap-20">
      <HomeIntro />

      <FolderGrid />
    </main>
  );
};

export default HomePage;
