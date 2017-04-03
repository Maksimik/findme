DROP TABLE IF EXISTS `user_profiles`;
CREATE TABLE `user_profiles` (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  type varchar(255) NOT NULL,
  value varchar(255) NOT NULL,
  visible tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
