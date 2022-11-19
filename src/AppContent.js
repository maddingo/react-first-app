import './AppContent.css';
import { useState } from 'react';

export default function AppContent() {
    return (
        <Board/>
    );
}

function Square({sid, state, onClick}) {

    return (<button className="square" data-testid={'square-' + sid} onClick={onClick}>{state.squares[sid]}</button>);
}

function PlayerStatus({state}) {
    let statusText;
    if (state.winner === undefined) {
        statusText = 'Next Player: ' + state.player;
    } else {
        statusText = 'The winner is ' + state.winner;
    }
    return (
        <div data-testid="status-text" className="status">{statusText}</div>
    );
}

function Board() {
    const [state, setState] = useState({squares: Array(9).fill(' '), player: 'X'} );

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    function click(sid, state, e) {
        if (state.winner === undefined && state.squares[sid] === ' ') {
            const newState = {};
            newState.squares = state.squares.slice()
            newState.squares[sid] = state.player;

            if (state.player === 'X') {
                newState.player = 'O';
            } else {
                newState.player = 'X';
            }
            const winner = calculateWinner(newState.squares)
            if (winner === 'X' || winner === 'O') {
                newState.winner = winner;
            }
            setState(newState);
        }
    }

    function resetState() {
        setState({squares: Array(9).fill(' '), player: 'X'});
    }

    return (
        <div className="content">
            <PlayerStatus state={state}/>
            <div className="board">
                <div className="board-row">
                    <Square sid={0} state={state} onClick={click.bind(this, 0, state)}/>
                    <Square sid={1} state={state} onClick={click.bind(this, 1, state)}/>
                    <Square sid={2} state={state} onClick={click.bind(this, 2, state)}/>
                </div>
                <div className="board-row">
                    <Square sid={3} state={state} onClick={click.bind(this, 3, state)}/>
                    <Square sid={4} state={state} onClick={click.bind(this, 4, state)}/>
                    <Square sid={5} state={state} onClick={click.bind(this, 5, state)}/>
                </div>
                <div className="board-row">
                    <Square sid={6} state={state} onClick={click.bind(this, 6, state)}/>
                    <Square sid={7} state={state} onClick={click.bind(this, 7, state)}/>
                    <Square sid={8} state={state} onClick={click.bind(this, 8, state)}/>
                </div>
            </div>
            <ResetGame state={state} onclick={resetState}/>
        </div>
    );
}

function ResetGame({state, onclick}) {

    return (
        <button className="reset-button" onClick={onclick} hidden={state.winner === undefined}>Reset</button>
    )
}
