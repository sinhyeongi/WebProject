# WebProject

<table>
  <caption>개발 계획</caption>
  <tr>
    <th></th> <th>1 / 23</th><th>1 / 24</th><th>1 / 25</th><th>1 / 26</th><th>1 / 27</th><th>1 / 28</th>
  </tr>
  <tr>
    <td>주제 선정</td><td>----></td><td></td><td></td><td></td><td></td><td></td>
  </tr>
  <tr>
    <td>프로젝트 개발</td><td></td><td><----</td><td>-----</td><td>-----</td><td>----></td><td></td>
  </tr>
</table>
<h2>1.주제</h2>  
<pre>
  <code>
                                    주제 : 미니 게임 모음
  </code>
</pre>
<h2>2.개발내용</h2>

> 1.html
> > 1. 태그에 대한 css는 head 부분에 링크 되어있다.
> > 2. 게임에 관한 처리는 script에서 진행 하며 스크립트는 외부 파일로 존재한다.
> > 3. 총 5개의 main태그와 내부에 form태그가 존재 한다.
> > 4. main태그 내부 form태그에 콘텐츠 틀 만 존재 한다.
> > 5. 가장 위에 있는 main태그만 보여지면 다른 main태그는 display : none 상태 이다.
> 2. css
>  > 1. input[type=number]의 -webkit-appearance: none 으로 변경
>  > 2. main, td, main:nth-child(2) > form > div > button 에 hover 이벤트가 존재 한다.
>  > 3. input[type=number]의 focus이벤트 존재 백그라운드 색상과 글자 색상 변경
>  > 4. 
> 3. JavaScript
> > 1. 
> > 2. 
> 4. 게임
> > 1. 1 to n
> > > 1 ~ 유저의 입력 값까지의 데이터가 존재하며 1번 부터 순서대로 해당 버튼 클릭 시 해당 버튼이 사라지며
> > > 입력 값의 해당하는 버튼(유저의 입력) 클릭시 게임 종료 및 플레이 시간(초 단위) 출력
> > 2. Up & Down (1 ~ 100)
> > > 숫자 입력 후 정답 입력 버튼 클릭 시 랜덤 값 ( 1 ~ 100) 의 값과 같은지 확인 하며
> > > 랜덤 값이 더 클 경우 (입력값)보다 큽니다! 출력
> > > 랜덤 값이 더 작을 경우 (입력값)보다 작습니다! 출력
> > > 랜던 값과 입력 값이 같을 경우 정답! 과 다시하기 버튼을 생성하여 보여주며 다시하기 버튼 클릭 시 게임 다시 진행
> > 3. 미정
> > > 
