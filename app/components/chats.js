import react from "react";

// Represents the chats - active and not
export default function Chats({ users, onChatChange }) {
  return (
    <div className="flex flex-col gap-6 text-lg">
      {users.map((user, index) => {
        return (
          <div className="flex gap-2 items-center" key={index}>
            <div>
              <img className="w-14" src={`/images/pp${index+1}.png`}/>
            </div>
            <div>
              <div>{user.name}</div>
              <button className="w-full text-xs py-1 px-2 bg-gray-200 rounded-md" 
                onClick={() => onChatChange(index)}>{user.active? "Resume Chat" : "Start Chat"}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
