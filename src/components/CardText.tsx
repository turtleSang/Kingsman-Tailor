import Link from "next/link";

export default function CardText({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) {
  return (
    <Link
      className="bg-secondary rounded-xl p-3 hover:bg-secondary-hover  hover:scale-105 duration-200 hover:shadow-md hover:shadow-primary"
      href={link}
    >
      {children}
    </Link>
  );
}
