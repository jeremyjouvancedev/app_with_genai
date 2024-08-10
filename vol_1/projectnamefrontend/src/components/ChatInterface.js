import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css'; // Assurez-vous de créer ce fichier CSS pour styliser votre chat

function ChatInterface() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const endOfMessagesRef = useRef(null);

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedInput = userInput.trim();
        if (!trimmedInput) return;

        // Ajoutez la question de l'utilisateur aux messages
        const newMessage = { text: trimmedInput, sender: 'user' };
        setMessages([...messages, newMessage]);

        // Appelez l'API ici et ajoutez la réponse aux messages
        try {
            const response = await fetch('http://localhost:8000/chat/chat/', { // Remplacez par l'URL correcte de votre API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_input: trimmedInput }),
            });
            const data = await response.json();
            if (data.response) {
                const responseMessage = { text: data.response, sender: 'bot' };
                setMessages(messages => [...messages, responseMessage]);
            } else {
                // Gérer le cas où aucune réponse n'est retournée
                const errorMessage = { text: "Désolé, je ne peux pas répondre pour le moment.", sender: 'bot' };
                setMessages(messages => [...messages, errorMessage]);
            }
        } catch (error) {
            console.error('Erreur lors de la communication avec l\'API:', error);
            // Gérer l'erreur, par exemple en affichant un message d'erreur
        }


        setUserInput(''); // Réinitialisez l'entrée après l'envoi
    };

    return (
        <div className="chat-interface">
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        <div className="message-content">{message.text}</div>
                    </div>
                ))}
                <div ref={endOfMessagesRef} />
            </div>
            <form className="message-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Écrire un message..."
                    autoFocus
                />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default ChatInterface;
