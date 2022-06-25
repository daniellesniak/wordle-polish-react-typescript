import React from "react";

const TheHeader: React.FC = () => {
    return (
        <div className="flex justify-center items-center py-3 mb-4">
            <div>
                <h1 className="text-4xl font-bold text-gray-100 select-none">Wordle PL</h1>
            </div>
        </div>
    );
};

export default TheHeader;
