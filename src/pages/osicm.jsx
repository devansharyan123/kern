import React from 'react'

function osicm() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-2xl md:text-3xl font-semibold text-black text-center mb-4">
        Patch Security Analysis
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mb-10">
        The Patch Analyzer provides a list of patches that will be removed,
        downgraded, accumulated, or obsoleted by other patches. Patch
        accumulations are similar to patch upgrades. The accumulated patch is
        removed and its fixes are delivered by a new patch.
      </p>

      <div className="flex flex-col items-center text-center md:flex-row md:justify-between">
        <div className="mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Secure your <span className="text-blue-500">PATCH</span>
          </h2>
          <p className="text-gray-600 mt-4">
            Start scanning a patch file to see if there are any security-related
            issues in it or not.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg mt-6 shadow-lg hover:shadow-xl transition-all">
            Start Analyzing
          </button>
        </div>

        {/* Right side image */}
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dwwbx27ts/image/upload/v1738178418/QR_Code-rafiki_1_iwjwn7.jpg" // Replace this with the actual image link
            alt="QR Code Analysis"
            className="w-80 h-auto bg-transparent"
          />
        </div>
      </div>
    </div>
  )
}

export default osicm