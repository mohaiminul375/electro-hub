export const dynamic = 'force-dynamic'
import Brands from "@/components/Home/Brands";
import Banner from "../components/Home/Banner";
import Categories from "../components/Home/Categories";
import ForYou from "../components/Home/ForYou";

export default function Home() {
  return (
    <section className="pt-10 space-y-20">
      <Banner />
      <ForYou />
      <Categories />
      <Brands/>
    </section>
  );
}
