
const fs = require('fs');


function readProductData() {
  const data = fs.readFileSync("products.json", 'utf-8');
  return JSON.parse(data);
}

function writeProductData(data) {
  fs.writeFileSync("products.json", JSON.stringify(data, null, 2), 'utf-8');
}

function get(req, res) {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id =parseInt(req.params.id);

            data = JSON.parse(data);
            let product = data.find(st => st.id == id)

            if (product == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(product);
            }

        }


    })
}


exports.post = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        let products = JSON.parse(data);
        //body =  לתוכן שנשלח בפונקציה פןסט 
        let product =req.body
        // מוסיף איידי למוצר החדש 
        products.push(product);
        fs.writeFile("products.json", JSON.stringify(products), (err) => {
            if (err) {
                res.status(500).send("error  in add products ");
            } else {
                res.send(product);
            }
        })
    })
}


exports.addProduct = (req, res) => {
    const products = readProductData();
    const itemId = Math.max(0, ...products.map(i => i.id || 0));
    const newItem={...req.body,id:itemId+1}
    products.push(newItem);
    writeProductData(products);
    res.status(201).json({ message: 'מוצר נוסף', item:newItem });
  };
exports.updateProduct = (req, res) => {
  const products = readProductData();
  const itemId = parseInt(req.params.id);
  const item = products.find((i) => i.id === itemId);

  if (!item) return res.status(404).json({ message: 'לא נמצא פריט עם מזהה זה' });

  item.name = req.body.name || item.name;
  item.quantity = req.body.quantity || item.quantity;
  item.price = req.body.price || item.price;
  item.id=req.body.id || item.id;
  req.body.image_url || item.image_url;
  req.body.inStock || item.inStock;
  req.body.category || item.category;
  req.body.discount_percentage || item.discount_percentage;
  
  writeProductData(products);
  res.json({ message: 'הפריט עודכן', item });
};


exports.deleteProduct = (req, res) => {
    let products = readProductData();
    const itemId = parseInt(req.params.id);
    const index = products.findIndex((i) => i.id === itemId);
  
    if (index === -1) return res.status(404).json({ message: 'לא נמצא פריט למחיקה' });
  
    const deleted = products.splice(index, 1);
    writeProductData(products);
    res.json({ message: 'הפריט נמחק', deleted });
  };
//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
