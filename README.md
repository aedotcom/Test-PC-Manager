"# node-mysql-crud-app" 


 CREATE DATABASE socka;
 
 CREATE TABLE IF NOT EXISTS `testpcs` (
        `id` int(5) NOT NULL AUTO_INCREMENT,
        `rack_id` varchar(255) NOT NULL,
        `pc_number` int(5) NOT NULL,
        `os_type` varchar(255) NOT NULL,
        `lock_key` varchar(255) ,
        `pc_id` varchar(255) ,
        `ip_addr` varchar(255) NOT NULL,
        `mac_addr` varchar(255) NOT NULL,
        `prj_name` varchar(512) ,
        `user_name` varchar(255) ,
        PRIMARY KEY (`id`)
       ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;