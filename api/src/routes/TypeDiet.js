const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.send("holis funciono el types");
})

module.exports = router;