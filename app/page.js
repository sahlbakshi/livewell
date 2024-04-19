"use client"

import { useState } from "react";
import Chats from "./components/chats";
import Thread from "./components/thread";

export default function Home() {
  const roles = {
    PATIENT: "PATIENT",
    DOCTOR: "DOCTOR"
  }

  const users = [
    {role: roles.PATIENT, active: true, name: "Patient Mila"}, 
    {role: roles.DOCTOR, active: true, name: "Doctor Sam"},
    {role: roles.PATIENT, active: false, name: "Patient Mack"}, 
    {role: roles.DOCTOR, active: false, name: "Doctor Sarah"}
  ]

  const [threads, setThreads] = useState([
    [{sender: 1, message: "Hi Doctor"}, {sender: 0, message: "Hi there!"}],
    [{sender: 0, message: "Hi Doctor"}, {sender: 0, message: "We have an appointment"}, {sender: 1, message: "Lets get started then"}],
    [],
    []
  ])

  const [role, setRole] = useState(roles.PATIENT)
  const [currThreadIndex, setCurrThreadIndex] = useState(0);
  const [message, setMessage] = useState('')

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }

  const handleSendMessage = () => {
    let sender = 0
    if ((role == roles.PATIENT && users[currThreadIndex].role == roles.PATIENT) || 
        (role == roles.DOCTOR && users[currThreadIndex].role == roles.DOCTOR)) {
      sender = 1
    }
    const updatedThread = [...threads[currThreadIndex], { sender: sender, message: message }]
    const updatedThreads = threads.map((thread, index) => index === currThreadIndex ? updatedThread : thread)
    setThreads(updatedThreads)
    setMessage("")
  }

  const handleChatChange = (index) => {
    setCurrThreadIndex(index)
  }

  return (
    <div className="m-8">
      <div className="text-4xl font-medium">LIVEWELL Chat</div>

      <div className="flex">
        <div className="flex-none px-1 py-6">
          <div className="flex flex-col text-xl gap-4">
            <button className={`px-4 py-1 ${role == roles.PATIENT ? 'bg-gray-900 text-white': 'bg-gray-200'} rounded-md`} onClick={() => setRole(roles.PATIENT)}>Patient</button>
            <button className={`px-4 py-1 ${role == roles.DOCTOR ? 'bg-gray-900 text-white': 'bg-gray-200'} bg-gray-200 rounded-md`} onClick={() => setRole(roles.DOCTOR)}>Doctor</button>
          </div>
        </div>

        <div className="flex-none p-6">
          <Chats 
            users={users} 
            role={role} 
            onChatChange={(index) => handleChatChange(index)}>
          </Chats>
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <Thread 
            user={users[currThreadIndex]} 
            index={currThreadIndex} 
            threads={threads[currThreadIndex]}>
          </Thread>
          <div className="flex items-center">
            <input className="w-full py-1 px-2 border-2 rounded-md"
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="Please type a message"
              onKeyDown={(event) => event.key == "Enter" ? handleSendMessage() : null}
            />
            <button onClick={() => handleSendMessage()}>
              <img className="w-12" src="/images/send_right.png"></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
