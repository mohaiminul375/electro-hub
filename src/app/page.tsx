import Banner from "./Components/Home/Banner";
import Categories from "./Components/Home/Categories";
import ForYou from "./Components/Home/ForYou";

export default function Home() {
  return (
    <section className="pt-10">
      <Banner />
      <ForYou />
      <Categories />
    </section>
  );
}
