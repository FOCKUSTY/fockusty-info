import { Link } from "@/components/link";
import type { ContactItem } from "../constants";

type Props = {
  items: ContactItem[];
}

export const Contacts = ({ items }: Props) => {
  return (
    <>
      {items.map((item, index) => (
        <span key={index}>
          {item.name}: <Link href={item.href} name={item.label}/>
        </span>
      ))}
    </>
  );
};