# # 초안 쿼리문과는 별개로, 개인이 설계한 다이어그램을 업로드해 보겠습니다 :)

1.  Document 테이블과 각 게시판 테이블을 별도로 분리할 예정입니다.
>  각 게시판 테이블은 간단한 게시판 이름, 설정, 카테고리 등의 정보만 담을 예정입니다.
>  DB가 모듈화 되므로, Document (게시글) 구조변경/업데이트시 모든 게시판에 일괄 적용 가능하다는 장점을 가질 수 있을거라고 판단됩니다.

2. Comment 테이블 / Vote 테이블도, 각 게시판 테이블과는 별도로 분리할 예정입니다.
> 유저가 각 게시판에 접근하면, 게시판 SRL을 기반으로 게시글 목록을 쿼리합니다.
> 각 게시글 내부로 접근하면, 게시글 SRL을 기반으로 댓글 목록을 쿼리합니다.

# # DB 요소 설계

### Member 테이블
> 서비스르 이용하는 회원에 대한 정보가 기록되는 테이블 입니다.

- id : Primary Key 로 사용 될 회원별로 부여되는 고유 번호 (로그인 아이디와는 별도로 존재합니다)
- loginid : 로그인 아이디
- passwd : 비밀번호
- nickname : 닉네임
- name : 이름
- gender : 성별
- location : 거주동네 (가입 시 위치기반으로 인식 혹은 직접 입력받습니다) __Location 테이블과 foreign Key 로 연결 필요__
- status : 계정 상태 (Y : 정상, N: 정지회원)
- superuser : 관리자 여부(Y: 관리자, N: 일반회원)
- regdate : 가입 시각

### Location 테이블
> 각 동네의 정보가 저장된 테이블입니다

- id : Primary Key 로 사용 될 동네별로 부여되는 고유 번호
- pid : 상위 지역의 id (예: 서울시 관악구 이 경우, 관악구는 '서울시' 를 pid로 갖습니다)
- name : 동네 이름
- 이 외 동네별 정보를 추가할 수 있겠습니다.

### Document 테이블
> 각 동네별 게시판, 맛집 게시판 등에 작성되는 게시글들이 저장되는 테이블 입니다.
> 공통 요소가 정의되어있으며, 각 게시판에서는 게시판 성격에 따라서 필요 요소를 가공하여 사용합니다.

- id : Primary Key 로 사용 될 게시글별로 부여되는 고유 번호
- category : 게시글 카테고리 (질문,일반...) __Category 테이블과 Foreign Key로 연결__
- location : 어떤 지역의 게시판인지 __Location 테이블과 Foreign Key로 연결__
- title : 게시글 제목
- content : 게시글 컨텐츠
- writer : 작성자 아이디 __Member 테이블과 Foreign Key로 연결__
- status : 게시글 상태 (Y: 정상, N: 블라인드)
- regdate : 작성 시각

### Comment 테이블
> 각 게시글에 작성되는 댓글이 저장되는 테이블 입니다.
> 공통 요소가 정의되어 있으며, 각 게시판에서는 게시판 성격에 따라서 필요 요소를 가공하여 사용합니다.

- id : Primary Key 로 사용 될 댓글별로 부여되는 고유 번호
- pid : 대댓글일 경우, 원댓글의 id를 저장
- doc_id : 어떤 게시글에 대한 댓글인지 __Document 테이블과 Foreign Key로 연결__
- content : 댓글 내용 저장
- writer : 작성자 아이디 __Member 테이블과 Foreign Key로 연결__
- status : 댓글 상태 (Y : 저장, N: 블라인드)
- regdate : 댓글 작성 시각

### File 테이블
> 각 게시글들의 첨부파일 정보가 저장되는 테이블 입니다.
> 공통 요소가 정의되어 있으며, 각 게시글/댓글 성격에 따라서 필요 요소를 가공하여 사용합니다.

- id : Primary Key 로 사용 될 파일 별로 부여되는 고유번호
- doc_id : 어떤 게시글에 대한 파일인지 __Document 테이블과 Foreign Key로 연결__
- com_id : 어떤 댓글에 대한 파일인지 __Comment 테이블과 Foreign Key로 연결__
- name : 첨부파일 제목
- uploader : 업로드 아이디 __Member 테이블과 Foreign Key로 연결__
- regdate : 파일 업로드 시각

### Vote 테이블
> 회원의 추천 비추천 활동에 대한 정보가 기록되는 테이블 입니다.
> 추천 1, 비추천을 -1로 표현합니다.

- id : Primary Key 로 사용 될 추천 로그별로 부여되는 고유번호
- doc_id : 어떤 게시글에 대한 로그인지 __Document 테이블과 Foreign Key로 연결__
- com_id : 어떤 댓글에 대한 로그인지 __Comment 테이블과 Foreign Key로 연결__
- writer : 추천/비추천을 한 사람이 누구인지 __Member 테이블과 Foreign Key로 연결__
- regdate : 추천/비추천을 한 시각
- type : 1(추천) / -1(비추천)

### Report 테이블
> 회원의 신고 활동에 대한 정보가 기록되는 테이블입니다.
> 신고 1, 신고취소 -1로 표현합니다.

- id : Primary Key 로 사용 될 신고 로그별로 부여되는 고유번호
- doc_id : 어떤 게시글에 대한 신고인지 __Document 테이블과 Foreign Key로 연결__
- com_id : 어떤 댓글에 대한 신고인지 __Comment 테이블과 Foreign Key로 연결__
- writer : 신고/신고취소를 한 사람이 누구인지 __Member 테이블과 Foreign Key로 연결__
- regdate : 신고/신고취소를 한 시각
- type : 1(신고) / -1(신고취소)

### Board 테이블
> 각 게시판에 대한 필수 정보가 기록되는 테이블입니다.

- id : Primary Key로 사용 될 게시판별로 부여되는 고유번호
- name : 게시판 이름
- regdate : 게시판 생성 날짜
- settings : JSON형태로 각 게시판에 대한 설정 데이터 저장

## 위 테이블 갯수 및 요소는 개발 진행에 따라 필요시 추가될 수 있습니다.
