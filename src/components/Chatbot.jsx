import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Welcome to our Barbershop! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('http://localhost:8000/api/ask/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      });

      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      const botMessage = { from: 'bot', text: data.response || 'No response from server' };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages(prev => [...prev, { from: 'bot', text: 'Sorry, something went wrong. Please try again.' }]);
    }

    setInput('');
  };

  return (
    <div className="chatbot-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-toggle"
      >
        {isOpen ? '✕' : '💬'}
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbot-message ${msg.from === 'bot' ? 'bot-message' : 'user-message'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              className="chatbot-input-field"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="chatbot-send"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}