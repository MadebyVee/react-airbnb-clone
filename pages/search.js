
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";


function Search({ searchResults }) {
    const router = useRouter();
    console.log(searchResults);
    const { location, startDate, endDate, numberOfGuests} = router.query;
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;

    return (
        <div className="">
        <Header
        placeholder={`${location} | ${range} | ${numberOfGuests}`}
        />
        <main className="flex">
            <section className="flex-grow pt-14 px-6">
                <p className="text-xs">300+ Stays - {range} for {numberOfGuests} number of guests</p>
                
                <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
                
                <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                    <p className="button">Cancelation Policy</p>
                    <p className="button">Type of places</p>
                    <p className="button">Price</p>
                    <p className="button">Rooms & Beds</p>
                    <p className="button">More filters</p>
                </div>
                <div className="flex flex-col">
                {searchResults.map(
                    ({img, location, title, description, star, price, total}) => (
                    <InfoCard 
                    key={img}
                    img={img}
                    location={location}
                    title={title}
                    description={description}
                    star={star}
                    price={price}
                    total={total}
                    />
                ))}
                </div>
                </section>

                <section className="hidden text-xs mb-2 lg:inline-flex lg:min-w-[300px]">

                    <Map searchResults= {searchResults} />

                </section>

        </main>
        <Footer/>
        </div>
    )
}

export default Search;

export async function getServerSideProps() {
    const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then(res => res.json());

    return {
        props: {
            searchResults,
        }
    }
}