// import React, { useState, useEffect, useRef } from "react";
// import { Rye } from "next/font/google";

// const font = Rye({
//   subsets: ["latin"],
//   weight: ["400"],
// });

// const detectLanguage = (text) => {
//   return /[\u0600-\u06FF]/.test(text) ? "ar" : "en";
// };

// const getTypingMessage = (text) => {
//   return detectLanguage(text) === "ar"
//     ? "🤖 جيم يكتب الآن"
//     : "GEM is typing 🤖";
// };

// const ChatMessage = ({ message, isUser }) => (
//   <div className={flex ${isUser ? "justify-end" : "justify-start"} mb-2}>
//     <div
//       className={`px-4 py-2 rounded-[20px] max-w-[80%] text-sm shadow-md animate-[fadeIn_0.4s_ease-in-out] ${font.className} ${
//         isUser
//           ? "bg-gradient-to-br from-[#F5E8C7] to-[#EFD6A6] text-gray-800 rounded-br-[5px]"
//           : "bg-gradient-to-r from-[#CFAE63] to-[#C8A050] text-gray-900 rounded-bl-[5px]"
//       }`}
//     >
//       {message}
//     </div>
//   </div>
// );

// const TypingIndicator = ({ text }) => (
//   <div
//     id="gem-indicator"
//     className={inline-flex items-center gap-2 p-2 bg-[#FFF8E1] rounded-[20px] shadow-sm mb-2 animate-[fadeIn_0.4s_ease-in-out] ${font.className}}
//   >
//     <div className="flex gap-1.5">
//       <span className="w-1.5 h-1.5 bg-[#C69C6D] rounded-full animate-[blink_1.4s_infinite_ease-in-out]"></span>
//       <span className="w-1.5 h-1.5 bg-[#C69C6D] rounded-full animate-[blink_1.4s_0.2s_infinite_ease-in-out]"></span>
//       <span className="w-1.5 h-1.5 bg-[#C69C6D] rounded-full animate-[blink_1.4s_0.4s_infinite_ease-in-out]"></span>
//     </div>
//     <span className="text-sm font-medium text-[#6A4E33]">{text}</span>
//   </div>
// );

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isResponding, setIsResponding] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesRef = useRef(null);
//   const typingIntervalRef = useRef(null);

//   useEffect(() => {
//     if (messagesRef.current) {
//       messagesRef.current.scrollTo({
//         top: messagesRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [messages, isTyping]);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInput(value);
//     e.target.style.direction = /[\u0600-\u06FF]/.test(value) ? "rtl" : "ltr";
//     e.target.scrollLeft = e.target.scrollWidth;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isResponding || !input.trim()) return;

//     const userMessage = input.trim();
//     setMessages([...messages, { text: userMessage, isUser: true }]);
//     setInput("");
//     setIsResponding(true);
//     setIsTyping(true);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/get_response", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           message: userMessage,
//           lang: detectLanguage(userMessage),
//         }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(HTTP error! Status: ${response.status}, Text: ${errorText});
//       }

//       const data = await response.json();

//       if (!data.response) {
//         throw new Error("No response text received from backend");
//       }

//       const source = data.source || "local";
//       const delay =
//         source === "local" ? 4000 : Math.max(1500, userMessage.length * 60);

//       setTimeout(() => {
//         setIsTyping(false);
//         let i = 0;
//         const fullResponse = data.response;
//         const botMessage = { text: "", isUser: false };

//         setMessages((prev) => [...prev, botMessage]);

//         typingIntervalRef.current = setInterval(() => {
//           if (i < fullResponse.length) {
//             setMessages((prev) => {
//               const newMessages = [...prev];
//               newMessages[newMessages.length - 1].text += fullResponse.charAt(i);
//               return newMessages;
//             });
//             i++;
//           } else {
//             clearInterval(typingIntervalRef.current);
//             setIsResponding(false);
//           }
//         }, 40);
//       }, delay);
//     } catch (error) {
//       console.error("❌ Error sending request to backend:", error.message);
//       setMessages([
//         ...messages,
//         { text: ❌ Connection error: ${error.message}, isUser: false },
//       ]);
//       setIsTyping(false);
//       setIsResponding(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-[500px] mx-auto mt-10 border rounded-lg shadow-lg p-4 bg-white">
//       <div className="h-[300px] overflow-y-auto mb-4" ref={messagesRef}>
//         {isTyping && (
//           <TypingIndicator
//             text={getTypingMessage(input || messages[messages.length - 1]?.text || "")}
//           />
//         )}
//         {messages.map((msg, idx) => (
//           <ChatMessage key={idx} message={msg.text} isUser={msg.isUser} />
//         ))}
//       </div>
//       <form onSubmit={handleSubmit} className="flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={handleInputChange}
//           placeholder="اكتب سؤالك..."
//           className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
//           disabled={isResponding}
//         />
//         <button
//           type="submit"
//           disabled={isResponding}
//           className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
//         >
//           إرسال
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;
