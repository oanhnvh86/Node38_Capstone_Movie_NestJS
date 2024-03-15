/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `ma_banner` int NOT NULL AUTO_INCREMENT,
  `ma_phim` int DEFAULT NULL,
  `hinh_anh` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ma_banner`),
  KEY `ma_phim` (`ma_phim`),
  CONSTRAINT `ma_phim_fk` FOREIGN KEY (`ma_phim`) REFERENCES `phim` (`ma_phim`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `cumrap`;
CREATE TABLE `cumrap` (
  `ma_cum_rap` int NOT NULL AUTO_INCREMENT,
  `ten_cum_rap` varchar(100) DEFAULT NULL,
  `dia_chi` varchar(100) DEFAULT NULL,
  `ma_he_thong_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_cum_rap`),
  KEY `ma_he_thong_rap` (`ma_he_thong_rap`),
  CONSTRAINT `ma_he_thong_rap_fk` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `hethongrap` (`ma_he_thong_rap`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `datve`;
CREATE TABLE `datve` (
  `tai_khoan` int NOT NULL,
  `ma_lich_chieu` int NOT NULL,
  `ma_ghe` int NOT NULL,
  PRIMARY KEY (`tai_khoan`,`ma_lich_chieu`,`ma_ghe`),
  KEY `tai_khoan` (`tai_khoan`),
  KEY `ma_lich_chieu` (`ma_lich_chieu`),
  KEY `ma_ghe` (`ma_ghe`),
  CONSTRAINT `ma_ghe_fk_2` FOREIGN KEY (`ma_ghe`) REFERENCES `ghe` (`ma_ghe`) ON DELETE CASCADE,
  CONSTRAINT `ma_lich_chieu_fk_2` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `lichchieu` (`ma_lich_chieu`) ON DELETE CASCADE,
  CONSTRAINT `tai_khoan_fk_2` FOREIGN KEY (`tai_khoan`) REFERENCES `nguoidung` (`tai_khoan`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ghe`;
CREATE TABLE `ghe` (
  `ma_ghe` int NOT NULL AUTO_INCREMENT,
  `ten_ghe` varchar(100) DEFAULT NULL,
  `loai_ghe` varchar(100) DEFAULT NULL,
  `ma_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_ghe`),
  KEY `ma_rap` (`ma_rap`),
  CONSTRAINT `ma_rap_fk` FOREIGN KEY (`ma_rap`) REFERENCES `rapphim` (`ma_rap`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `hethongrap`;
CREATE TABLE `hethongrap` (
  `ma_he_thong_rap` int NOT NULL AUTO_INCREMENT,
  `ten_he_thong_rap` varchar(100) DEFAULT NULL,
  `logo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `lichchieu`;
CREATE TABLE `lichchieu` (
  `ma_lich_chieu` int NOT NULL AUTO_INCREMENT,
  `ma_rap` int NOT NULL,
  `ma_phim` int NOT NULL,
  `ngay_gio_chieu` datetime NOT NULL,
  `gia_ve` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ma_lich_chieu`),
  KEY `idx_ma_rap` (`ma_rap`),
  KEY `idx_ma_phim` (`ma_phim`),
  CONSTRAINT `ma_phim_fk_2` FOREIGN KEY (`ma_phim`) REFERENCES `phim` (`ma_phim`) ON DELETE CASCADE,
  CONSTRAINT `ma_rap_fk_2` FOREIGN KEY (`ma_rap`) REFERENCES `rapphim` (`ma_rap`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `nguoidung`;
CREATE TABLE `nguoidung` (
  `tai_khoan` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `so_dt` varchar(100) DEFAULT NULL,
  `mat_khau` varchar(100) DEFAULT NULL,
  `loai_nguoi_dung` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`tai_khoan`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `phim`;
CREATE TABLE `phim` (
  `ma_phim` int NOT NULL AUTO_INCREMENT,
  `ten_phim` varchar(100) DEFAULT NULL,
  `trailer` varchar(100) DEFAULT NULL,
  `hinh_anh` varchar(100) DEFAULT NULL,
  `mo_ta` varchar(100) DEFAULT NULL,
  `ngay_khoi_chieu` date DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `hot` tinyint(1) DEFAULT NULL,
  `dang_chieu` tinyint(1) DEFAULT NULL,
  `sap_chieu` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `rapphim`;
CREATE TABLE `rapphim` (
  `ma_rap` int NOT NULL AUTO_INCREMENT,
  `ten_rap` varchar(100) DEFAULT NULL,
  `ma_cum_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_rap`),
  KEY `ma_cum_rap` (`ma_cum_rap`),
  CONSTRAINT `ma_cum_rap_fk` FOREIGN KEY (`ma_cum_rap`) REFERENCES `cumrap` (`ma_cum_rap`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(7, 1, 'img banner 1');
INSERT INTO `banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(8, 3, 'img banner 3');


INSERT INTO `cumrap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(1, 'cum rap 1', 'hong dao, tan binh', 1);
INSERT INTO `cumrap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(6, 'cum rap 3', 'truong son, tan binh', 4);
INSERT INTO `cumrap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(7, 'cum rap 4', 'nguyen dinh chieu, q3', 4);

INSERT INTO `datve` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(1, 1, 1);
INSERT INTO `datve` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(1, 1, 2);
INSERT INTO `datve` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(1, 1, 6);
INSERT INTO `datve` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(2, 2, 1),
(2, 2, 2);

INSERT INTO `ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(1, 'ghe1', 'vip', 1);
INSERT INTO `ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(2, 'ghe 2-2', 'normal', 1);
INSERT INTO `ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(6, 'ghe 3', 'normal', 1);
INSERT INTO `ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(7, 'ghe 4', 'normal', 1),
(8, 'ghe 1', 'VIP', 2),
(9, 'ghe 2', 'normal', 2);

INSERT INTO `hethongrap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(1, 'hethongrap1', NULL);
INSERT INTO `hethongrap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(4, 'theater name 2', 'theater 2');


INSERT INTO `lichchieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(1, 1, 1, '2024-03-08 00:00:00', '10000.00');
INSERT INTO `lichchieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(2, 1, 1, '2024-03-01 18:25:44', '100000.00');
INSERT INTO `lichchieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(3, 1, 2, '2024-03-02 18:25:44', '80000.00');
INSERT INTO `lichchieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(4, 1, 2, '2024-03-14 07:11:50', '100.00'),
(5, 1, 2, '2024-03-14 07:11:50', '100.50');

INSERT INTO `nguoidung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(1, 'nguyen oanh', 'oanhnguyen@gmail.com', '0937798888', '11111111', 'admin');
INSERT INTO `nguoidung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(2, 'nguyen oanh 2', 'oanhnguyen2@gmail.com', '999999999999', '999999999', 'employee');
INSERT INTO `nguoidung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(3, 'nguyen oanh 3', 'oanhnguyen3@gmail.com', '88888888888', '88888888', 'employee');
INSERT INTO `nguoidung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(4, 'nguyen oanh 4', 'oanhnguyen4@gmail.com', '0000000', '$2b$10$KTWnnln7cJQYpEnkQHwLR.WOOds5m08gMZec0g6Y26BTGLNawWsya', 'employee'),
(5, 'oanh test1', 'oanhtest1@gmail.com', '0937798888', '1234567', 'emplooyee'),
(6, 'oanh test2', 'oanhtest2@gmail.com', '0937798888', '1234567', 'employee'),
(7, 'oanh test3', 'oanhtest3@gmail.com', '0937798888', '1234567', 'employee'),
(8, 'oanh test4', 'oanhtest4@gmail.com', '0937798888', '1234567', 'employee'),
(9, 'oanh test5', 'oanhtest5@gmail.com', '0937798888', '1234567', 'employee'),
(10, 'oanhnguyen10', 'oanhnguyen10@gmail.com', '0937798888', '$2b$10$HA5nDaTv5X0rh8bOTferU.Wu.Xi9mEVg1.4f/Lx2VfJE./amkBwi.', 'admin'),
(13, 'oanhnguyen11', 'oanhnguyen11@gmail.com', '0937798888', '$2b$10$d66NdP44ncyeG/E24BlzdOfZmtfmb5lgiOctbHDe0mNQi90ohea4S', 'employee'),
(14, 'oanhnguyen12', 'oanhnguyen12@gmail.com', '0937798888', '$2b$10$vpO2PQQynVsGVSbt5kwTcec8I1KTEjMkBzeZzvrSY6uaMm8mqoGWu', 'employee');

INSERT INTO `phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(1, 'phim 1', 'trailer phim 1', '', 'des phim 1', '2024-03-08', 1, 1, 1, 0);
INSERT INTO `phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(2, 'phim 2', 'trailer phim 2', NULL, 'des phim 2', '2024-03-01', 20, 1, 1, 0);
INSERT INTO `phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(3, 'phim 3', 'trailer phim 3', NULL, 'des phim 3', '2024-03-01', 20, 1, 1, 0);

INSERT INTO `rapphim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(1, 'rap phim 1', 1);
INSERT INTO `rapphim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(2, 'rap phim 2', 1);
INSERT INTO `rapphim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(3, 'rap phim 3', 1);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;