

import GeneralPosts from "@/app/components/GeneralPosts";
const Page = () => {
  return (
    <div className="overflow-auto max-h-[calc(100vh-160px)] md:max-h-[calc(100vh-80px)]
    flex h-full
    ">
        <GeneralPosts />
      <div className="sm:hidden md:block md:w-1/3"></div>
    </div>
  );
};

export default Page;
