import { ConnectKitButton } from "connectkit";
import { verify } from "fvm-credentials";
import { useSnackbar } from "react-simple-snackbar";
import { useAccount } from "wagmi";

const VerifierLanding = () => {
  const { address } = useAccount();
  const [openSnackbar, closeSnackbar] = useSnackbar();

  const handleChange = async (event) => {
    const files = Array.from(event.target.files);
    console.log("files", files);
    openSnackbar("Mission Successful!!");
    console.log("handling change");
    const did = `did:fvm:testnet:${address}`;
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.onerror = reject;
      });
    });

    const base64Result = await Promise.all(promises);
    console.log("base64Result", base64Result);

    const verifyId = await verify(base64Result[0], did);
    console.log("verify", verifyId);
  };

  return (
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Understand User Flow.
            <span className="sm:block"> Increase Conversion. </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {!Boolean(address) && (
              <ConnectKitButton.Custom>
                {({ isConnected, show, truncatedAddress, address }) => (
                  <button
                    className={
                      !isConnected &&
                      "block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                    }
                    onClick={show}
                  >
                    {isConnected ? truncatedAddress : "Connect Wallet"}
                  </button>
                )}
              </ConnectKitButton.Custom>
            )}

            {Boolean(address) && (
              <div className="flex flex-1 flex-col">
                <label className="block text-sm font-medium text-white-700">
                  Upload File to Verify
                </label>
                <div className="mt-4 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="absolute w-full">
                    <span class="animate-ping relative -top-8 left-72 mr-1 mt-1 inline-flex h-4 w-4 rounded-full bg-white"></span>
                  </div>
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-white-600">
                      <label
                        for="file-upload"
                        className="relative cursor-pointer rounded-md bg-transparent font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-white-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifierLanding;
