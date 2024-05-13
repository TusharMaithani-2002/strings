

import GeneralPosts from "@/app/components/GeneralPosts";
import OnboardingRouting from "@/app/components/OnboardingRouting";
const Page = () => {
  return (
    <div className="overflow-auto max-h-[calc(100vh-160px)] md:max-h-[calc(100vh-80px)]
    flex h-full
    ">
      <OnboardingRouting />
        <GeneralPosts />
      <div className="sm:hidden md:block md:w-1/3"></div>
    </div>
  );
};

export default Page;
