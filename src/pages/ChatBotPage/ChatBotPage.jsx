import React, { useState, useRef, useEffect } from "react";
import { cars } from "../../Data/CarData";
import carImg from "../../assets/chatbot.jpg";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Card from "../../compnents/CarlistCards/CarCard";
import CarlistBackground from "../../compnents/CarlistBackgroung/CarlistBackground";
import "./chatbot.scss";

// Helper function to get unique values for each field
const getUniqueValues = (data, field) => {
  return [...new Set(data.map(item => item[field]))].filter(Boolean);
};

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const conversationEndRef = useRef(null);

  // Get unique values for each field from the dataset
  const uniqueCarNames = getUniqueValues(cars, "name");
  const uniqueCarColors = getUniqueValues(cars, "color");
  const uniqueFuelTypes = getUniqueValues(cars, "fuel");
  const uniqueInteriorColors = getUniqueValues(cars, "interiorColor");
  const uniquecarTypes = getUniqueValues(cars, "carType");
  const uniquetransmissions=getUniqueValues(cars, "transmission");
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const parseInput = (input) => {
    const lowerInput = input.toLowerCase();

    const extractNumber = (str) => {
      const match = str.match(/\d+/);
      return match ? parseInt(match[0], 10) : null;
    };

    const determineComparator = (input) => {
      if (/under|below|less than/.test(input)) return "under";
      if (/more than|over|above/.test(input)) return "over";
      return "at least";
    };

    const fields = {
      carprice: {
        value: extractNumber(lowerInput.match(/\$?\d+/)?.[0] || ""),
        comparator: determineComparator(lowerInput),
      },
      name: uniqueCarNames.find((name) => lowerInput.includes(name.toLowerCase())),
      fuel: uniqueFuelTypes.find((fuel) => lowerInput.includes(fuel.toLowerCase())),
      color: uniqueCarColors.find((color) => lowerInput.includes(color.toLowerCase())),
      interiorColor: uniqueInteriorColors.find((color) => lowerInput.includes(color.toLowerCase())),
      carType:uniquecarTypes.find((carType) => lowerInput.includes(carType.toLowerCase())),
      transmission:uniquetransmissions.find((transmission) => lowerInput.includes(transmission.toLowerCase())),
    };

    return fields;
  };

  const handleSearch = () => {
    const filters = parseInput(input);

    const results = cars.filter((car) => {
      return Object.keys(filters).every((field) => {
        if (!filters[field]) return true;

        if (field === "carprice") {
          if (filters[field].value === null) return true;

          const comparator = filters[field].comparator;
          const carPriceValue = parseInt(car.price.replace('$', '').replace(',', ''), 10);
          if (comparator === "under") {
            return carPriceValue < filters[field].value;
          } else if (comparator === "over") {
            return carPriceValue > filters[field].value;
          } else {
            return carPriceValue >= filters[field].value;
          }
        } else {
          return car[field] && car[field].toString().toLowerCase() === filters[field].toString().toLowerCase();
        }
      });
    });

    const userMessage = { sender: "user", text: input };
    const botMessage = {
      sender: "bot",
      text: results.length > 0 ? results : "No cars found",
    };

    setConversation([...conversation, userMessage, botMessage]);
    setInput("");
  };

  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [conversation]);

  return (
    <div className="Chatbotcontainer">
      <CarlistBackground background={carImg}/>
      <div className="serchcontainer">
        <h1>
          Find Your <span>Dream Car</span>
        </h1>
        <div className="div">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="about cars..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="message-container">
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`} ref={conversationEndRef}>
            {msg.sender === "bot" && Array.isArray(msg.text) ? (
              msg.text.map((carlist, idx) => (
                <Card key={idx} item={carlist}/>
              ))
            ) : (
              <div> {msg.text}<IoIosArrowBack/></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
