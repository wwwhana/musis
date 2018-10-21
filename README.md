# musis

Nodejs + express + aubio 기반 음원 분석 테스트 프로그램

## 테스트 환경 :
 * ubuntu server 18.04
 * nodejs : 8.10
 * mariadb : 10.2

## API

### 분석 API

| POST : /analyze               |
| ----------------------------- |
| Type : multipart/form-data    |
| title            :  곡 제목   |
| artist          : 아티스트 명 |
| music_file : 음원 파일 (mp3)  |

### 전체 자료 API

| GET : /data               |
| ----------------------------- |
