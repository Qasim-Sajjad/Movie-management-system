// Pick Up movie id from the url and using CSR get director details.

import { useRouter } from "next/router"
import { useEffect } from "react"

export default function DirectorDetailsPage() {
    const router = useRouter();
    const movie_id = router.query.id;
    
    useEffect(() => {
        
    },[])

    return (
        <>
            <h1>Director Details Page</h1>
        </>
    )
}
