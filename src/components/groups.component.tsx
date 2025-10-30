import type { RefObject, SetStateAction } from "react";

import type { GroupType } from "@/api/paths";
import type { GroupDataType } from "./paths";

import { GroupData } from "./paths";
import { GROUPS, Russian } from "@/api/paths";

import Image from "next/image";
import Link from "next/link";

export type GroupProps = {
  data: GroupDataType;
  className: string;
  imageClassName: string;
  linkClassName: string;
};

export const GroupComponent = ({
  data,
  className,
  imageClassName,
  linkClassName,
}: GroupProps) => {
  return (
    <div className={className}>
      <Image
        src={data.info.covers[Russian[data.name]]}
        width={200}
        height={100}
        className={imageClassName}
        alt="cover"
      />
      <Link href={data.link} className={linkClassName}>
        <h3>{data.info[Russian[data.name]]}</h3>
        <hr />
        <span>{data.info.descriptions[Russian[data.name]]}</span>
      </Link>
    </div>
  );
};

export type GroupsProps = {
  group: GroupType;
} & Omit<GroupProps, "data">;

export const GroupsComponent = (props: GroupsProps) => {
  return GroupData({ group: props.group }).map((data, index) => (
    <GroupComponent key={index} data={data} {...props} />
  ));
};

export type ChooseGroupProps = {
  group: GroupType;
  ref: RefObject<HTMLDivElement | null>;
  set: (value: SetStateAction<GroupType>) => void;
};

const onGroupClick = (props: ChooseGroupProps) => {
  if (!props.ref.current) return;

  props.ref.current.style.display =
    props.ref.current.style.display === "flex" ? "none" : "flex";

  props.set(props.group);
};

export const ChooseGroupComponent = (props: ChooseGroupProps) => {
  return GROUPS.map((group, index) => {
    if (group === props.group) {
      return null;
    }

    return (
      <button
        key={index}
        onClick={() =>
          onGroupClick({
            ...props,
            group,
          })
        }
      >
        {Russian[group]}
      </button>
    );
  });
};
