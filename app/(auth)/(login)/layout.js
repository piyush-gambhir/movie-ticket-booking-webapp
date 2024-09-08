import Image from "next/image";

export default function LoginLayout({ children }) {
  return (
    <div className="h-screen w-screen md:grid md:grid-cols-5">
      <div className="flex h-full w-full flex-col justify-center px-8 py-12 md:col-span-2 lg:px-16">
        <Image
          src={"/logo.png"}
          alt="Logo"
          width={80}
          height={80}
          className="mb-8 h-12 w-12 md:h-24 md:w-24"
        />
        <div className="grid gap-6">{children}</div>
      </div>
      <div className="col-span-3 hidden h-full w-full bg-black md:grid">
        <Image
          src="/login-bg.jpg"
          alt="Sign in to your account"
          width={1440}
          height={1024}
          className="h-full"
        />
      </div>
    </div>
  );
}
