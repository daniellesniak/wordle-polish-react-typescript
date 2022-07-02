import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { db, StatType } from "../db";

type Props = {
    isOpen: boolean,
    handleOpenStatsModal: CallableFunction
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

const StatsModal: React.FC<Props> = ({ isOpen, handleOpenStatsModal }: Props): React.ReactElement => {
    const stats = useStats(defaultStats, [isOpen]);

    function closeModal() {
        handleOpenStatsModal(false);
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-700 text-gray-100 p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="mt-2">
                                        Games played: {stats[StatsCategories.ALL]}
                                    </div>

                                    <div className="mt-2">
                                        Games won: {stats[StatsCategories.WINS]}
                                    </div>

                                    <div className="mt-2">
                                        Games lost: {stats[StatsCategories.LOSES]}
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
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
