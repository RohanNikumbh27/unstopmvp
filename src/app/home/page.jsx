import { UserProfile } from "@/components/home/UserProfile";

export default function Home() {
  return (
    <main className="min-h-svh flex flex-col items-center bg-white">
      <section className="pt-20 text-center">
        <h1 className="text-3xl md:text-4xl font-medium text-[#1C1B1F]">
          Welcome to
        </h1>
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary mt-1">
          Unstop
        </h2>
      </section>

      <UserProfile />
    </main>
  );
}
