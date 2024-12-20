import Link from "next/link";
export default function News() {
    return (
        <main>
            <div>Latest News</div>
            <br></br> 
            {/* Uses the Link component to create a client-side link to the "/news" route. This allows for navigation without a full page reload, improving performance and user experience. */}
            <Link href="/news" style={{ textDecoration: 'underline' }}>Route back to News Section</Link> <br></br>
        </main> 
    )
}
