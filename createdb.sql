CREATE TABLE `musis` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT,
  `artist` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `beats` int(11) DEFAULT 0,
  `high_pitch` double DEFAULT 0,
  `low_pitch` double DEFAULT 0,
  `bpm` int(11) DEFAULT 0,
  `cur_time` int(11) DEFAULT 0,
  PRIMARY KEY (`m_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

