const express = require("express");
const { saveForm, fetchForm, updateForm, listForms } = require("../controllers/form-controller");
const { verifyAdmin } = require("../middlewares/auth-middleware");

const router = express.Router();

router.post("/save", verifyAdmin, saveForm);

router.get("/list", verifyAdmin, listForms);

router.put("/update/:id", verifyAdmin, updateForm);

router.get("/:id", verifyAdmin, fetchForm);

module.exports = router;
