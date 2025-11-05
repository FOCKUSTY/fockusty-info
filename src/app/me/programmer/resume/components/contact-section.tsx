"use client";

import React from "react";
import { Link as MyLink } from "@/components/link";
import type { ContactItem } from "../constants";
import styles from "../styles.module.css";

export const ContactSection = ({ items }: { items: ContactItem[] }) => {
  return (
    <div className={styles.contact_list}>
      {items.map((contactItem: ContactItem) => (
        <span key={contactItem.name} className={styles.contact_item}>
          <strong>{contactItem.name}:</strong>{" "}
          {contactItem.href ? (
            <MyLink href={contactItem.href} name={contactItem.label ?? contactItem.href} />
          ) : (
            <span>{contactItem.text}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default ContactSection;
