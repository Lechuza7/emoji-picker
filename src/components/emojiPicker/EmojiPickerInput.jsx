import { useRef } from "react";
import EmojiPicker from "./EmojiPicker";

export default function EmojiPickerInput() {
  const refInput = useRef(null)

  function handleClick() {
    refInput.current.focus()
  }

  return(
    <div>
      <input ref={refInput} />
      <button onClick={handleClick}>Click para focalizar en input</button>
      <EmojiPicker />
    </div>
  )
}