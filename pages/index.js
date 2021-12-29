import Head from "next/head";
import Sidebar from "./../components/Sidebar/Sidebar";
import Center from "./../components/Center/index";
import { getSession } from "next-auth/react";
import Player from './../components/Player/index';
export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title> Spotify 2 </title> <link rel="icon" href="/favicon.ico " />
      </Head>
      {/* <login  /> */}
      <main className="flex">
        
        {/* Sidebar */} <Sidebar /> {/* center */} <Center />
      </main>
      <div className="sticky bottom-0"> 
        {/* player  */}
        <Player/>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
