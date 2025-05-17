const express = require('express');
const router = express.Router();
const bagController = require('../controller/bag');

router.get('/', bagController.getBagItems);
router.get('/:id', bagController.getBagItemById);
router.post('/', bagController.addBag);
router.post('/:id', bagController.addItemToBag);
router.put('/:id', bagController.updateBagItem);
router.delete('/:id', bagController.deleteBagItem);
router.delete('/:cart/:id', bagController.deleteBagItem);

module.exports = router;
