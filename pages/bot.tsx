import Link from 'next/link'
import { useEffect, useState } from 'react';
import {Game} from '../Game'

function Test() {
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
        <li key={number}>{number}</li>
    );
    const link = <li key="link">
        <Link 
        href={{
                pathname: "/",
                query: { back: "true" }
            }}
        >
            <a>Home</a>
        </Link>
    </li>;
    listItems.push(link);
    return <>
        <ul>
            {listItems}
        </ul>
    </>
}

function WrapDiv(props) {
    return <div id={props.id}>{props.inner}</div>
}
function SoundItem(props) {
    if (props.controls) return <audio controls>
        <source src={props.src} type="audio/ogg" />
    </audio>
    return <audio src={props.src}></audio>
}

function Canvas(props) {
    useEffect( () => {
        const game = new Game();
    });

    return <canvas id={props.id}></canvas>
}

function Bot(props) {
    // const [state, setState] = useState( () => {
    //     return { load : false};
    // });
    // useEffect( () => {
    //     const game = new Game();

    // }, [state.load])
    const soundBar = <SoundItem controls src="" />
    const soundWrap = <WrapDiv id="soundControl" inner={soundBar} />;
    const canvas = <Canvas id="canvas" />;
    const main = <WrapDiv id="flexWrap" inner={canvas} />;
    return <>
        
        <h1>Welcome to the NextChomp Bot Page!</h1>
        {soundWrap}
        {main}
        {/* {() => {
            setState( (prev) => {
                return {...prev, load: true};
            })
        }} */}
        <Test />
    </>
}

export default Bot
