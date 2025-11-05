"use client";

import React from "react";
import { Link as MyLink } from "@/components/link";
import type { ContactItem } from "../constants";
import styles from "../styles.module.css";

export const ContactSection = ({ items }: { items: ContactItem[] }) => {
  return (
    <div className={styles.contact_list}>
      {items.map((it) => (
        <span key={it.name} className={styles.contact_item}>
          <strong>{it.name}:</strong>{" "}
          {it.href ? (
            <MyLink href={it.href} name={it.label ?? it.href} />
          ) : (
            <span>{it.text}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default ContactSection;
