import { dataCsv } from "@/data/mapData";
import MainMap from "./map";

const data = dataCsv.data;

export default function Page() {
  return (
    <main className="relative h-screen sm:mb-0 sm:ml-0 sm:pr-16">
      <MainMap dataCsv={data} />
    </main>
  );
}
