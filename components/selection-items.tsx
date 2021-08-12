import React from 'react';
import Image from 'next/image';
import styles from "../styles/styles.module.scss";

import { NextPage } from "next";

interface Props {
    value: any;
    name: string;
}

const SelectionItem: NextPage<Props> = e => {
    return (
        <span
            className={e.value === 1
            ? `${styles.options_item_active} ${styles.options_item}`
            : styles.options_item
            }
        >
            <Image src="/icons/rock.svg" alt="rock" width={50} height={50} />
            <span className={styles.tooltip}>{e.name}</span>
        </span>
    )
}

export default SelectionItem
