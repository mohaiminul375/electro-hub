export const dynamic = 'force-dynamic'
import Brands from "@/components/Home/Brands";
import Banner from "../components/Home/Banner";
import Categories from "../components/Home/Categories";
import ForYou from "../components/Home/ForYou";

export default function Home() {
  return (
    <section className="pt-0 ">
      <Banner />
      <div className="space-y-20 mt-20">
        <Brands />
        <ForYou />
        <Categories />
      </div>
    </section>
  );
}
