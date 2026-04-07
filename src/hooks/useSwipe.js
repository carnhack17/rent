import { useState } from "react";

export default function useSwipe(initialCards) {
  const [cards, setCards] = useState(initialCards);
  const [history, setHistory] = useState([]);

  const swipe = (direction) => {
    if (cards.length === 0) return;

    const current = cards[0];

    if (direction === "down") {
      if (history.length === 0) return;

      const last = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCards((prev) => [last, ...prev]);
      return;
    }

    // autres directions
    setHistory((prev) => [...prev, current]);
    setCards((prev) => prev.slice(1));
  };

  return { cards, swipe };
}