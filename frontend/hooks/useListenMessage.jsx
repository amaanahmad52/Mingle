// hooks/useListenMessages.js
import { useEffect } from "react";
import notificationSound from "../public/sound/messageIncomingSound.mp3";
import { useDispatch, useSelector } from "react-redux";

import { useSocketContext } from "../src/Context/SocketContext";
import { addMessage } from "../src/slices/MessagesSlice";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const dispatch = useDispatch();
	const {messages} = useSelector((state) => state.messagesReducer);

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;

			// play sound
			const sound = new Audio(notificationSound);
			sound.play();

			dispatch(addMessage(newMessage));
		});

		return () => socket?.off("newMessage");
	}, [socket, dispatch,messages]);
};

export default useListenMessages;
