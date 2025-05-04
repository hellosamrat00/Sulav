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
    const bookingKeywords = ['book', 'appointment', 'schedule', 'time slot'];
    const isBookingRelated = bookingKeywords.some(keyword => 
      input.toLowerCase().includes(keyword)
    );

    try {
      const token = localStorage.getItem('access_token');
      if (isBookingRelated && !token) {
        setMessages(prev => [
          ...prev,
          { from: 'bot', text: 'You need to log in to book an appointment. We need your perosnal information to confirm the booking.' }
        ]);
        setInput('');
        return;
      }

      const response = await fetch('http://localhost:8000/api/ask/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ question: input }),
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please log in again.');
        }
        const errorData = await response.json();
        throw new Error(errorData.response || 'Failed to process your request. Please try again.');
      }

      const data = await response.json();
      const botMessage = { from: 'bot', text: data.response || 'No response from server' };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: `Sorry, something went wrong: ${err.message}` }
      ]);
    }

    setInput('');
  };

  return (
    <div className="chatbot-container">
      <button onClick={() => setIsOpen(!isOpen)} className="chatbot-toggle">
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
            <button onClick={sendMessage} className="chatbot-send">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}