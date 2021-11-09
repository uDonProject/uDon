-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema udondb
-- -----------------------------------------------------
-- 구조를 변경해 본 UDON DB입니다.
-- 

-- -----------------------------------------------------
-- Schema udondb
--
-- 구조를 변경해 본 UDON DB입니다.
-- 
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `udondb` DEFAULT CHARACTER SET utf8mb4 ;
USE `udondb` ;

-- -----------------------------------------------------
-- Table `udondb`.`Member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `udondb`.`Member` ;

CREATE TABLE IF NOT EXISTS `udondb`.`Member` (
  `id` INT NOT NULL COMMENT 'Primary Key 로 사용 될 회원별로 부여되는 고유 번호 (로그인 아이디와는 별도로 존재합니다)\n',
  `loginid` VARCHAR(45) NOT NULL COMMENT '로그인 아이디',
  `passwd` VARCHAR(256) NOT NULL COMMENT '비밀번호',
  `nickname` VARCHAR(45) NOT NULL COMMENT '닉네임',
  `name` VARCHAR(45) NOT NULL COMMENT '이름',
  `gender` TINYINT NOT NULL COMMENT '성별',
  `location` INT NOT NULL COMMENT '거주동네 (가입 시 위치기반으로 인식 혹은 직접 입력받습니다) Location 테이블과 foreign Key 로 연결 필요',
  `status` TINYINT NOT NULL COMMENT '계정 상태 (1: 정상, 0.  정지회원)\n',
  `superuser` TINYINT NOT NULL COMMENT '관리자 여부(1:관리자, 0:일반회원)',
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '가입시각',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `udondb`.`Location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `udondb`.`Location` ;

CREATE TABLE IF NOT EXISTS `udondb`.`Location` (
  `id` INT NOT NULL COMMENT 'Primary Key 로 사용 될 동네별로 부여되는 고유 번호',
  `pid` INT NULL COMMENT '상위 지역의 id (예: 서울시 관악구 이 경우, 관악구는 \'서울시\' 를 pid로 갖습니다)',
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `udondb`.`Document`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `udondb`.`Document` ;

CREATE TABLE IF NOT EXISTS `udondb`.`Document` (
  `id` INT NOT NULL COMMENT 'Primary Key 로 사용 될 게시글별로 부여되는 고유 번호',
  `location` INT NOT NULL COMMENT '어떤 지역의 게시판인지 Location 테이블과 Foreign Key로 연결',
  `title` VARCHAR(45) NOT NULL COMMENT '게시글 제목',
  `content` TEXT NOT NULL COMMENT '게시글 컨텐츠',
  `writer` INT NOT NULL COMMENT '작성자 아이디 Member 테이블과 Foreign Key로 연결',
  `status` TINYINT NOT NULL COMMENT '게시글 상태(1: 정상, 0: 블라인드)\n',
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성 시각',
  PRIMARY KEY (`id`),
  INDEX `FK_Document_Member_idx` (`writer` ASC) VISIBLE,
  INDEX `FK_Document_Location_idx` (`location` ASC) VISIBLE,
  CONSTRAINT `FK_Document_Member`
    FOREIGN KEY (`writer`)
    REFERENCES `udondb`.`Member` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Document_Location`
    FOREIGN KEY (`location`)
    REFERENCES `udondb`.`Location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `udondb`.`Comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `udondb`.`Comment` ;

CREATE TABLE IF NOT EXISTS `udondb`.`Comment` (
  `id` INT NOT NULL COMMENT 'Primary Key 로 사용 될 댓글별로 부여되는 고유 번호',
  `pid` INT NULL COMMENT '대댓글일 경우, 원댓글의 id를 저장',
  `doc_id` INT NOT NULL COMMENT '어떤 게시글에 대한 댓글인지 Document 테이블과 Foreign Key로 연결',
  `content` TEXT NOT NULL,
  `writer` INT NOT NULL COMMENT '작성자 아이디 Member 테이블과 Foreign Key로 연결',
  `status` TINYINT NOT NULL COMMENT '댓글 상태 (1 : 정상 , 0: 블라인드)',
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `FK_Comment_Document_idx` (`doc_id` ASC) VISIBLE,
  INDEX `FK_Comment_Member_idx` (`writer` ASC) VISIBLE,
  CONSTRAINT `FK_Comment_Document`
    FOREIGN KEY (`doc_id`)
    REFERENCES `udondb`.`Document` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Comment_Member`
    FOREIGN KEY (`writer`)
    REFERENCES `udondb`.`Member` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `udondb`.`File`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `udondb`.`File` ;

CREATE TABLE IF NOT EXISTS `udondb`.`File` (
  `id` INT NOT NULL COMMENT 'Primary Key 로 사용 될 파일 별로 부여되는 고유번호',
  `doc_id` INT NOT NULL COMMENT '어떤 게시글에 대한 파일인지 Document 테이블과 Foreign Key로 연결',
  `com_id` INT NOT NULL COMMENT '어떤 댓글에 대한 파일인지 Comment 테이블과 Foreign Key로 연결',
  `name` VARCHAR(45) NOT NULL COMMENT '첨부파일 제목',
  `uploader` INT NOT NULL COMMENT '업로드 아이디 Member 테이블과 Foreign Key로 연결',
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '파일 업로드 시각',
  PRIMARY KEY (`id`),
  INDEX `FK_File_Member_idx` (`uploader` ASC) VISIBLE,
  INDEX `FK_File_Document_idx` (`doc_id` ASC) VISIBLE,
  INDEX `FK_File_Comment_idx` (`com_id` ASC) VISIBLE,
  CONSTRAINT `FK_File_Member`
    FOREIGN KEY (`uploader`)
    REFERENCES `udondb`.`Member` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_File_Document`
    FOREIGN KEY (`doc_id`)
    REFERENCES `udondb`.`Document` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_File_Comment`
    FOREIGN KEY (`com_id`)
    REFERENCES `udondb`.`Comment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `udondb`.`Vote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `udondb`.`Vote` ;

CREATE TABLE IF NOT EXISTS `udondb`.`Vote` (
  `id` INT NOT NULL COMMENT 'Primary Key 로 사용 될 추천 로그별로 부여되는 고유번호',
  `doc_id` INT NOT NULL COMMENT '어떤 게시글에 대한 로그인지 Document 테이블과 Foreign Key로 연결',
  `com_id` INT NOT NULL COMMENT '어떤 댓글에 대한 로그인지 Comment 테이블과 Foreign Key로 연결',
  `writer` INT NOT NULL COMMENT '추천/비추천을 한 사람이 누구인지 Member 테이블과 Foreign Key로 연결',
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '추천/비추천을 한 시각',
  `type` TINYINT NOT NULL COMMENT '1(추천) / -1(비추천)',
  PRIMARY KEY (`id`),
  INDEX `FK_Vote_Document_idx` (`doc_id` ASC) VISIBLE,
  INDEX `FK_Vote_Comment_idx` (`com_id` ASC) VISIBLE,
  INDEX `FK_Vote_Member_idx` (`writer` ASC) VISIBLE,
  CONSTRAINT `FK_Vote_Document`
    FOREIGN KEY (`doc_id`)
    REFERENCES `udondb`.`Document` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Vote_Comment`
    FOREIGN KEY (`com_id`)
    REFERENCES `udondb`.`Comment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Vote_Member`
    FOREIGN KEY (`writer`)
    REFERENCES `udondb`.`Member` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `udondb`.`Report`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `udondb`.`Report` ;

CREATE TABLE IF NOT EXISTS `udondb`.`Report` (
  `id` INT NOT NULL COMMENT 'Primary Key 로 사용 될 신고 로그별로 부여되는 고유번호',
  `doc_id` INT NOT NULL COMMENT '어떤 게시글에 대한 신고인지 Document 테이블과 Foreign Key로 연결',
  `com_id` INT NOT NULL COMMENT '어떤 댓글에 대한 신고인지 Comment 테이블과 Foreign Key로 연결',
  `writer` INT NOT NULL COMMENT '신고/신고취소를 한 사람이 누구인지 Member 테이블과 Foreign Key로 연결',
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '신고/신고취소를 한 시각',
  `type` TINYINT NOT NULL COMMENT '1(신고) / -1(신고취소)',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `udondb`.`Board`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `udondb`.`Board` ;

CREATE TABLE IF NOT EXISTS `udondb`.`Board` (
  `id` INT NOT NULL COMMENT 'Primary Key로 사용 될 게시판별로 부여되는 고유번호',
  `name` VARCHAR(45) NOT NULL COMMENT '게시판 이름',
  `regdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '게시판 생성 날짜',
  `settings` JSON NOT NULL COMMENT 'JSON형태로 각 게시판에 대한 설정 데이터 저장',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
