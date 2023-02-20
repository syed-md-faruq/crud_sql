const express = require('express');
const router = express.Router();
const people_controller = require("../controllers/peoplecontroller");

router.get("/people/:id",people_controller.people_get);
router.get("/all_people",people_controller.people_get_all);
router.post("/add_people",people_controller.people_post);
router.put("/change_people/:id",people_controller.people_put);

router.delete("/delete_people/:id",people_controller.people_delete);
module.exports = router;