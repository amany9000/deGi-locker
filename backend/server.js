const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { verify } = require("fvm-credentials");
const fs = require("fs");
const cors = require("cors");

app.use(cors());

app.post("/verify", upload.single("file"), async (request, response) => {
  const address = request.query.address;
  const file = request.file;
  fs.readFile(file.path, async (err, data) => {
    if (err) {
      console.log("err", err);
      return res.status(500).send(err);
    }

    const base64data = data.toString("base64");
    const did = `did:fvm:testnet:${address}`;
    const res = await verify(base64data, did);
    console.log("res", res);

    return response.send(200, res);
  });
});

app.listen(PORT, () => console.log("server listening on " + PORT));
