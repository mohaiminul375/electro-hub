export const dynamic = 'force-dynamic'
import Brands from "@/components/Home/Brands";
import Banner from "../components/Home/Banner";
import Categories from "../components/Home/Categories";
import ForYou from "../components/Home/ForYou";
import Promises from "../components/Home/Promises";

export default function Home() {
  return (
    <section className="pt-0">
      <head>
        <title>Electro-Hub | Home</title>
      </head>
      <Banner />
      <div className="space-y-20 mt-20">
        <Promises />
        <Brands />
        <ForYou />
        <Categories />
      </div>
    </section>
  );
}
