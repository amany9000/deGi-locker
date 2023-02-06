import sha256 from "crypto-js/sha256";
import { genCIDFunc, register_DIDSigner } from "fvm-credentials";
import { useState } from "react";
import { useSnackbar } from "react-simple-snackbar";
import { useAccount, useSigner } from "wagmi";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [openSnackbar, closeSnackbar] = useSnackbar();

  const getSignature = async (msg) => {
    return await signer.signMessage(msg);
  };

  const handleChange = async (event) => {
    const files = Array.from(event.target.files);
    setFiles(files);
    // const res = await getSignature("hello");
    // console.log("res", res);
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
    const files64Hash = base64Result.map((base64) => sha256(base64));
    console.log("files64Hash", files64Hash);

    try {
      const cid = await genCIDFunc(files64Hash, getSignature);
      console.log("genCIDFunc", cid);
      const did = await register_DIDSigner(
        `did:fvm:testnet:${address}`,
        cid,
        signer
      );
      openSnackbar(`DID Registered with Tx Hash ${did}`);

      console.log("cid", cid);
      console.log("did", did);
      console.log("tx_hash", tx_hash);

      console.log(
        "Successful TX_HASH of Registration",
        tx_hash,
        "\n Transaction is actually successfull, error because of misalignment of web3 and FVM"
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  // const handleRemove = (file) => {
  //   setFiles(files.filter(f => f !== file));
  // };

  console.log("files", files);

  return (
    <div className="container mx-auto mb-20">
      <div className="mt-20 overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Uploaded Documents
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal Documents and other Identity Documents
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Aadhar</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                c1ca1ef4efcb714ff2d6b7ee2fdda1b814c979b02c7e68a9334a47f0d1285cac
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Driving License
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                12a453da382fde1aea610decac62a19c
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">PAN Card</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                8bfb21925c88382336ee3519cad45e54
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Passport</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                5eb567dae33f12fedd2b9b1cc3281d71
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Want to upload more?
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <div className="flex justify-start">
                  <div className="mb-3 w-full">
                    <div>
                      <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div class="space-y-1 text-center">
                          <svg
                            class="mx-auto h-12 w-12 text-gray-400"
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
                          <div class="flex text-sm text-gray-600">
                            <label
                              for="file-upload"
                              class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                class="sr-only"
                                multiple
                                onChange={handleChange}
                              />
                            </label>
                            <p class="pl-1">or drag and drop</p>
                          </div>
                          <p class="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
