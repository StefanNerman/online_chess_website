import React from 'react'
import './style_chess.css'
import { useEffect } from 'react'
import { tileClick, tiles, whoseTurn, autoMove, setWhoseTurn } from './gamelogic'
import {coordinateConverter} from '../../../utils/chessgame'
import { userMove, sendPfp, userCheckmate } from '../GamePage'

interface TileObj {
    position: number,
    piece: string | any,
    color: string
}

interface actionMoveInfoObj {
    action: string,
    move: string | null
}

interface actionInfoObj {
    action: string,
    info: string | null | actionMoveInfoObj | object
}
//If you are playing both colors on the same device set this to true it will change the player color every time a move is made
export let isLocalGame = false
export function setIsLocalGame(bool: boolean) {isLocalGame = bool}

export let playerColor = 'white'
export function setPlayerColor(color: string) {playerColor = color}

let isMultiplayer = false

export function artificialMove(from: number, to: number){
    let clickResult: actionInfoObj = autoMove(from, to)
    clickResult.action === 'move' && handlePlayerMove(clickResult.info)
    renderPieces(tiles.getPositions())
}

let moveNotYetMade = true
export let matchTime = 0

function startTimerInterval(){
    return window.setInterval(updateTimer, 1000)
}
export let timeInterval: any

//OUTCOME STRING: [move piece] + [move '>', eat '<', castle: ':'] + [eaten piece (move piece if no piece was there)] + [result ('' for nothing, '*' for check, 'x' for checkmate)] + [move positions (from, to)]
//Ex. eat: '021<1053455', check: '021>021*4263', check after eating a piece: '030<103*8347', normal move: '021>0211736', castling: '050:0118481', checkmate '010>010x3353'

//Called every time a move is made, receives an outcome string as a param
async function handleMove(move: string){
    console.log('MOVE:', move)
    if(!isLocalGame){
        let moveStatus = await handleMoveApi(move)
        if(!moveStatus){/*make an alert and return*/}
    }
    if(moveNotYetMade) onMachStart()

    console.log('alöksdjfölkajsdf', isMultiplayer)
    if(isMultiplayer) userMove(move)

    let coordinatesString = move.slice(move.length -4, move.length)
    let from = coordinateConverter(parseInt(coordinatesString.slice(0, 2)))
    let to = coordinateConverter(parseInt(coordinatesString.slice(2, 4)))
    let moveString = from + ' -> ' + to
    const moveDisplayTab = whoseTurn === 'black' ? document.getElementById('gamepanel-movetab-left')! : document.getElementById('gamepanel-movetab-right')!
    moveDisplayTab.innerText = moveString

    if(move.includes('*')) handleKingAttack(move)
    if(move.includes('x')) handleCheckmate(move)
    if(move.includes('<')) handleAttack(move)
    if(move.includes(':')) handleCastling(move)
    renderPieces(tiles.getPositions())
}
async function handleMoveApi(move: string): Promise<boolean>{
    return new Promise((resolve, reject) => {
        /*api call*/
        resolve(true)
    })
}
function onMachStart(){
    moveNotYetMade = false
    timeInterval = startTimerInterval()
}
function updateTimer(){
    matchTime += 1
    const timerTab = document.getElementById('gamepanel-timetab')!
    let minutes = Math.floor(matchTime / 60).toString()
    let seconds = (matchTime % 60).toString()
    if(minutes.length === 1) minutes = '0' + minutes
    if(seconds.length === 1) seconds = '0' + seconds
    timerTab.innerText = `${minutes}:${seconds}`
}

//Called every time the king gets attacked, receives an outcome string as a param
function handleKingAttack(move: string){
    console.log('CHECK:', move)
}
//Called every time there is a checkmate, receives an outcome string as a param
function handleCheckmate(move: string){
    console.log('CHECKMATE:', move)
    window.clearInterval(timeInterval)
    if(isMultiplayer) userCheckmate(move)
}
//Called every time a piece is eaten, receives an outcome string as a param
function handleAttack(move: string){    
    console.log('PIECE EATEN:', move)
}
//Called every time a king castles, receives an outcome string as a param
function handleCastling(move: string){
    console.log('KING HAS CASTLED:', move)
}

//Called every time you click on an empty tile
function handleEmptyTileClick(tilePosition: number){
    console.log('EMPTY CLICK:', tilePosition)
}
//Called every time you click on your opponents tile
function handleWrongTileClick(tilePosition: number){
    console.log('WRONG PIECE:', tilePosition)
    console.log(whoseTurn, playerColor)
}
//Called every time you click on your opponents turn
function handleNotYourTurnClick(tilePosition: number){
    console.log('WRONG TURN CLICK:', tilePosition)
    console.log(whoseTurn, playerColor)
    alert('Wait for your turn.')
}
//Called every time you select or move your piece, receives result of your click (move, check, select, unselect)
function onPlayerMove(clickResult: actionInfoObj){
    console.log('ANY MOVE:', clickResult)
}



interface props {
    gamemode: string
    color: string
}

const Chess: React.FC<any> = ({gamemode, color}: props) => {

    console.log('COMPONENT RE-RENDER ',  color)

    useEffect(() => {
        console.log('useEffect running')

        if(gamemode === 'quickplay') isMultiplayer = true
        setIsLocalGame(gamemode === 'local'? true : false)
        playerColor = color
        createBoard()
        renderPieces(tiles.getPositions())
        if(color === 'black') rotateBoard()
        sendPfp(sessionStorage.getItem('pfp')!)
    }, [])

    function rotateBoard() {
        const boardTiles = document.getElementsByClassName('board-tile')
        const board = document.getElementById('chessboard');
        (board as any).style.transform = 'rotate(0deg)'
        for(let i = 0; i < boardTiles.length;){
            (boardTiles[i] as any).style.transform = 'rotate(0deg)'
            i++
        }
    }

    function createBoard(){
        const board = document.getElementById('chessboard')
        if((board as any).children.length > 55) return
        let isWhite = false
        for(let i = 0;i < 8;){
            i++
            isWhite ? isWhite = false : isWhite = true
            for(let j = 0;j < 8;){
                j++
                isWhite ? isWhite = false : isWhite = true
                let tile = formatTileObj(i, j, isWhite)
                board?.appendChild(tile.div)
            }
        }
    }

    function formatTileObj(i: number, j: number, clr: boolean){
        let tile = {
            div: document.createElement('div'),
            number: i,
            letter: j,
            color: clr ? 'white' : 'black',
        }
        tile.div.addEventListener('click', () => tileOnClick(i, j))
        tile.div.classList.add(`board-tile`)
        tile.div.classList.add(clr ? 'bt-white' : 'bt-black')
        tile.div.id = `tile-${i}${j}`
        return tile
    }

    return (  
    <div className="chess-root">
        <div id='chessboard'>

        </div>
    </div>
    );
}
export default Chess;



let isPieceSelected = false

function renderPieces(positions: Array<TileObj>){
    positions.forEach((e, i) => {
        const tile = document.getElementById(`tile-${e.position.toString()}`)
        let index = 0
        while(tile?.hasChildNodes()) {
            tile.removeChild(tile.children[index])
            index++
        }
        if(e.piece){
            let img = document.createElement('div')
            img.classList.add('piece-image-div')
            img.classList.add('piece-' + e.piece.slice(0, 2))
            tile?.appendChild(img)
        }
    })
}


function tileOnClick(number: number, letter: number){
    let canTileMove = canMove(number, letter)
    if(canTileMove === 'empty') return handleEmptyTileClick(parseInt(`${number}${letter}`))
    if(canTileMove === 'not your piece') return handleWrongTileClick(parseInt(`${number}${letter}`))
    if(canTileMove === 'not your turn') return handleNotYourTurnClick(parseInt(`${number}${letter}`))
    let clickResult: actionInfoObj  = tileClick(number, letter)
    onPlayerMove(clickResult)
    clickResult.action === 'illegal' && handleIllegalMove(clickResult.info)
    clickResult.action === 'move' && handlePlayerMove(clickResult.info)
    clickResult.action === 'select' && handlePlayerSelect(clickResult.info)
}

function canMove(number: number, letter: number): boolean | string{
    if(isPieceSelected) return true
    let pieceClr = tiles.getTileInfo(parseInt(`${number}${letter}`))?.piece
    if(!pieceClr) return 'empty'
    pieceClr = pieceClr.slice(0, 1)
    if(playerColor === 'white' && pieceClr === '0') return 'not your piece'
    if(playerColor === 'black' && pieceClr === '1') return 'not your piece'
    if(playerColor !== whoseTurn) return 'not your turn'
    return true
}

//this function runs every time you try to make an illegal move
function handleIllegalMove(issue: string | actionMoveInfoObj | null | object){
    
}

function handlePlayerMove(move: string | actionMoveInfoObj | null | object){
    isPieceSelected = false
    if((move as any).moveAction === 'unselect') {
        if(whoseTurn === 'white') setWhoseTurn('black')
        else setWhoseTurn('white') 
    }
    handleMove((move as any).move)
}

function handlePlayerSelect(selected: string | object | null | actionMoveInfoObj){
    isPieceSelected = true
}
