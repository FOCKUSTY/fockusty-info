import type { ContactItem } from "types/resume.types";
import { Link } from "@/components/link";

type Props = {
  items: ContactItem[];
};

export const Contacts = ({ items }: Props) => {
  return (
    <>
      {items.map((item, index) => (
        <span key={index}>
          {item.name}: <Link href={item.href} name={item.label} />
        </span>
      ))}
    </>
  );
};
