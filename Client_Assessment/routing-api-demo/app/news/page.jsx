"use client"; 
import Link from "next/link";
import { useEffect, useState } from 'react';

export default function News() {
    // Initializes the state to hold the titles of news articles
    const [newsTitles, setNewsTitles] = useState([]);

    // useEffect hook to fetch news titles once the component mounts
    useEffect(() => {
      // Define an asynchronous function to fetch data from an API
      const getData = async () => {
        // Fetch data from the news API
        const query = await fetch('https://newsdata.io/api/1/news?apikey=pub_40664457e143779de224c92b0050e1ff5ae30&q=sports&country=us&language=en&category=sports')
        
        // Parse the response to JSON
        const response = await query.json();
        
        // Extract titles from the response data
        const titles = response.results.map(newsItem => newsItem.title);

        // Update the state with the fetched titles
        setNewsTitles(titles);
      }

      // Call the getData function
      getData();
    }, []);

    // Renders the component
    return (
        <main>
            <h1 style={{ fontWeight: 'bold' }}>API: News Titles</h1>
            <br></br>
            <h1 style={{ fontWeight: 'bold' }}>Sports News Titles Fetched Using an API:</h1> <br></br>
            {/* Maps over the state array to render each title as a list item */}
            <ul>
                {newsTitles.map((title, index) => (
                <li key={index}>{title}</li>
                ))}
            </ul><br></br>
            {/* Links for navigation */}
            <Link href="/" style={{ textDecoration: 'underline' }}>Route back to home page</Link> <br></br>
            <Link href="/news/latest" style={{ textDecoration: 'underline' }}>Click to Route to Latest News Section</Link>
        </main>     
    )
}