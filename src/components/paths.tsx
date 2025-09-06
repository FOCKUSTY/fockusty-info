import { getPathWithoutGroupPrefix, GROUPS, INFO } from "@/api/paths";
import Link from "next/link";

export const InfoLink = ({
  group,
  info
}: {
  group: (typeof GROUPS)[number],
  info: (typeof INFO)[number]
}) => {
  const [ link, name ] = getPathWithoutGroupPrefix(group, info)
  return <Link key={link + name} href={link}>{name}</Link>
}

export const Group = ({
  group
}: {
  group: (typeof GROUPS)[number]
}) => {
  return INFO.map(info => <InfoLink key={group + info} group={group} info={info} />);
}

export const GroupData = ({
  group
}: {
  group: (typeof GROUPS)[number]
}) => {
  return INFO.map(info => {
    const [ link, name ] = getPathWithoutGroupPrefix(group, info);

    return { link, name } as const;
  });
}