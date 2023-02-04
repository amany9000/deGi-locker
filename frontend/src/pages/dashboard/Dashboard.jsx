import {
  create_DID,
  genCID,
  getLocationHash,
  register_DID,
} from "fvm-credentials";
import { useState } from "react";

const Dashboard = () => {
  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
    const files = Array.from(event.target.files);
    setFiles(files);

    getLocationHash(files).then((files64) => {
      console.log("FileHashList", files64);
      const privateKey =
        "0xf974bad53de118dfe831ee84b065e8cd7f66fff82e41f7c933e412c862746302";
      genCID(files64, privateKey).then(async (cid) => {
        console.log("CID: ", cid);
        create_DID(privateKey).then((obj) => {
          console.log("DID Object: ", obj);
          register_DID(obj.did, cid, privateKey).then((tx_hash) =>
            console.log(
              "Successful TX_HASH of Registration",
              tx_hash,
              "\n Transaction is actually successfull, error because of misalignment of web3 and FVM"
            )
          );
        });

        //const data = await ipfs.cat(cid).next()
        //console.log('Data read back via ipfs.cat:',  new TextDecoder().decode(data.value))
      });
    });
  };

  // const handleRemove = (file) => {
  //   setFiles(files.filter(f => f !== file));
  // };

  console.log("files", files);

  return (
    <div className="container mx-auto">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Uploaded Documents
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Margot Foster
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Application for
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Backend Developer
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                margotfoster@example.com
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Salary expectation
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                $120,000
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Attachments</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <div class="flex justify-start">
                  <div class="mb-3 w-96">
                    <label
                      for="formFileMultiple"
                      class="form-label inline-block mb-2 text-gray-700"
                    >
                      Upload Files
                    </label>
                    <input
                      onChange={handleChange}
                      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
    </div>
  );
};

export default Dashboard;
