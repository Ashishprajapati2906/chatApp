import React, { useContext, useEffect, useState } from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { toast } from 'react-toastify'

const ChatBox = () => {
    const { userData, messagesId, chatUser, messages, setMessages } = useContext(AppContext)

    const [input, setInput] = useState("")

    const sendMessage = async () => {
        try {
            if (input && messagesId) {
                await updateDoc(doc(db, 'messages', messagesId), {
                    messages: arrayUnion({
                        sId: userData.id,
                        text: input,
                        createdAt: new Date()
                    })
                })

                const userIDs = [chatUser.rId, userData.id]

                userIDs.forEach(async (id) => {
                    const userChatsRefs = doc(db, 'chats', id)
                    const userChatsSnapshot = await getDoc(userChatsRefs)
                    // console.log("userChatsSnapshot userChatsSnapshot userChatsSnapshot", userChatsSnapshot);


                    if (userChatsSnapshot.exists()) {
                        const userChatData = userChatsSnapshot.data()

                        const chatIndex = userChatData.chatsData.findIndex((c) => c.messagesId === messagesId)

                        userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30)
                        userChatData.chatsData[chatIndex].updatedAt = Date.now()
                        if (userChatData.chatsData[chatIndex].rId === userData.id) {
                            userChatData.chatsData[chatIndex].messageSeen = false
                        }
                        await updateDoc(userChatsRefs, {
                            chatsData: userChatData.chatsData
                        })
                    }
                })
            }
        } catch (error) {
            toast.error(error.message)
            console.error(error);
        }
        setInput("")
    }

    const convertTimesTemp = (timestamp) => {
        let date = timestamp.toDate();
        const hour = date.getHours()
        const minutes = date.getMinutes()
        const ampm = hour >= 12 ? 'PM' : 'AM'
        const formattedTime = `${hour % 12 || 12}:${minutes.toString().padStart(
            2, '0')} ${ampm}`
        return formattedTime

    }

    useEffect(() => {
        if (messagesId) {
            const unSub = onSnapshot(doc(db, 'messages', messagesId), (res) => {
                setMessages(res.data().messages.reverse())
                // console.log("res.data().messages.reverse()", res.data().messages.reverse());               
            })
            return () => {
                unSub()
            }
        }
    }, [messagesId])


    return chatUser ? (
        <div className="chat-box">
            <div className="chat-user">
                <img src={chatUser.userData.avatar !== "" ? assets.profile_img : chatUser.userData.avatar} alt="no image" />
                <p>{chatUser.userData.name} {Date.now() - chatUser.userData.lastSeen <= 70000 ? <img className='dot' src={assets.green_dot} alt="" /> : null}</p>
                <img src={assets.help_icon} className='help' alt="" />
            </div>

            <div className="chat-msg">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sId === userData.id ? "s-msg" : "r-msg"}>
                        <p className="msg">{msg.text}</p>
                        <div>
                            {/* <img src={assets.profile_img} alt="" /> */}
                            <img src={msg.sId === userData.id ? assets.profile_img : assets.pic2} alt="" />
                            <p>{convertTimesTemp(msg.createdAt)}</p>
                        </div>
                    </div>
                ))}


            </div>



            <div className="chat-input">
                <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Send a message' />
                <input type="file" name="" id="image" accept='image/png,image/jpeg' hidden />
                <label htmlFor="image">
                    <img src={assets.gallery_icon} alt="" />
                </label>
                <img onClick={sendMessage} src={assets.send_button} alt="" />
            </div>
        </div>
    )
        : <div className="chat-welcome">
            <img src={assets.logo_icon} alt="" />
            <p>Chat anytime, anywhere</p>
        </div>
}

export default ChatBox