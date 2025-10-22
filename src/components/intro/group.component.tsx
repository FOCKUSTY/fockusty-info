import type { GroupType } from "@/api/paths";

import { Russian } from "@/api/paths";
import { Group } from "@/components/paths";

type Props = {
  group: GroupType;
};

export const GroupComponent = ({ group }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span>Я, как {Russian[group].toLowerCase()}:</span>
      <Group group={group} />
    </div>
  );
};
