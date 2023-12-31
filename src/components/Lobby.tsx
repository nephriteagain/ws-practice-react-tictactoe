
import { Dispatch } from 'react'

import { deleteLobby, joinLobby, leaveLobby } from "../utils/helper"

import { clientId, lobbyId, action, actions } from "../types/types"

interface LobbyProps {
  host: string
  guest: string
  clientId: clientId
  joinedLobbyId: lobbyId
  dispatch: Dispatch<action>
}

export default function Lobby({
  host, 
  guest, 
  clientId,
  joinedLobbyId,
  dispatch  
} : LobbyProps) {

  function handleLeaveLobby() {
    dispatch({type: actions.leaveLobby, payload: {}}) 
  }

  function handleJoinLobby(lobbyId: string) {
    dispatch({type: actions.joinLobby, payload: {
      joinedLobbyId: lobbyId
    }})
  }
  
  return (
  <div className='flex flex-row max-w-[400px] min-w-[300px] text-[0.8rem] my-2 rounded-md hover:scale-110 transition-all duration-200 z-[2]'
  >
    <div className='basis-1/3 bg-gray-300 text-center px-1 py-1'>
      {host}
    </div>
    <div className='basis-1/3 bg-stone-300 text-center px-1 py-1'>
      {guest}
    </div>
    <div className='basis-1/3 bg-slate-300 text-center px-1 py-1'>
      { guest.length === 0 && host !== clientId &&
      <button className='bg-green-300 px-2 py-[0.1rem] text-sm rounded-md shadow-md drop-shadow-md hover:scale-x-105 active:scale-90 hover:bg-green-400 transition-all duration-200'
        onClick={() => joinLobby(host, clientId, handleJoinLobby, joinedLobbyId, handleLeaveLobby)}
      >
        join
      </button>}
      { host === clientId &&
      <button className='bg-red-300 px-2 py-[0.1rem] text-sm rounded-md shadow-md drop-shadow-md hover:scale-x-105 active:scale-90 hover:bg-red-400 transition-all duration-200'
        onClick={() => deleteLobby(clientId)}
      >
        delete
      </button>}
      { guest === clientId  &&
      <button className='bg-orange-300 px-2 py-[0.1rem] text-sm rounded-md shadow-md drop-shadow-md hover:scale-x-105 active:scale-90 hover:bg-orange-400 transition-all duration-200'
        onClick={() => leaveLobby(host, clientId, handleLeaveLobby)}
      >
        leave
      </button>}
    </div>
  </div>
  )
}
