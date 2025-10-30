import type { GroupType, InfoType } from "@/api/paths";

import { getPathWithoutGroupPrefix, GROUPS_INFO, INFO } from "@/api/paths";

import Link from "next/link";

export const InfoLink = ({ group, info }: { group: GroupType; info: InfoType }) => {
  const [link, name] = getPathWithoutGroupPrefix(group, info);
  return (
    <Link key={link + name} href={link}>
      {name}
    </Link>
  );
};

export const Group = ({ group }: { group: GroupType }) => {
  return INFO.map((info) => <InfoLink key={group + info} group={group} info={info} />);
};

export const GroupData = ({ group }: { group: GroupType }) => {
  return INFO.map((info) => {
    const [link, name] = getPathWithoutGroupPrefix(group, info);

    return {
      link,
      name,
      info: GROUPS_INFO[group],
    } as const;
  });
};

export type GroupDataType = (typeof GroupData extends (...data: any[]) => infer U
  ? U
  : never)[number];
