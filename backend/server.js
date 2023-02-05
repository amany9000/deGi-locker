const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const DatauriParser = require("datauri/parser");
const path = require("path");

const parser = new DatauriParser();
const {
  create_DID,
  genCID,
  getLocationHash,
  register_DID,
} = require("fvm-credentials");

app.post("/upload", upload.array("files"), async (request, response) => {
  const files = request.files.map((file) => file.path);

  // const filesPath = files.map((file) => {
  //   console.log("fiel", file);
  //   const extName = path.extname(file.originalname).toString();
  //   return parser.format(extName, file.buffer);
  // });

  // console.log("files", filesPath);
  const privateKey =
    "0xf974bad53de118dfe831ee84b065e8cd7f66fff82e41f7c933e412c862746302";

  const hashes = await getLocationHash(files);
  const cid = await genCID(hashes, privateKey);
  const did = await create_DID(privateKey);
  const tx_hash = register_DID(did.did, cid, privateKey);

  console.log(
    "Successful TX_HASH of Registration",
    tx_hash,
    "\n Transaction is actually successfull, error because of misalignment of web3 and FVM"
  );

  return response.status(200).json({
    cid,
    did,
    tx_hash,
  });
  // getLocationHash(files).then((files64) => {
  //   console.log("FileHashList", files64);
  //   genCID(files64, privateKey).then(async (cid) => {
  //     console.log("CID: ", cid);
  //     create_DID(privateKey).then((obj) => {
  //       console.log("DID Object: ", obj);
  //       register_DID(obj.did, cid, privateKey).then((tx_hash) =>
  //       );
  //     });

  //     //const data = await ipfs.cat(cid).next()
  //     //console.log('Data read back via ipfs.cat:',  new TextDecoder().decode(data.value))
  //   });
  // });
});

app.listen(PORT, () => console.log("server listening on " + PORT));
