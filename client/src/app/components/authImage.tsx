import React from "react";

const AuthImage: React.FC = () => {
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-lightBlue1 rounded-lg overflow-hidden">
            <div className="absolute -bottom-1/2 left-10 transform -translate-x-1/2 bg-lightBlue2 h-full w-full"
                style={{ transform: 'rotate(-163deg)', borderRadius:'99px'}}>
            </div>
            <div className="absolute justify-center w-3/4 h-3/4">
                    <img src="/auth_img.png"></img>
                </div>
        </div>
    )
}

export default AuthImage;