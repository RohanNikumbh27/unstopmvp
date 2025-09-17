import Image from "next/image";

export default function HeroImage() {
  return (
    <Image
      src="/heroImage.svg"
      width={500}
      height={500}
      alt="Picture of the author"
    />
  );
}
