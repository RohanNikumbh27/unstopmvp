"use client";
import Image from "next/image";

export default function Button2({
  title = "Click here",
  imgsrc,
  onClick = () => console.log("Button clicked"),
}) {
  return (
    <button className="btn-secondary" onClick={onClick}>
      {imgsrc && <Image src={imgsrc} width={32} height={32} alt={imgsrc}></Image>}
      <span className="secondary-btn-title">{title}</span>
    </button>
  );
}
