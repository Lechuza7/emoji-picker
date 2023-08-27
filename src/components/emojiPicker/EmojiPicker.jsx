import { forwardRef, useEffect, useRef, useState } from "react";
import { data as emojiList } from "./data";
import EmojiSearch from "./EmojiSearch";
import EmojiButton from "./EmojiButton";

export function EmojiPicker(props, inputRef) {
  const [isOpen, setIsOpen] = useState(false);
  const [emojis, setEmojis] = useState(emojiList);

  const containerRef = useRef(null);

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (!containerRef.current.contains(e.target)) {
        setIsOpen(false)
        setEmojis(emojiList)
      }
    })
  }, [])

  function handleClickOpen() {
    setIsOpen(!isOpen);
  }

  function handleSearch(e) {
    const query = e.target.value.toLowerCase();

    if (query) {
      const search = emojiList.filter((emoji) => {
        return (
          emoji.name.toLowerCase().includes(query) ||
          emoji.keywords.toLowerCase().includes(query)
        );
      });

      setEmojis(search);
    } else {
      setEmojis(emojiList);
    }
  }

  function handleOnClickEmoji(emoji) {
    const cursorPosition = inputRef.current.selectionStart;
    const text = inputRef.current.value;
    const prev = text.slice(0, cursorPosition);
    const next = text.slice(cursorPosition);

    inputRef.current.value = prev + emoji.symbol + next;
    inputRef.current.selectionStart = cursorPosition + emoji.symbol.length;
    inputRef.current.selectionEnd = cursorPosition + emoji.symbol.length;
    inputRef.current.focus();
  }

  return (
    <div ref={containerRef}>
      <button onClick={handleClickOpen}>😊</button>

      {isOpen ? (
        <div>
          <EmojiSearch onSearch={handleSearch} />
          <div>
            {emojis.map((emoji) => (
              <EmojiButton
                key={emoji.symbol}
                emoji={emoji}
                onClick={handleOnClickEmoji}
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default forwardRef(EmojiPicker);
