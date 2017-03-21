DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
  user_id int(11) NOT NULL,
  role_id int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
