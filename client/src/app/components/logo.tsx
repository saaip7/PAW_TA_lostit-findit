import React from "react";

const Logo: React.FC = () => {
    return(
        <div className="flex flex-row items-center mt-4 justify-center">
            <img src="/logo.svg"></img>
            <div className="font-bold text-center text-black">
                <div>Lost It</div>
                <div>Find It</div>
            </div>
        </div>
    )
}

export default Logo;