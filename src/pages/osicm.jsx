import React from 'react'

function osicm() {
    return (
        <div className="flex flex-col items-center max-h-screen   mt-10  ">
            <div className="flex flex-col items-center  text-center pb-10 mb-10">
                <div className="mb-6">
                    <h1 className="text-5xl  font-bold text-black">
                        Patch Security Analysis
                    </h1>
                </div>
                <div>
                    <p className="text-gray-600 text-center  text-2xl p-5">
                        The Patch Analyzer provides a list of patches that will be removed, downgraded, accumulated, or obsoleted by other patches. Patch accumulations are similar to patch upgrades. The accumulated patch is removed and its fixes are delivered by a new patch.
                    </p>
                </div>
            </div>

            <div className=" flex flex-row  justify-between text-left md:flex-row md:justify-between ">
                <div className="mb-8 md:mb-0">
                    <h2 className="  font-bold text-7xl text-black ">
                        Secure your <span className="text-blue-500">PATCH</span>
                    </h2>
                    <p className=" mt-4 text-left text-3xl text-blue-600 ">
                        Start scanning a patch file to see if there are any <br />security-related
                        issues in it or not.
                    </p>
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-1xl px-6 py-3 rounded-lg mt-6 shadow-lg hover:shadow-xl transition-all">
                        Start Analyzing
                    </button>
                </div>

                {/* Right side image */}
                <div className="relative">
                    <img
                        src="https://res.cloudinary.com/dwwbx27ts/image/upload/v1738178418/QR_Code-rafiki_1_iwjwn7.jpg" // Replace this with the actual image link
                        alt="QR Code Analysis"
                        className="w-100 h-auto bg-transparent"
                    />
                </div>
            </div>
        </div>
    )
}

export default osicm