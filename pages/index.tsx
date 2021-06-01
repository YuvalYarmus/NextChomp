import Link from 'next/link'
import Head from 'next/head'
function HomePage() {
    return <> 
    <Head>
        <title>NextChomp</title>
    </Head>
    <div>
        <a>Welcome to Next.js!!!!</a>
        <br />
        <a>Happy to see you!</a>
        <br /><br />
        <Link
        href= {
            {
                pathname: "/bot"
                
            }
        }
        >
        
            <a>Bot page</a>
        </Link>
    </div>
    </>
}

export default HomePage
