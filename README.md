# youtube-db-clone

## [DB diagrams](./diagrams)

![DB diagrams](/diagrams/db.png)

## [Queries](./queries)

<br>
<br>

## Function specification

| index | 구분                 | 소구분        |
| ----- | -------------------- | ------------- |
| A1    | 계정                 | 계정 만들기   |
| A2    | 계정 수정하기        |
| A3    | 계정 삭제하기        |
| A4    | 계정 정보 보기       |
| A5    | 로그인               |
| C1    | 채널                 | 채널 만들기   |
| C2    | 채널 정보 수정하기   |
| C3    | 채널 삭제하기        |
| C4    | 채널 정보 보기       |
| C5    | 구독하기             |
| C6    | 구독횟수반환         |
| C7    | 구독취소하기         |
| V1    | 동영상               | 동영상 올리기 |
| V2    | 동영상 수정하기      |
| V3    | 동영상 삭제하기      |
| V4    | 동영상 보기          |
| V5    | 관련 동영상 보여주기 |
| V6    | 댓글 쓰기            |
| V7    | 좋아요누르기         |
| V8    | 싫어요누르기         |
| V9    | 태그 달기            |
| V10   | 태그 보기            |
| V11   | 태그 지우기          |
| V12   | 태그된 동영상 보기   |
| Cm1   | 댓글                 | 답글 쓰기     |
| Cm2   | 댓글 수정하기        |
| Cm3   | 댓글 삭제하기        |
| Cm4   | 댓글 보기            |
| Cm5   | 좋아요 누르기        |
| Cm6   | 싫어요 누르기        |
| Cp1   | 커뮤니티 게시글      | 게시글 올리기 |
| Cp2   | 게시글 수정하기      |
| Cp3   | 게시글 삭제하기      |
| Cp4   | 게시글 보기          |
| Cp5   | 댓글 쓰기            |
| Cp6   | 좋아요 누르기        |
| Cp7   | 싫어요 누르기        |
| Cp8   | 태그 달기            |
| Cp9   | 태그 보기            |
| Cp10  | 태그 지우기          |

<br>
<br>

## Api specification

| index | 구분            | Method                           | URL                          | 설명                                                                        | required data                                                               | 비고                                |
| ----- | --------------- | -------------------------------- | ---------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------- |
| A1    | 계정            | post                             | /accounts                    | 계정 만들기                                                                 | { email?, phone?, password, first_name, last_name}                          | email, phone 둘중 하나는 있어야 함. |
| A2    | put             | /accounts/{account_id}           | 계정 수정하기                | headers: { Authorization: <token> }<br>{ password, first_name, last_name }  |                                                                             |
| A3    | delete          | /accounts/{account_id}           | 계정 삭제하기                | headers: { Authorization: <token> }                                         |                                                                             |
| A4    | get             | /accounts/{account_id}           | 계정 정보 보기               |                                                                             |                                                                             |
| A5    | get             | /get-token                       | 로그인                       | headers: { Authorization: <token> }<br>{ email?, phone?, password}          | email, phone 둘중 하나는 있어야 함.                                         |
| C1    | 채널            | post                             | /channels                    | 채널 만들기                                                                 | headers: { Authorization: <token> }<br>{ name, descriptions }               |                                     |
| C2    | put             | /channels/{channel_id}           | 채널 정보 수정하기           | headers: { Authorization: <token> }<br>{ name, descriptions }               |                                                                             |
| C3    | delete          | /channels/{channel_id}           | 채널 삭제하기                | headers: { Authorization: <token> }                                         |                                                                             |
| C4    | get             | /channels/{channel_id}           | 채널 정보 보기               |                                                                             |                                                                             |
| C5    | post            | /channels/subscribe              | 구독하기                     | headers: { Authorization: <token> }<br>{ channel_id }                       |                                                                             |
| C6    | get             | /channels/subscribe/{channel_id} | 구독횟수반환                 |                                                                             |                                                                             |
| C7    | delete          | /channels/subscribe              | 구독취소하기                 | headers: { Authorization: <token> }<br>{ subscriber }                       |                                                                             |
| V1    | 동영상          | post                             | /videos                      | 동영상 올리기                                                               | headers: { Authorization: <token> }<br>{ descriptions, len, thumbnail_url } |                                     |
| V2    | put             | /videos/{video_id}               | 동영상 수정하기              | headers: { Authorization: <token> }<br>{ descriptions, len, thunbnail_url } |                                                                             |
| V3    | delete          | /videos/{video_id}               | 동영상 삭제하기              | headers: { Authorization: <token> }                                         |                                                                             |
| V4    | get             | /videos/{video_id}               | 동영상 보기                  |                                                                             |                                                                             |
| V5    | get             | /videos/relatives/{video_id}     | 관련 동영상 보여주기         |                                                                             |                                                                             |
| V6    | post            | /videos/comments/{video_id}      | 댓글 쓰기                    | headers: { Authorization: <token> }<br>{ contents }                         |                                                                             |
| V7    | post            | /videos/like/{video_id}          | 좋아요누르기                 | headers: { Authorization: <token> }                                         |                                                                             |
| V8    | post            | /videos/hate/{video_id}          | 싫어요누르기                 | headers: { Authorization: <token> }                                         |                                                                             |
| V9    | post            | /videos/tags/{video_id}          | 태그 달기                    | headers: { Authorization: <token> }<br>{ tag_title }                        |                                                                             |
| V10   | get             | /videos/tags/{video_id}          | 태그 보기                    |                                                                             |                                                                             |
| V11   | delete          | /videos/tags/{video_id}          | 태그 지우기                  | headers: { Authorization: <token> }<br>{ tag_title }                        |                                                                             |
| V12   | get             | /tags/videos/{tag_id}            | 태그된 동영상 보기           |                                                                             |                                                                             |
| Cm1   | 댓글            | post                             | /comments/reply/{comment_id} | 답글 쓰기                                                                   | headers: { Authorization: <token> }<br>{ contents }                         |                                     |
| Cm2   | put             | /comments/{comment_id}           | 댓글 수정하기                | headers: { Authorization: <token> }<br>{ contents }                         |                                                                             |
| Cm3   | delete          | /comments/{comment_id}           | 댓글 삭제하기                | headers: { Authorization: <token> }                                         |                                                                             |
| Cm4   | get             | /comments/{comment_id}           | 댓글 보기                    |                                                                             |                                                                             |
| Cm5   | post            | /comments/like/{comment_id}      | 좋아요 누르기                | headers: { Authorization: <token> }                                         |                                                                             |
| Cm6   | post            | /comments/hate/{comment_id}      | 싫어요 누르기                | headers: { Authorization: <token> }                                         |                                                                             |
| Cp1   | 커뮤니티 게시글 | post                             | /posts                       | 게시글 올리기                                                               | headers: { Authorization: <token> }<br>{ contents, img_url }                |                                     |
| Cp2   | put             | /posts/{post_id}                 | 게시글 수정하기              | headers: { Authorization: <token> }<br>{ contents, img_url }                |                                                                             |
| Cp3   | delete          | /posts/{post_id}                 | 게시글 삭제하기              | headers: { Authorization: <token> }                                         |                                                                             |
| Cp4   | get             | /posts/{post_id}                 | 게시글 보기                  |                                                                             |                                                                             |
| Cp5   | post            | /posts/comments/{post_id}        | 댓글 쓰기                    | headers: { Authorization: <token> }<br>{ contents }                         |                                                                             |
| Cp6   | post            | /post/like/{post_id}             | 좋아요 누르기                | headers: { Authorization: <token> }                                         |                                                                             |
| Cp7   | post            | /post/hate/{post_id}             | 싫어요 누르기                | headers: { Authorization: <token> }                                         |                                                                             |
| Cp8   | post            | /post/tags/{post_id}             | 태그 달기                    | headers: { Authorization: <token> }<br>{ tag_title }                        |                                                                             |
| Cp9   | get             | /post/tags/{post_id}             | 태그 보기                    |                                                                             |                                                                             |
| Cp10  | delete          | /post/tags/{post_id}             | 태그 지우기                  | headers: { Authorization: <token> }<br>{ tag_title }                        |
