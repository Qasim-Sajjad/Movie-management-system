import fs from 'fs';
import Link from 'next/link';
export default function GenreFilteredMovies(props) {

    console.log(" Genre Movies are: ", props.genre_movies);
    console.log(" Genre Name is: ", props.genre_name);
    return (
        <>
            <h1>{props.genre_name} Movies</h1>
            <ul>
                {props.genre_movies.map((movie) => {
                    return (
                        <li key={movie.id}>
                            <h2>{movie.title}</h2>
                            <Link href={`/movies/${movie.id}`}>View Movie Details</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}


export async function getServerSideProps(context) {
    const genre_id  = context.params.id;
    const data = fs.readFileSync('./data.json','utf-8');
    const movies_data = JSON.parse(data);

    // Using genre id get the filtered movies.
    const genre_movies = movies_data.movies.filter((movie) => movie.genreId === genre_id);
    const genre_name = movies_data.genres.find((genre) => genre.id === genre_id).name;

    return {
        props: {
            genre_movies: genre_movies,
            genre_name: genre_name
        }
    }
}
