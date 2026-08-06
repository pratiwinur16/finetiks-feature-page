import Image from "next/image";

const AVATARS = [
  "/images/avatar-social-1.png",
  "/images/avatar-social-2.png",
  "/images/avatar-social-3.png",
];

export default function AvatarStack() {
  return (
    <div className="flex shrink-0 items-center">
      {AVATARS.map((src, i) => (
        <div
          key={src}
          className={`relative size-8 shrink-0 rounded-full ${i > 0 ? "-ml-2" : ""}`}
        >
          <Image src={src} alt="" fill sizes="32px" className="rounded-full object-cover" />
        </div>
      ))}
    </div>
  );
}
