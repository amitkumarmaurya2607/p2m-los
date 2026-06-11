import Header from "@/views/Dashbaord/componants/Header";
import ProgressBar from "@/views/Dashbaord/componants/ProgressBar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import GeoLocationGuard from "@/components/GeoLocationGuard";

function LayoutV1({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <div className="flex">
        <div className="grow-1">
          <ProgressBar />
          <div className="flex justify-center px-4 pt-6 lg:pt-12 pb-6">
            <ErrorBoundary label="Dashboard">
              <GeoLocationGuard>{children}</GeoLocationGuard>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </>
  );
}

export default LayoutV1;
