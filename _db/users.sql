DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  login varchar(255) NOT NULL,
  password varchar(255) DEFAULT NULL,
  status enum('approved', 'banned', 'pending') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'pending',
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY login (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
