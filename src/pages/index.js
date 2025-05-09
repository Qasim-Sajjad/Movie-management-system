import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import fs from 'fs';
import styles from "@/styles/Home.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home(props) {
  // IN home page, we will have list of trending movies from data.json file. Using getStaticProps to get the data.
  console.log(props.movies);
  const router = useRouter();

  const browseGenres = () => {
    router.push('/genres');
  }
  return (
    <>
      <h1>Trending Movies</h1>
      <ul>
        { props.movies.map((movie) => {
          return (
            <li key={movie.id}>
              <h2>Title: {movie.title}</h2>
              <p>Rating: {movie.rating}</p>
            </li>
          )
        } )}
      </ul>

      <button onClick={() => browseGenres()}>Browse Genres</button>
    </>
  );
}

// Incremental Static Regeneration using revalidate key.
export async function getStaticProps() {
  // Load using fs module.
  const data = fs.readFileSync('./data.json', 'utf-8');
  const movies_data = JSON.parse(data);

  // if data is not found, return notfound as true.
  if (movies_data === null) {
    return {
      notFound: true
    }
  }

  // Fint the top three best rated movies and return them.
  let topThreeMovies = []
  topThreeMovies=movies_data.movies.sort((a,b) => b.rating - a.rating).slice(0,3); // sort in descending order and get top three movies.

  // Using Revalidate key and notfound if data is not found.
  // revalidate every 30 seconds.
  return {
    props: {
      movies: topThreeMovies
    },
    revalidate: 30,
    // if data is not found, return notfound as true.
    notFound: false
  }
}
