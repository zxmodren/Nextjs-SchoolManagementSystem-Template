import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { lusitana } from "@/components/ui/fonts";
import { ImagesSliderDemo } from "@/components/image-slider/Demo";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-black bg-grid-small-white/[0.2] overflow-hidden">
      <div className="mt-4 flex-grow flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col shadow-xl justify-center gap-6 rounded-lg bg-gray900 border border-gray800 px-6 py-10 md:w-2/5 md:px-20 xsm:px-[125px] 2xsm:px-[100px]">
          <div>
            <LoginButton asChild>
              <Button
                variant="secondary"
                size="lg"
                className="hover:bg-green-700 bg-transparent border border-white transition-colors duration-300 text-white "
              >
                Sign in
              </Button>
            </LoginButton>
          </div>
        </div>
        <ImagesSliderDemo />
      </div>
    </main>
  );
}
