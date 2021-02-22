/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 80020
Source Host           : 127.0.0.1:3306
Source Database       : mini_mall

Target Server Type    : MYSQL
Target Server Version : 80020
File Encoding         : 65001

Date: 2021-02-22 18:15:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dt_address
-- ----------------------------
DROP TABLE IF EXISTS `dt_address`;
CREATE TABLE `dt_address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `receive_name` varchar(10) NOT NULL,
  `receive_phone` varchar(20) NOT NULL,
  `receive_region` varchar(100) NOT NULL,
  `receive_detail` varchar(100) NOT NULL,
  `is_default` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_address_openid` (`openid`),
  CONSTRAINT `fk_address_openid` FOREIGN KEY (`openid`) REFERENCES `dt_user` (`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dt_address
-- ----------------------------
INSERT INTO `dt_address` VALUES ('1', 'oU4Rt5eQ9UPnYEoBH5JY75dqgeHM', '张S', '13888887777', '山东省 青岛市 李沧区 虎山路', '蓝山湾三期13#2单元301s', '1');
INSERT INTO `dt_address` VALUES ('16', 'oU4Rt5eQ9UPnYEoBH5JY75dqgeHM', '萨达', '18354525023', '黑龙江省 鸡西市 滴道区', '萨达的发达的', '0');

-- ----------------------------
-- Table structure for dt_cart
-- ----------------------------
DROP TABLE IF EXISTS `dt_cart`;
CREATE TABLE `dt_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `pid` int NOT NULL,
  `count` int NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dt_cart
-- ----------------------------
INSERT INTO `dt_cart` VALUES ('57', 'oU4Rt5eQ9UPnYEoBH5JY75dqgeHM', '10', '1', '977');

-- ----------------------------
-- Table structure for dt_category
-- ----------------------------
DROP TABLE IF EXISTS `dt_category`;
CREATE TABLE `dt_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fid` int NOT NULL,
  `name` varchar(10) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dt_category
-- ----------------------------
INSERT INTO `dt_category` VALUES ('1', '0', '有品推荐', '/images/category/1.jpg');
INSERT INTO `dt_category` VALUES ('2', '0', '家具家装', '/images/category/2.jpg');
INSERT INTO `dt_category` VALUES ('3', '0', '家用电器', '/images/category/3.jpg');
INSERT INTO `dt_category` VALUES ('4', '0', '智能家庭', '/images/category/4.jpg');
INSERT INTO `dt_category` VALUES ('5', '0', '居家餐厨', '/images/category/5.jpg');
INSERT INTO `dt_category` VALUES ('6', '0', '运动户外', '/images/category/6.jpg');
INSERT INTO `dt_category` VALUES ('7', '0', '鞋靴箱包', '/images/category/7.jpg');
INSERT INTO `dt_category` VALUES ('8', '0', '日用文创', '/images/category/8.jpg');
INSERT INTO `dt_category` VALUES ('9', '0', '电视影音', '/images/category/9.jpg');
INSERT INTO `dt_category` VALUES ('10', '0', '服装配饰', '/images/category/10.jpg');
INSERT INTO `dt_category` VALUES ('11', '0', '数码配件', '/images/category/11.jpg');
INSERT INTO `dt_category` VALUES ('12', '0', '美妆个护', '/images/category/12.jpg');
INSERT INTO `dt_category` VALUES ('13', '1', '居家好物', '/images/category/13.png');
INSERT INTO `dt_category` VALUES ('14', '1', '空调', '/images/category/14.png');
INSERT INTO `dt_category` VALUES ('15', '1', '智能手表', '/images/category/15.png');
INSERT INTO `dt_category` VALUES ('16', '1', '耳机', '/images/category/16.png');
INSERT INTO `dt_category` VALUES ('17', '1', '电视机', '/images/category/17.png');
INSERT INTO `dt_category` VALUES ('18', '1', '行李箱', '/images/category/18.png');
INSERT INTO `dt_category` VALUES ('19', '1', '灯具', '/images/category/19.png');
INSERT INTO `dt_category` VALUES ('20', '1', '亲子时光', '/images/category/20.png');
INSERT INTO `dt_category` VALUES ('21', '1', '运动健身', '/images/category/21.png');
INSERT INTO `dt_category` VALUES ('22', '1', '回购榜单', '/images/category/22.png');
INSERT INTO `dt_category` VALUES ('23', '1', '装修好物', '/images/category/23.png');
INSERT INTO `dt_category` VALUES ('24', '1', '夏日解暑', '/images/category/24.png');
INSERT INTO `dt_category` VALUES ('25', '2', '淋浴花洒', '/images/category/25.png');
INSERT INTO `dt_category` VALUES ('26', '2', '浴霸吊顶', '/images/category/26.png');
INSERT INTO `dt_category` VALUES ('27', '2', '马桶', '/images/category/27.png');
INSERT INTO `dt_category` VALUES ('28', '2', '水槽', '/images/category/28.png');
INSERT INTO `dt_category` VALUES ('29', '2', '厨卫龙头', '/images/category/29.png');
INSERT INTO `dt_category` VALUES ('30', '2', '厨卫收纳', '/images/category/30.png');
INSERT INTO `dt_category` VALUES ('31', '2', '饮水工具', '/images/category/31.png');
INSERT INTO `dt_category` VALUES ('32', '2', '浴室柜', '/images/category/32.png');
INSERT INTO `dt_category` VALUES ('33', '2', '浴缸', '/images/category/33.png');
INSERT INTO `dt_category` VALUES ('34', '2', '门窗地板吊顶', '/images/category/34.png');
INSERT INTO `dt_category` VALUES ('35', '2', '客厅家具', '/images/category/35.png');
INSERT INTO `dt_category` VALUES ('36', '2', '儿童家具', '/images/category/36.png');

-- ----------------------------
-- Table structure for dt_order
-- ----------------------------
DROP TABLE IF EXISTS `dt_order`;
CREATE TABLE `dt_order` (
  `id` varchar(10) NOT NULL,
  `openid` varchar(100) NOT NULL,
  `address_id` int NOT NULL,
  `account` int NOT NULL,
  `is_pay` int NOT NULL DEFAULT '0',
  `order_time` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_order_openid` (`openid`),
  KEY `fk_order_address_id` (`address_id`),
  CONSTRAINT `fk_order_address_id` FOREIGN KEY (`address_id`) REFERENCES `dt_address` (`id`),
  CONSTRAINT `fk_order_openid` FOREIGN KEY (`openid`) REFERENCES `dt_user` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dt_order
-- ----------------------------
INSERT INTO `dt_order` VALUES ('MI15390147', 'oU4Rt5eQ9UPnYEoBH5JY75dqgeHM', '1', '4400', '0', '2020-10-27 15:29:24');
INSERT INTO `dt_order` VALUES ('MI15390148', 'oU4Rt5eQ9UPnYEoBH5JY75dqgeHM', '1', '44', '1', '2020-10-27 15:29:24');
INSERT INTO `dt_order` VALUES ('MI33128036', 'oU4Rt5eQ9UPnYEoBH5JY75dqgeHM', '1', '1400', '0', '2021-2-1 1:25:7');
INSERT INTO `dt_order` VALUES ('MI52134614', 'oU4Rt5eQ9UPnYEoBH5JY75dqgeHM', '1', '2899', '0', '2021-2-1 1:24:6');

-- ----------------------------
-- Table structure for dt_order_detail
-- ----------------------------
DROP TABLE IF EXISTS `dt_order_detail`;
CREATE TABLE `dt_order_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` varchar(10) NOT NULL,
  `pid` int NOT NULL,
  `count` int NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_order_detail_order_id` (`order_id`),
  KEY `fk_order_detail_pid` (`pid`),
  CONSTRAINT `fk_order_detail_order_id` FOREIGN KEY (`order_id`) REFERENCES `dt_order` (`id`),
  CONSTRAINT `fk_order_detail_pid` FOREIGN KEY (`pid`) REFERENCES `dt_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dt_order_detail
-- ----------------------------
INSERT INTO `dt_order_detail` VALUES ('1', 'MI15390147', '1', '1', '800');
INSERT INTO `dt_order_detail` VALUES ('2', 'MI15390147', '3', '1', '1000');
INSERT INTO `dt_order_detail` VALUES ('3', 'MI15390148', '3', '1', '1000');
INSERT INTO `dt_order_detail` VALUES ('4', 'MI15390148', '4', '2', '455');
INSERT INTO `dt_order_detail` VALUES ('10', 'MI52134614', '12', '1', '2999');
INSERT INTO `dt_order_detail` VALUES ('11', 'MI33128036', '1', '2', '800');

-- ----------------------------
-- Table structure for dt_product
-- ----------------------------
DROP TABLE IF EXISTS `dt_product`;
CREATE TABLE `dt_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cid` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `brief` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale` int NOT NULL,
  `rate` int NOT NULL,
  `bannerImgs` text,
  `otherImgs` text,
  PRIMARY KEY (`id`),
  KEY `fk_cid` (`cid`),
  CONSTRAINT `fk_cid` FOREIGN KEY (`cid`) REFERENCES `dt_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dt_product
-- ----------------------------
INSERT INTO `dt_product` VALUES ('1', '17', '小米电视4A 55英寸', '/images/product/01.png', '极致超窄边框，4K超高清，蓝牙语音遥控，人工智能操作系统', '800.00', '1', '1', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('2', '17', '小米电视4C 32英寸', '/images/product/02.png', '卧室推荐，人工智能系统', '599.00', '245', '2887', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('3', '17', '小米电视4A 60英寸', '/images/product/03.png', '4K HDR 超高清/ 人工智能语音 / 2G+8G大存储', '1899.00', '65', '688', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('4', '17', '小米电视4C 43英寸', '/images/product/04.png', '人工智能，钢琴烤漆，杜比音效，杜比音效，海量片源', '999.00', '1000', '2738', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('5', '17', '小米电视4A 70英寸', '/images/product/05.png', '人工智能语音系统，4K HDR，内置小爱同学，海量片源', '2999.00', '666', '2912', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('6', '17', '小米全面屏电视55英寸 E55X', '/images/product/06.png', '全面屏，内置小爱同学，64位四核处理器，海量内容，大存储空间', '1599.00', '46', '2319', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('7', '17', 'Redmi 智能电视 X65', '/images/product/07.png', '全金属边框，全面屏97%高屏占比，4K高清，MEMC运动补偿', '2999.00', '4', '2399', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('8', '17', '小米电视4A 50英寸', '/images/product/08.png', '4KHDR，人工智能语音遥控，海量片源，2G+8G大存储', '1399.00', '523', '226', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('9', '17', '小米全面屏电视65英寸 E65C', '/images/product/09.png', '全面屏高屏占比，4K HDR，内置小爱同学，大存储空间', '2499.00', '224', '1340', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('10', '17', '小米全面屏电视43英寸 E43K', '/images/product/10.png', '全面屏，全高清分辨率，海量内容，1G+8G大存储空间', '977.00', '27', '333', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('11', '17', 'Redmi 智能电视 X50', '/images/product/11.png', '金属全面屏,MEMC运动补偿，远场语音+AI0T控制，超高清', '1799.00', '795', '29', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('12', '17', 'Redmi 红米电视 70英寸  R70A', '/images/product/12.png', '70英寸巨屏,4K HDR , 2GB+16GB大存储', '2999.00', '88', '1725', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('13', '17', '小米电视4A 65英寸', '/images/product/13.png', '极致超窄边框，4K超高清，HDR，蓝牙语音遥控，海量片源', '2499.00', '676', '2667', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('14', '17', '小米全面屏电视E32C', '/images/product/14.png', '智能家居控制中心，PatchWall，海量内容，DTS解码', '699.00', '1232', '1099', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('15', '17', '小米全面屏电视 43英寸PRO E43S', '/images/product/15.png', '全面屏设计，内置小爱同学，4K超高清画质，支持8K视频内容', '1499.00', '976', '917', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('16', '17', '小米全面屏电视43英寸 E43X', '/images/product/16.png', '全面屏高屏占比，内置小爱同学，海量内容满足全家人需求', '1099.00', '576', '432', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');

-- ----------------------------
-- Table structure for dt_user
-- ----------------------------
DROP TABLE IF EXISTS `dt_user`;
CREATE TABLE `dt_user` (
  `openid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dt_user
-- ----------------------------
INSERT INTO `dt_user` VALUES ('ol4mZ5V8WIJq-IPiVoL-ErgSqLCs', '/images/user/upload_2d9c6d2406d132ab2f003b3e539fff95.png', '二师兄');
INSERT INTO `dt_user` VALUES ('oU4Rt5eQ9UPnYEoBH5JY75dqgeHM', '', '');

-- ----------------------------
-- View structure for v_order_address_product
-- ----------------------------
DROP VIEW IF EXISTS `v_order_address_product`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_order_address_product` AS select `dt_order`.`id` AS `order_id`,`dt_order`.`address_id` AS `address_id`,`dt_order`.`account` AS `account`,`dt_order`.`is_pay` AS `is_pay`,`dt_order`.`order_time` AS `order_time`,`dt_order`.`openid` AS `openid`,`dt_address`.`receive_name` AS `receive_name`,`dt_address`.`receive_phone` AS `receive_phone`,`dt_address`.`receive_region` AS `receive_region`,`dt_address`.`receive_detail` AS `receive_detail`,`dt_address`.`is_default` AS `is_default`,`dt_order_detail`.`price` AS `price`,`dt_order_detail`.`count` AS `count`,`dt_order_detail`.`pid` AS `pid`,`dt_product`.`name` AS `name`,`dt_product`.`avatar` AS `avatar`,`dt_product`.`brief` AS `brief` from (((`dt_order` join `dt_address` on((`dt_order`.`address_id` = `dt_address`.`id`))) join `dt_order_detail` on((`dt_order_detail`.`order_id` = `dt_order`.`id`))) join `dt_product` on((`dt_order_detail`.`pid` = `dt_product`.`id`))) ;

-- ----------------------------
-- Procedure structure for p_addProductToCart
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_addProductToCart`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_addProductToCart`(
	_openid varchar(100),
	_pid int,
	_count int,
	_price int
)
BEGIN
  DECLARE _curCount INT DEFAULT NULL;
	SELECT `count` INTO _curCount FROM `dt_cart` WHERE `pid` = _pid AND `openid` = _openid;
	
	IF _curCount IS NULL THEN	-- 如果没有在购物车中存在
		IF _count > 5 THEN
			SELECT '单个商品购买上限为5个' AS 'result';
		ELSE 
			INSERT `dt_cart`(`openid`,`pid`,`count`,`price`) 
			VALUES(_openid, _pid, _count, _price);
			SELECT '' AS 'result';
		END IF;
	ELSE 											-- 如果已经在购物车中存在
		IF _curCount + _count > 5 THEN
			SELECT '单个商品购买上限为5个' AS 'result';
		ELSE
			UPDATE `dt_cart` SET `count` = `count` + _count 
			WHERE `pid` = _pid AND `openid` = _openid;
			SELECT '' AS 'result';
		END IF;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for p_getProduct
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_getProduct`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_getProduct`(
	_name VARCHAR(20),
	_cid INT,
	_orderCol VARCHAR(20),
	_orderDir VARCHAR(10),
  _begin INT,
  _pageSize INT
)
BEGIN
	SET @whereSql = 'where 1 = 1';
	
	IF _name != '' THEN 
		SET @whereSql = CONCAT(@whereSql, ' AND `name` LIKE ''%', _name, '%''');
	ELSEIF _cid != 0 THEN
		SET @whereSql = CONCAT(@whereSql, ' AND `cid` = ', _cid);
	END IF;

-- 	SET @selectSql = 'SELECT * FROM `dt_product` ';
	SET @selectSql = CONCAT(
		'SELECT * FROM `dt_product` ', 
		@whereSql, 
		' ORDER BY ', _orderCol, ' ', _orderDir,
		' LIMIT ', _begin, ',', _pageSize
	);

	PREPARE selectStmt FROM @selectSql;
	EXECUTE selectStmt;
	DEALLOCATE PREPARE selectStmt;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for p_login
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_login`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_login`(
	_openid VARCHAR(100)
)
BEGIN
	DECLARE num int;
	SELECT COUNT(*) INTO num FROM `dt_user` WHERE `openid` = _openid;
	IF num = 0 THEN
		INSERT `dt_user`(`openid`) values (_openid);
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for p_orderConfirm
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_orderConfirm`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_orderConfirm`(
	_ids varchar(50),						-- 要结算的购物记录id
	_account int,								-- 结算的总金额
	_order_time varchar(30),	    -- 订单产生时间
	_openid varchar(100),				-- 用户名
	_address_id int             -- 订单地址id
)
BEGIN
	DECLARE _pid INT;
	DECLARE _count INT;
  DECLARE _price INT;
	DECLARE _id varchar(10) DEFAULT '';
	-- 0. 生成一个随机的有效的课单编号id
	DECLARE _order_id varchar(10);
  SET _order_id = CONCAT('MI', CONVERT(FLOOR(RAND() * 100000000),CHAR));
	
	-- 1. 向dt_order表插入数据
	INSERT `dt_order`(`id`,`openid`,`account`,`order_time`,`address_id`) 
	VALUES (_order_id,_openid,_account,_order_time,_address_id);
	
	SET _id = substring_index(_ids, ',', 1);
	WHILE LENGTH(_id) > 0 DO
			-- 2. 向dt_order_detail表插入数据
			SELECT `pid`,`count`,`price` INTO _pid,_count,_price FROM `dt_cart` WHERE `id` = CONVERT(_id, SIGNED);
			INSERT `dt_order_detail`(`order_id`,`pid`,`count`,`price`) VALUES (_order_id,_pid,_count,_price);
			-- 3. 删除dt_cart表的相关数据
			DELETE FROM `dt_cart` WHERE `id` = CONVERT(_id, SIGNED);
			SET _ids = substring(_ids, length(_id) + 2);
			SET _id = substring_index(_ids, ',', 1);
	END WHILE;
	SELECT _order_id as 'order_id';
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for p_removeAddress
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_removeAddress`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_removeAddress`(
	_id INT
)
BEGIN
	DECLARE temp INT DEFAULT 0;
	DECLARE result varchar(50) DEFAULT '';
	-- 统计出有没有其它分类依赖于当前要删除的分类
	SELECT COUNT(*) INTO temp FROM `dt_order` WHERE `address_id` = _id;
	IF temp > 0 THEN
		SET result = '有订单与要删除的地址相关，无法删除..';
	ELSE 
		DELETE FROM `dt_address` WHERE `id` = _id;
	END IF;
	SELECT result;
END
;;
DELIMITER ;
