import React from "react";
import Person from "../../models/Person";
import styles from "./PersonGridItem.module.scss"

interface PersonGridItemProps {
    person: Person;
}

function PersonGridItem({ person }: PersonGridItemProps) {
  return (
    <>
      <div className={`${styles["person-grid"]}`}>
        <p className={`${styles["person-grid__age"]}`}><strong>Wiek:</strong> {person.age}</p>
        <p className={`${styles["person-grid__birth-date"]}`}><strong>Data urodzenia:</strong> {person.birth_date}</p>
        <p className={`${styles["person-grid__biography"]}`}><strong>Życiorys:</strong><br></br>{person.biography}</p>
      </div>
    </>
  );
}

export default PersonGridItem;
