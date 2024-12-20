// As someone who has never used Next.js before, grasping the concept of 
// navigation and the file-system-based routing took a bit of time to understand.

// Additionally, coming to grips with React's useState and useEffect hooks was a 
// unique challenge. Learning how state variables are preserved between renders 
// without the need to explicitly save them was a new concept for me. Unlike 
// traditional methods where I might have to write specific functions to handle 
// state, React and Next.js abstract much of this away.


import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ fontWeight: 'bold' }}>Welcome!</h1> <br></br>
      
      {/* This Link component navigates the user to the /news page.*/}
      <Link href="/news" style={{ textDecoration: 'underline' }}>Click to Route to API News Section</Link> <br></br>
      
      {/* Another Link component, this one navigates the user to the /news/latest page */}
      <Link href="/news/latest" style={{ textDecoration: 'underline' }}>Click to Route to Latest News Section</Link>
    </main>
  );
}