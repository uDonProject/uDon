
-- user 테이블 생성
create table userDb(
	userId tinyint unsigned not null auto_increment,
    email varchar(30) not null,
    passWd varchar(30) not null,
    userLocal tinyint unsigned,
    userFavoriteLocal tinyint unsigned, 
    primary key(userId),
    foreign key(userLocal) references Local(localId) on update cascade
   
);


drop table userDb;

insert into userDb (email,passWd,userLocal,userFavoriteLocal) values ("test@gmail.com","testpassWd",1,3);

-- [회원]test 쿼리
select * from userDb;

select userDb.*, Local.* from userDb join Local on userDb.userLocal = Local.localId;

-- 회원 선택 동네 (구 포함)
select userDb.userId, userDb.email, userDb.passWd, Local.localGu, Local.localDong from userDb inner join Local on userDb.userLocal = Local.localId;

-- 회원 선택 좋아하는 동네 (구 포함)
select userDb.userId, userDb.email, userDb.passWd, Local.localGu, Local.localDong from userDb inner join Local on userDb.userFavoriteLocal = Local.localId;



-- 동네 리스트
create table Local(
	localId tinyint unsigned auto_increment,
    localGu varchar(15) not null,
    localDong varchar(15) not null,
    primary key(localId)
       
);

drop table Local;


-- 동네 예시 데이터
insert into Local (localGu, localDong) values("강남구", "논현동");
insert into Local (localGu, localDong) values("마포구", "동교동");
insert into Local (localGu, localDong) values("마포구", "서교동");

select * from Local;



-- 동네 게시판
create table localBoard(
	localBoardNum tinyint unsigned not null auto_increment,
    
    localBoardRegUser tinyint unsigned not null ,
    localBoardlocalNum tinyint unsigned not null ,
    
    localBoardTitle varchar(60) not null,
    localBoardContent varchar(600) not null,
    localBoardDate timestamp not null,
    localBoardView tinyint,
    localBoardLike tinyint,
    primary key(localBoardNum),
    
    foreign key(localBoardRegUser) references userDb(userId) on update cascade,
    foreign key(localBoardlocalNum) references Local(localId) on update cascade
       
);

drop table localBoard;

insert into localBoard(localBoardRegUser, localBoardlocalNum, localBoardTitle, localBoardContent, 
						localBoardDate, localBoardView, localBoardLike)
			values(1,2,"테스트 제목", "테스트 내용","2021-01-01",1,1);
            
select * from localBoard;  

-- 동네별 게시글 불러오기
select * from localBoard where localBoardlocalNum = 2;


-- 사진 게시판
create table userPicture(
	userPictureNum tinyint unsigned not null auto_increment,
    
    userPictureRegUser tinyint unsigned not null,
    userPictureLocal tinyint unsigned  not null,
    
    userPictureLike tinyint,
    primary key(userPictureNum),
    
    foreign key(userPictureRegUser) references userDb(userId) on update cascade,
    foreign key(userPictureLocal) references Local(localId) on update cascade
    
);
    
    
drop table userPicture;


-- 맛집 게시판
create table matStore(
	matStoreNum tinyint unsigned not null auto_increment,
    
    matStoreUser tinyint unsigned not null,
    
    matStoreTitle varchar(30),
    matStroelocalDong tinyint,
    
    primary key(matStoreNum),
    
    foreign key(matStoreUser) references userDb(userId) on update cascade

);


drop table userPicture;


