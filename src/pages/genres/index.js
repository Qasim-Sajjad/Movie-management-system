// This page will display list of Genres with a button to Browse Movies of That Genre.
// Server Side Rendering for Genres.
import Link from "next/link";
import fs from 'fs';

export default function Genres(props) {

    console.log(props.genres);
    return (
        <>
            <h1>Genres Page</h1>
            <ul>
                { props.genres.map((genre) => {
                    return (
                        <li key={genre.id}>
                            <h2>{genre.name}</h2>
                            <Link href={`/genres/${genre.id}`}>Browse {genre.name} Filtered Movies</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

// Server Side Rendering for Genres.
export async function getServerSideProps() {
    // Load using fs module.
    const data = fs.readFileSync('./data.json', 'utf-8');
    const movies_data = JSON.parse(data);

    const genres = movies_data.genres;

    return {
        props: {
            genres: genres
        }
    }
}