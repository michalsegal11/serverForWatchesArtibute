const fs = require('fs');
const path = require('path');

function readBagData() {
  const data = fs.readFileSync("bag.json", 'utf-8');
  return JSON.parse(data);
}

function writeBagData(data) {
  fs.writeFileSync("bag.json", JSON.stringify(data, null, 2), 'utf-8');
}

exports.getBagItems = (req, res) => {
  const bag = readBagData();
  res.json(bag);
};

exports.getBagItemById=(req, res)=>
{
    const bag = readBagData();
    const itemId = parseInt(req.params.id);
    const item = bag.find((i) => i.user_id === itemId);
  
    if (!item) return res.status(404).json({ message: 'לא נמצא פריט עם מזהה זה' });

    res.json({ message: 'הפריט :', item });
}

exports.addItemToBag = (req, res) => {
    const bag = readBagData();
  
    const userId = parseInt(req.params.id);
    const newItem = {
      product_id: req.body.product_id,
      quantity: req.body.quantity
    };
  
    const userBag = bag.find(i => i.user_id === userId);
  
    if (!userBag) {
      return res.status(404).json({ message: 'לא נמצא סל עבור המשתמש' });
    }
  
    userBag.cart_items.push(newItem);
    writeBagData(bag);
  
    res.status(201).json({ message: 'המוצר נוסף לסל', item: newItem });
  };
  

exports.addBag = (req, res) => {
    const bag = readBagData();
    const newItem = {
      user_id:req.body.user_id,
      cart_items:req.body.cart_items,
    };
    bag.push(newItem);
    writeBagData(bag);
    res.status(201).json({ message: 'סל נוסף', item: newItem });
  };
exports.updateBagItem = (req, res) => {
  const bag = readBagData();
  const itemId = parseInt(req.params.id);
  const item = bag.find((i) => i.user_id === itemId);

  if (!item) return res.status(404).json({ message: 'לא נמצא פריט עם מזהה זה' });

  item.name = req.body.name || item.name;
  item.quantity = req.body.quantity || item.quantity;
  item.price = req.body.price || item.price;

  writeBagData(bag);
  res.json({ message: 'הפריט עודכן', item });
};


exports.deleteBag = (req, res) => {
    let bag = readBagData();
    const itemId = parseInt(req.params.id);
    const index = bag.findIndex((i) => i.id === itemId);
  
    if (index === -1) return res.status(404).json({ message: 'לא נמצא פריט למחיקה' });
  
    const deleted = bag.splice(index, 1);
    writeBagData(bag);
    res.json({ message: 'הפריט נמחק', deleted });
  };

exports.deleteBagItem = (req, res) => {
  let bag = readBagData();
  const itemId = parseInt(req.params.id);
  const index = bag.findIndex((i) => i.id === itemId);

  if (index === -1) return res.status(404).json({ message: 'לא נמצא פריט למחיקה' });

  const deleted = bag.splice(index, 1);
  writeBagData(bag);
  res.json({ message: 'הפריט נמחק', deleted });
};
