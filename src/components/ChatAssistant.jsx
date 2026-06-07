import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: 'Hello! I am Aditi Littils AI assistant. How can I help you choose the best track for your child today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const answers = {
    admissions: "Admissions for the 2026-27 academic session are currently open! You can submit an enquiry form today, and our counselors will schedule a tour and interactive screening slot for your child.",
    timings: "Our session timings are:\n• Play Group: 8:30 AM – 11:30 AM\n• Nursery & Kindergarten: 8:30 AM – 12:30 PM\n• Primary School (I-VII): 8:15 AM – 3:15 PM",
    campuses: "We run two modern campuses in Hyderabad:\n• Block A (Main BHEL Township): Primary & Pre-School classes.\n• Block B (Ashok Nagar): Dedicated early childhood play campus.",
    fees: "Fee structures vary by class tier. We offer competitive term structures that cover interactive educational toolkits, sensory kits, and computer lab access. Please fill out the inquiry form to receive the detailed brochure."
  };

  const handleOptionClick = (key) => {
    const userLabels = {
      admissions: "Admission dates & processes?",
      timings: "What are school timings?",
      campuses: "Where are your campuses?",
      fees: "Fee details?"
    };

    setMessages(prev => [...prev, { sender: 'user', text: userLabels[key] }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: answers[key] }]);
    }, 800);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "Thank you for reaching out! To get customized details on that query, please submit our Quick Inquiry Form, and our admissions desk will call you directly.";
      
      const lower = userText.toLowerCase();
      if (lower.includes('admission') || lower.includes('open') || lower.includes('enroll')) {
        reply = answers.admissions;
      } else if (lower.includes('timing') || lower.includes('hours') || lower.includes('time')) {
        reply = answers.timings;
      } else if (lower.includes('campus') || lower.includes('location') || lower.includes('address')) {
        reply = answers.campuses;
      } else if (lower.includes('fee') || lower.includes('cost') || lower.includes('pay')) {
        reply = answers.fees;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 1000);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div className="chat-assistant-container">
      {/* Floating Toggle Button */}
      <button 
        className={`chat-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="chat-window shadow-floating">
          <div className="chat-header">
            <div className="chat-header-avatar">⭐</div>
            <div className="chat-header-info">
              <h4>Aditi AI Assistant</h4>
              <span>Online • Response Instant</span>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message-bubble ${msg.sender}`}>
                <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message-bubble bot typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-quick-replies">
            <button onClick={() => handleOptionClick('admissions')}>Admission Info</button>
            <button onClick={() => handleOptionClick('timings')}>Timings</button>
            <button onClick={() => handleOptionClick('campuses')}>Locations</button>
            <button onClick={() => handleOptionClick('fees')}>Fee Details</button>
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="chat-send-btn" aria-label="Send query">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
