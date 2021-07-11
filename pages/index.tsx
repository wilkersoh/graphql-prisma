import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center w-full min-h-screen items-center bg-gray-100">
        <div className="h-96 w-1/2 bg-white flex justify-center items-center">
          <Link href="/add">
            <a className="bg-gray-900 text-white text-lg font-semibold rounded-md hover:bg-gray-800 py-3 px-4 mx-2">
              Add your cards
            </a>
          </Link>
          <Link href="/search">
            <a className="bg-gray-900 text-white text-lg font-semibold rounded-md hover:bg-gray-800 py-3 px-4 mx-2">
              Find other cards
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
