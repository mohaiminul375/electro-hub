export const dynamic = 'force-dynamic'
import Brands from "@/Components/Home/Brands";
import Banner from "../Components/Home/Banner";
import Categories from "../Components/Home/Categories";
import ForYou from "../Components/Home/ForYou";
import Promises from "../Components/Home/Promises";

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
