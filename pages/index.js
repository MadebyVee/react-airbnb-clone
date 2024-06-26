import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import Largecard from "../components/LargeCard";
import Footer from "../components/Footer";

export default function Home({ exploreData, cardsData }) {
  return (
    <div className=" bg-red-50">
      <Head>
        <title>Airbnb Clone</title>
        <link rel="icon" heref="/favicon.ico" />
      </Head>

    <Header />
    <Banner />
    <main className="max-w-7xl mx-auto px-8 sm:px-16">
      <section className="pt-6">
        <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

        {/* Pull Data from server */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {exploreData?.map((item) => (
         <SmallCard
         key={item.img} 
         img={item.img} 
         distance={item.distance} 
         location={item.location}  
         />
        ))}
        </div>
       
      </section>

      <section>
        <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>

        <div className="flex space-x-3 overflow-scroll scrollbar-hide p3 -ml-3">
        {cardsData?.map( ({ img, title }) => (
          <MediumCard 
          key={img} 
          img={img} 
          title={title} 
          />
        ))}
        </div>

      </section>
        <Largecard
        img="https://links.papareact.com/4cj"
        title="The Views You Deserve"
        description="Challenge accepted by VEE"
        buttonText="Be Great"
        />
    </main>
    <Footer />
    </div>
  );
}

export async function getStaticProps() {

  const exploreData = await fetch('https://www.jsonkeeper.com/b/4G1G').
  then(
      res => res.json()
  );

  const cardsData = await fetch('https://www.jsonkeeper.com/b/VHHT').
  then(
      res => res.json()
  );

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}