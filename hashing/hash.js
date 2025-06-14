const bcrypt = require('bcrypt');
const password = "admin"; // replace this with your password


bcrypt.hash(password, 12, function(err, hash) {
   if (err) {
       console.error("Error hashing password:", err);
   } else {
       console.log("Hashed password:", hash);
   }
});

// You can use this command to run the file
// cd /usercode/hashing && node hash.js
