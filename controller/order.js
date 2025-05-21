
const fs = require('fs');

function get(req, res) {
    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
exports.getById = (req, res) => {
    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file orders");
        } else {
            const id = req.params.id;
            data = JSON.parse(data);

            // מחזיר את כל ההזמנות עם אותו userId
            const orders = data.filter(order => order.userId == id);

            if (orders.length === 0) {
                res.status(404).send("לא נמצאו הזמנות למשתמש עם ת.ז " + id);
            } else {
                res.send(orders); // מחזיר מערך של כל ההזמנות
            }
        }
    });
};



exports.post = (req, res) => {

    fs.readFile("orders.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        let orders = JSON.parse(data);
        //body =  לתוכן שנשלח בפונקציה פןסט 

        console.log(req.body)
        orders.push(req.body);
        fs.writeFile("orders.json", JSON.stringify(orders), (err) => {
            if (err) {
                res.status(500).send("error  in add order ");
            } else {
                res.send("sucess add order");
            }
        })
    })
}
//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
