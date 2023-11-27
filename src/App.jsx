import { useState } from 'react'
import './App.css'

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

//Friends List
function FriendsList({ friends }) {

  return <ul>
    {friends.map(
      friend => (
        <Friend friend={friend} key={friend.id} />
      )
    )}

  </ul>
}



//Add Friends
function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("https://i.pravatar.cc/48")

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return

    const id = crypto.randomUUID()
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    }

    onAddFriend(newFriend)

    setName('')
    setImage("https://i.pravatar.cc/48")
  }

  return <form className='form-add-friend' onSubmit={handleSubmit}>
    <label htmlFor="">👭 Friend Name</label>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

    <label htmlFor="">📸 Image Url</label>
    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

    <Button className='btn'>Add</Button>

  </form>
}

//Single Friend Object
function Friend({ friend }) {
  return <li>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    {
      friend.balance < 0 && <p className='red'>You owe {friend.name} ${Math.abs(friend.balance)}</p>
    }
    {
      friend.balance > 0 && <p className='green'>{friend.name} owes you ${Math.abs(friend.balance)}</p>
    } {
      friend.balance === 0 && <p >You and {friend.name} are even</p>
    }

    <Button>Select</Button>
  </li>
}

//Splitting form
function FormSplitBill() {
  return <form className='form-split-bill'>
    <h2>Spilt a bill with X</h2>
    <label htmlFor="">💲 Bill Value</label>
    <input type="text" />

    <label htmlFor="">👨 Your expense</label>
    <input type="text" />

    <label htmlFor="" >👭 X's expense</label>
    <input type="text" disabled />

    <label htmlFor="" >🤑 Who is paying the bill ?</label>
    <select name="" id="">
      <option value="user">You</option>
      <option value="friend">X</option>
    </select>
    <Button>Split Bill</Button>


  </form>
}

function Button({ children, onClick }) {
  return <button onClick={onClick} className='button'>{children}</button>
}


function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [showAddFriend, setShowAddFriend] = useState(false)

  function handleShowAddFriend() {
    setShowAddFriend(show => !show)
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false)
  }
  return (
    <div className='app'>
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add Friend"}</Button>
      </div>
      <FormSplitBill />
    </div>
  )
}

export default App
