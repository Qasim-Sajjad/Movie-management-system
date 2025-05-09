import fs from 'fs';
import Link from 'next/link';

export default function MovieDetailsPage(props) {
    return (
        <>
            <h1>Movie Details Page</h1>
            <h2>{props.movie.title}</h2>
            <p>{props.movie.description}</p>
            <p>{props.movie.releaseYear}</p>
            <p>{props.movie.rating}</p>
            <Link href={'/movies/' + props.movie.id + '/director'}> View Director Details</Link>
        </>
    )
}

// Using Static Generation.

// Define the paths that have to be rendered at build time and at run time.
export async function getStaticPaths() {
    const data = fs.readFileSync('./data.json','utf-8');
    const movies_data = JSON.parse(data);

    const paths = movies_data.movies.map((movie) => {
        return {
            params: {
                id: movie.id
            }
        }
    })

    return {
        paths: paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;
    const data = fs.readFileSync('./data.json','utf-8');
    const movies_data = JSON.parse(data);

    const movie = movies_data.movies.find((movie) => movie.id === id);

    return {
        props: {
            movie: movie
        }
    }
}