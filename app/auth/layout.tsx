const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex items-center justify-center  md:h-screen bg-black bg-grid-small-white/[0.2]">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 lg:mt-15 2xsm:my-[145px] 2xsm:mx-4 xsm:my-[145px] xsm:mx-8 md:my-10 md:mx-2">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
