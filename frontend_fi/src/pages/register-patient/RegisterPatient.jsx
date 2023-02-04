import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useContractWrite } from "wagmi";
import { abi, address } from "../../constants";

const RegisterPatient = () => {
  const [patientName, setPatientName] = useState("");
  const { data, isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: address[3141].address,
    chainId: 3141,
    abi: abi,
    args: [patientName],
    functionName: "addPatient",
  });
  return (
    <section>
      <h3>register new patient</h3>
      <small>Patient ID will be given after registration</small>
      <form>
        <input
          name="name"
          value={patientName}
          onChange={(event) => setPatientName(event.target.value)}
          type="text"
          placeholder="Patients Name"
        />
        <button
          disabled={!writeAsync}
          onClick={async (event) => {
            event.preventDefault();
            await writeAsync();
          }}
        >
          register
          <span>{isLoading && <FontAwesomeIcon icon={faSpinner} />}</span>
        </button>
        <div>
          <span>
            patient ID: {isSuccess && `Patient Id ${data.events[0].args}`}
          </span>
        </div>
      </form>
    </section>
  );
};

export default RegisterPatient;
