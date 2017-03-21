DROP TABLE IF EXISTS `user_things`;
CREATE TABLE `user_things` (
  thing_id int(11) NOT NULL,
  user_id int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
