DROP TABLE IF EXISTS `things`;
CREATE TABLE `things` (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  hash varchar(255) NOT NULL,
  title varchar(255) DEFAULT NULL,
  description varchar(128) DEFAULT NULL,
  visible tinyint(1) DEFAULT 0,
  status enum('lost', 'calm') NOT NULL DEFAULT 'calm',
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY hash (`hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
