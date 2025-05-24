
const fs = require('fs');

function get(req, res) {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let user = data.find(st => st.email == id)

            if (user == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(user);
            }

        }


    })
}

exports.login = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let user = req.body
            data = JSON.parse(data);
            let currentUser = data.find(st => st.email == user.email)

            if (currentUser == undefined) {
                res.status(500).send("user isn't exist!, please register");
            } else {
                res.send(currentUser);
            }

        }

    })
    }



exports.register = (req, res) => {
        const newUser = req.body;
        console.log(req.body)
        console.log(newUser)
        // מיקום הקובץ
     
    
        // קריאה לקובץ
        fs.readFile("users.json", "utf-8", (err, data) => {
            if (err) {
                return res.status(500).send("שגיאה בקריאת קובץ המשתמשים");
            }
    
            let users = [];
            try {
                users = JSON.parse(data);
            } catch (parseErr) {
                return res.status(500).send("שגיאה בפענוח נתוני המשתמשים");
            }
    
            // בדיקה אם המשתמש כבר קיים לפי אימייל
            const existingUser = users.find(u => u.id === newUser.id);
            if (existingUser) {
                return res.status(400).send("המשתמש כבר קיים. נסה להתחבר.");
            }
    
            // יצירת מזהה חדש אם צריך (לא חובה)
            newUser.id = Date.now();
    
            // הוספת המשתמש לרשימה
            users.push(newUser);
    
            // כתיבה מחדש לקובץ
            fs.writeFile("users.json", JSON.stringify(users, null, 2), "utf-8", (writeErr) => {
                if (writeErr) {
                    return res.status(500).send("שגיאה בכתיבה לקובץ");
                }
    
                res.send({ message: "ההרשמה הצליחה", user: newUser });
            });
        });
    }
    

exports.post = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        let users = JSON.parse(data);
        //body =  לתוכן שנשלח בפונקציה פןסט 
        console.log(users[users.length-1].id + 1)
        // console.log(Number(users[users.length-1].id) + 1)
        req.body.id = users[users.length-1].id + 1
        users.push(req.body);
        fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if (err) {
                res.status(500).send("error  in add users ");
            } else {
                res.send("sucess add");
            }
        })
    })
}




//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
