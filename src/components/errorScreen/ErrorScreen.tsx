import ViewportSwitch from "@/components/viewportSwitch/ViewportSwitch";
import DesktopErrorCard from "./components/DesktopErrorCard";
import ErrorGlow from "./components/ErrorGlow";
import MobileErrorCard from "./components/MobileErrorCard";
import { errorScreenRoot } from "./components/errorScreen.variants";

const ErrorScreen: React.FC = () => {
  return (
    <main id="error-screen" className={errorScreenRoot}>
      <ErrorGlow />

      <ViewportSwitch mobile={<MobileErrorCard />}>
        <DesktopErrorCard />
      </ViewportSwitch>
    </main>
  );
};

export default ErrorScreen;
