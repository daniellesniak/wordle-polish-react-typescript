import React, { Fragment, useEffect, useState } from "react";
import { db, StatType } from "../db";
import Modal, { ModalOpenCloseHandler } from "./common/Modal";

type Props = {
    isOpen: boolean,
    handleOpenClose: ModalOpenCloseHandler
}

type StatsCounters = {
    [category in StatsCategories]: number
}

enum StatsCategories {
    ALL = 'ALL',
    WINS = 'WINS',
    LOSES = 'LOSES'
}

const defaultStats: StatsCounters = {
    [StatsCategories.ALL]: null,
    [StatsCategories.WINS]: null,
    [StatsCategories.LOSES]: null,
};

const StatsModal: React.FC<Props> = ({ isOpen, handleOpenClose }: Props): React.ReactElement => {
    const stats = useStats(defaultStats, [isOpen]);

    return (
        <Modal isOpen={isOpen} handleOpenClose={handleOpenClose}>
            <>
                <div className="mt-2">
                    Games played: {stats[StatsCategories.ALL]}
                </div>

                <div className="mt-2">
                    Games won: {stats[StatsCategories.WINS]}
                </div>

                <div className="mt-2">
                    Games lost: {stats[StatsCategories.LOSES]}
                </div>
            </>
        </Modal>
    );
};

export default StatsModal;

// @TODO: Resolve problems.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Parameter 'dependencies' implicitly has an 'any[]' type.
function useStats(defaultStats: StatsCounters, dependencies = []) {
    const [stats, setStats] = useState(defaultStats);

    const getAndSetStats = async () => {
        const all = await db.count('stats');
        const won = await db.getStatsCount(StatType.WIN);
        const lost = await db.getStatsCount(StatType.LOSE);

        setStats({
            [StatsCategories.ALL]: all,
            [StatsCategories.WINS]: won,
            [StatsCategories.LOSES]: lost,
        });
    };

    useEffect(() => {
        getAndSetStats();
    }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

    return stats;
}
