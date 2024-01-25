<table>
  <caption>개발 계획</caption>
  <tr>
    <th></th> <th>1 / 23</th><th>1 / 24</th><th>1 / 25</th><th>1 / 26</th><th>1 / 27</th><th>1 / 28</th>
  </tr>
  <tr>
    <td>주제 선정</td><td>-----</td><td>----></td><td></td><td></td><td></td><td></td>
  </tr>
  <tr>
    <td>프로젝트 개발</td><td></td><td><----</td><td>-----</td><td>-----</td><td>----></td><td></td>
  </tr>
</table>
<h2>1.주제</h2>  
<pre>
  <code>
주제 : 미니 게임 모음<br/>
주제 선정 이유 - 지금 까지 공부해 왔던 내용을 다시 사용하여 복습해보며 부족한 점을 발견 하기 위해
  </code>
</pre>
<h2>2.개발내용</h2>

> 1.html
> > 1. 태그에 대한 css는 head 부분에 링크 되어있다.<br/>
> > 2. 게임에 관한 처리는 script에서 진행 하며 스크립트는 외부 파일로 존재한다.<br/>
> > 3. 총 5개의 main태그와 내부에 form태그가 존재 한다.<br/>
> > 4. main태그 내부 form태그에 콘텐츠 틀 만 존재 한다.<br/>
> > 5. 가장 위에 있는 main태그만 보여지면 다른 main태그는 display : none 상태 이다.<br/>
> 2. css
>  > 1. input[type=number]의 -webkit-appearance: none 으로 변경<br/>
>  > 2. main, td, main:nth-child(2) > form > div > button 에 hover 이벤트가 존재 한다.<br/>
>  > 3. input[type=number]의 focus이벤트 존재 백그라운드 색상과 글자 색상 변경<br/>
> 3. JavaScript
> > 1. listGame클래스 하나에 모든 데이터가 들어가있다.
> > 2. form안에 있는 버튼들의 전송되어 페이지가 새로고침 되지 않도록 설정함.
> 4. 게임
> > 1. 1 to n
> > > 1 ~ 유저의 입력 값까지의 데이터가 존재하며 1번 부터 순서대로 해당 버튼 클릭 시 해당 버튼이 사라지며<br/>
> > > 입력 값의 해당하는 버튼(유저의 입력) 클릭시 게임 종료 및 플레이 시간(초 단위) 출력<br/>
> > 2. Up & Down (1 ~ 100)<br/>
> > > 숫자 입력 후 정답 입력 버튼 클릭 시 랜덤 값 ( 1 ~ 100) 의 값과 같은지 확인 하며<br/>
> > > 랜덤 값이 더 클 경우 (입력값)보다 큽니다! 출력<br/>
> > > 랜덤 값이 더 작을 경우 (입력값)보다 작습니다! 출력<br/>
> > > 랜던 값과 입력 값이 같을 경우 정답! 과 다시하기 버튼을 생성하여 보여주며 다시하기 버튼 클릭 시 게임 다시 진행<br/>
> > 3. 공 피하기 (운)
> > > 서쪽 -> 동쪽으로 날아오는 총알을 피하는 게임<br/>
> > > 플레이어는 중앙에서 시작<br/>
> > > 목숨은 3개이며 총알과 충돌시 목숨 -1<br/>
> > > 한번에 나오는 공의 갯수는 총 20개 이다.<br/>
> > > 모두 같은 x의 값으로 한번에 이동한다.<br/>
> > > 충돌한 공과 다시 충돌하여도 목숨을 잃지 않는다.<br/>
> > > 목숨이 0개가 되면 게임이 종료된다<br/>
> > > 목숨이 0개가 되어 게임이 종료 되면 플레이 시간과 피한 공의 갯수를 보여준다.<br/>
> > > 다시하기 버튼을 통해 게임을 다시 플레이 할수있다.<br/>
> > > 랜덤한 위치에 생성이 되어 피할수없는 경우도 존재<br/>
> > 4. 게임 플레이 목록
> > > 게임 플레이 후 정상적으로 게임을 완료 하게 되면 로컬 스토리지에 값을 저장한다<br/>
> > > 현재 페이지에 로컬 스토리지에 저장한 값을 보여준다<br/>
> > > { playTime , max}로 저장 한다.<br/>
> > > playTime -> 게임을 완료하는데 걸린 시간을 0.1초 단위의 값을 저장 하여 가지고 있다.<br/>
> > > max -> 1 to n 이라면 유저의 입력 값이 된다<br/>
> > > max -> Up & Down 이라면 랜던한 정답 값을 맞추기 까지 시도한 횟수 이다.<br/>
> > > max -> 총알을 피한 갯수이다.<br/><br/>
> > > 4-1. key 값
> > > > 1 to n -> 1to<br/>
> > > > Up & Down -> updown<br/>
> > > > 총알피하기 -> canvas<br/>
<hr/>
<img src = "https://private-user-images.githubusercontent.com/106128885/299585192-d637bc5d-2c99-43e9-a48a-049867958ce9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDYxNzA1NDQsIm5iZiI6MTcwNjE3MDI0NCwicGF0aCI6Ii8xMDYxMjg4ODUvMjk5NTg1MTkyLWQ2MzdiYzVkLTJjOTktNDNlOS1hNDhhLTA0OTg2Nzk1OGNlOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMTI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDEyNVQwODEwNDRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wNDFjNmQ0YjEwZDQwYWUyNTcyODMzYTkxN2Y0YjljNmM3NjdlNmYzYTJmZGE3Zjg3M2M3NzE5YTliNmY1ZTk2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.kNNRihtQzRoPBRYza_t2zMCmhn4JhXYR1-Xs2M0A8Xg"/>
