'use client';

import './test.css';
import { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
export default function Page() {
    const [difficulty, setDifficulty] = useState('easy');
    let dimensions;

    if (difficulty == 'easy') {
        dimensions = '8x8x5';
    } else if (difficulty == 'medium') {
        dimensions = '9x15x15';
    } else if (difficulty == 'hard') {
        dimensions = '12x22x60';
    }

    const [width, height, mines] = dimensions.split('x').map(Number);

    const board = Array.from({ length: height }, () =>
        Array.from({ length: width }, (_, x) => ({
            value: 0,
            isMine: false,
        }))
    );

    for (let i = 0; i < mines; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * width);
            y = Math.floor(Math.random() * height);
        } while (board[y][x].isMine);
        board[y][x].isMine = true;
    }

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `repeat(${height}, 1fr)`,
        gap: '2px',
    };

    const handleCellClick = (cell) => {
        if (cell.isMine) {
            alert('You hit a mine!');
        } else {
            alert('You clicked an empty cell.');
        }
    };

    return (
        <div style={gridStyle} className='grid-container'>
            {board.flat().map((cell, index) => (
                <div
                    key={index}
                    className={`cell ${cell.isMine ? 'mine' : 'empty'}`}
                    onClick={() => handleCellClick(cell)}></div>
            ))}
        </div>
    );
}
