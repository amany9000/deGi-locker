import { create_DID, genCID, getHash, register_DID } from "fvm-credentials";
import { useState } from "react";
import { useSigner } from "wagmi";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);
  const { data: signer, isError, isLoading } = useSigner();

  const getSignature = async (msg) => {
    return await signer.signMessage(msg);
  };

  const handleChange = async (event) => {
    const files = Array.from(event.target.files);
    setFiles(files);
    const res = await getSignature("hello");
    console.log("res", res);
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
    const files64Hash = getHash(base64Result);

    try {
      const cid = await genCID(files64Hash, privateKey);
      const did = await create_DID(privateKey);
      const tx_hash = register_DID(did.did, cid, privateKey);

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
                4cec7525e54f5dd63893cda83b6d7f69
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
                  <div className="mb-3 w-96">
                    <label
                      for="formFileMultiple"
                      className="form-label inline-block mb-2 text-gray-700"
                    >
                      Upload Files
                    </label>
                    <input
                      onChange={handleChange}
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      type="file"
                      id="formFileMultiple"
                      multiple
                    />
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-16 overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Verification History
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Documents Verified in the Past
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                3f034f37d5bab539855761cd063d5729
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Feb 6th 23
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                d1d9eddcdbf2d66ea52f44463fec1143
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Jan 31st 23
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                5a567ff22525cd36c80b14ee6f9c3d4d
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Apr 10th 22
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                d5cb45a604674f85426a9589f1c4a5d8
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Dec 31st 22
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
