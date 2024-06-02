import { Map1 } from "./map";
// import classes from "./Page.module.css";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// export function Sidepanel() {
//   return (
//     <div
//       className="absolute m-auto items-end justify-end rounded-xl bg-white pb-[400px]"
//       style={{
//         width: 400,
//         height: "100%",
//         position: "absolute",
//         // top: 100,
//         right: 0,
//       }}
//     >
//       {/* <Map2 token={TOKEN} /> */}
//     </div>
//   );
// }

export default function Home() {
  return (
    <main className="fixed w-screen h-screen">
      <Map1 token={TOKEN} />
      {/* <Sidepanel /> */}
    </main>
  );
}
