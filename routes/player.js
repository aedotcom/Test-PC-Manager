const fs = require('fs');

module.exports = {
    addPlayerPage: (req, res) => {
        res.render('add-player.ejs', {
            title: "Welcome to Test-Pcs World | Add a new Test-PC"
            ,message: ''
        });
    },
    addPlayer: (req, res) => {
        
        //if (!req.files) {
        //    return res.status(400).send("No files were uploaded.");
        //}

        let message = '';
        let rack_id = req.body.rack_id;
        let pc_number = req.body.pc_number;
        let os_type = req.body.os_type;
        let lock_key = req.body.lock_key;
        let pc_id = req.body.pc_id;
        let ip_addr = req.body.ip_addr;
        let mac_addr = req.body.mac_addr;
        let prj_name = req.body.prj_name;
        let user_name = req.body.user_name;



/*
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;
        let username = req.body.username;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;
        */

        //let usernameQuery = "SELECT * FROM `players` WHERE user_name = '" + username + "'";
        let testpcQuery = "SELECT * FROM `testpcs` WHERE rack_id = '" + rack_id + "'" + " AND pc_number = '" + pc_number +"'";

        db.query(testpcQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Test PC already exists';
                res.render('add-player.ejs', {
                    message,
                    title: "Welcome to Test-Pcs World | Add a new Test-PC"
                });
            } else {
                let query = "INSERT INTO `testpcs` (rack_id, pc_number, os_type,  lock_key, pc_id, ip_addr, mac_addr, prj_name, user_name) VALUES ('" +
                    rack_id + "', '" + pc_number + "', '" + os_type + "', '" +  lock_key + "', '" + pc_id + "', '" + ip_addr + "', '" + mac_addr + "', '" + prj_name + "', '" + user_name+ "')";

                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
                /*
            
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the player's details to the database
                        let query = "INSERT INTO `players` (first_name, last_name, position, number, image, user_name) VALUES ('" +
                            first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + image_name + "', '" + username + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-player.ejs', {
                        message,
                        title: "Welcome to Test-Pcs World | Add a new Test-PC"
                    });
                }
                */
            }
        });
    },
    editPlayerPage: (req, res) => {
        let playerId = req.params.id;
        let query = "SELECT * FROM `testpcs` WHERE id = '" + playerId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: "Edit  Test-PC"
                ,player: result[0]
                ,message: ''
            });
        });
    },
    editPlayer: (req, res) => {
        let playerId = req.params.id;
        let os_type = req.body.os_type;
        let prj_name = req.body.prj_name;
        let user_name = req.body.user_name;

        let query = "UPDATE `testpcs` SET `os_type` = '" + os_type + "', `prj_name` = '" + prj_name + "', `user_name` = '" + user_name + "' WHERE `testpcs`.`id` = '" + playerId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePlayer: (req, res) => {
        let playerId = req.params.id;
        let getImageQuery = 'SELECT image from `testpcs` WHERE id = "' + playerId + '"';
        let deleteUserQuery = 'DELETE FROM testpcs WHERE id = "' + playerId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }


            db.query(deleteUserQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });

           
           /* let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
            */
        });
    }
};
