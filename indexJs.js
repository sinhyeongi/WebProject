class listGame {
  //생성자
  constructor() {
    //전체 form
    this.forms = [...document.querySelectorAll('main')];
    //1to n의 테이블
    this.table = document.querySelector('main > form > table');
    //갯수 저장 버튼
    this.btn = document.querySelector('main > form > div > button');
    this.itemCount = document.querySelector('.btn > input[type=number]');
    this.spans = [...document.querySelectorAll('span')];
    //백그라운드 변경
    this.body = document.querySelector('body');
    //커서 이미 경로 변수 (50px, 50px 모두 동일)
    this.cursorImg = ["./img/mouse.png","./img/mouse_revers270.png","./img/mouse_revers180.png","./img/mouse_revers90.png","./img/mouseend1.png","./img/mouseend2.png"];
    //커서 이미지 변수 인덱스
    this.cursorIdx = 0;
    this.cursorinterval = setInterval(() => {
      this.body.style.cursor = `url(${this.cursorImg[this.cursorIdx++]}) 25 25, auto`
      if(this.cursorIdx >= this.cursorImg.length){
        this.cursorIdx = 0;
      }
    }, 800);
    //이미지 경로 저장 변수
    this.backImgs = ["./img/nbb.png", "./img/back03.png", "./img/back3.png", "./img/home_b.png"];
    //모든 버튼이 form 안에 존재 submit으로 인한 페이지 새로 고침 방지
    [...document.querySelectorAll('button')].forEach(n => {
      n.addEventListener('click', (e) => {
        e.preventDefault();
      });
    });
    // 현재 눌러야 할 번호에 대한 변수
    this.count = 1;
    // 유저가 입력한 번호에 대한 변수
    this.max = 1;
    this.addEvent();
    //시간 초 단위
    this.playtime = 0;
    //플레이타임 인터벌 저장 변수
    this.play = null;
    // Up& down 게임 변수
    this.updownNumber = 0;
    this.updownBtn = null;
    this.updownBtnValue = null;
    this.updowntext = null;
    this.updowninit();
    this.playlist();
    this.updowncount = 0;
    //canvas
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    this.backgroundImg = new Image();
    this.backgroundImg.src = './img/background1.png';
    this.playImg = new Image();
    this.playImg.src = './img/bug.png';
    this.ball = new Image();
    this.ball.src = "./img/minigame_1.png"
    this.movegameplay = null;
    this.movegameplaying = false;
    this.movegamereset = document.querySelector('.reset');
    this.movegamCount = 0;
    //플레이 시간 기록 변수
    this.movegamePlayTime = 0;
    //플레이 시간 기록 interval 
    this.movegamePlayTimer = null;
    //공피하기 다시하기 버튼 이벤트
    this.movegamereset.addEventListener('click', (e) => {
      e.preventDefault();
      this.movegamCount = 0;
      this.movegamePlayTime = 0;
      this.movegamePlayTimer = setInterval(() => {
        if (this.movegameplaying)
          this.movegamePlayTime += 100;
      }, 100);
      this.canvas.style.display = "block";
      this.player.x = (this.canvas.width / 2) - 25,
      this.player.y = (this.canvas.width / 2) - 25,
      this.player.life = 3;
      this.CreateBullet();
      this.DrawCanvas();
      this.spans[this.spans.length-1].innerHTML = "남은 목숨 : 3"
      //초기 위치를 그리고 난 후 5초 뒤 게임 시작
      setTimeout(() => {
        this.movegameplay = setInterval(() => {
          if (!this.movegameplaying) { return; }
          this.backx++;
          if (this.backx > this.canvas.width) {
            this.backx = 0;
          }
          this.BulletMove();
          this.CheckBullet();
          this.moveplayer();
          this.DrawCanvas();
        }, 10);
      }, 2000);
    });
    //플레이어 이동 방향
    this.move = {
      87: false,//w
      83: false,//s
      65: false,//a
      68: false //d
    }
    //플레이어 좌표,사이즈,충돌 값
    this.player = {
      x: (this.canvas.width / 2) - 25,
      y: (this.canvas.height / 2) - 25,
      life: 3,
      size: 50,
      hit: false,
      speed : 3
    };
    //움직이는듯한 이미지를 위한 x좌표값
    this.backx = 0;
    //공피하기 게임을 위한 키 이벤트
    window.addEventListener('keydown', (e) => {
      this.move[e.keyCode] = true ?? '';
    });
    window.addEventListener('keyup', (e) => {
      this.move[e.keyCode] = false ?? '';
    });
    this.bullets = [];
    this.bulletcount = 20;
    this.CreateBullet();
    //캔버스에다시 그리는 interval

    //플레이어 시간 기록 interval
    this.movegamePlayTimer = setInterval(() => {
      if (this.movegameplaying)
        this.movegamePlayTime += 100;
    }, 100);
    this.movegameplay = setInterval(() => {
      //현재 공피하기 게임 중인지 확인
      if (!this.movegameplaying) { return; }
      this.backx++;
      //움직이는 듯한 이미지를 위한 값 변경
      if (this.backx > this.canvas.width) {
        this.backx = 0;
      }
      this.BulletMove();
      this.CheckBullet();
      this.moveplayer();
      this.DrawCanvas();
    }, 10);
  }
  //공 생성
  CreateBullet() {
    //x 는 캔버스의 마지막 장소
    //y 는 0 ~ 캔버스 마지막 0 ~ 보여질수있는 장소 끝 까지의 랜덤값
    this.player.hit = false;
    this.bullets = [];
    for (let i = 0; i < this.bulletcount; i++) {
      const d = {
        x: this.canvas.width,
        y: 0,
        size: 50,
        hit: false
      }
      d.y = (Math.random() * (this.canvas.height - d.size));
      this.bullets.push(d);
    }

  }
  //공과 플레이어 충돌 확인
  //충돌시 라이프를 1감소시키며 라이프가 0 이라면 게임을 종료 시킨다
  CheckBullet() {
    this.bullets.forEach(n => {
      //충돌 검사
      if ((!this.player.hit)&&this.player.x + this.player.size > n.x &&
        this.player.x < n.x + n.size &&
        this.player.y + this.player.size > n.y &&
        this.player.y < n.y) {
          //this.player.hit -> 플레이어가 공과 이미 충돌 한 상태 true -> 충돌 한 후 , false -> 충돌 전
        this.player.life--;
        this.spans[this.spans.length-1].innerHTML = `남은 목숨 : ${this.player.life}`;
        this.player.hit = true;
        //유저의 남은 라이프 확인
        if (this.player.life <= 0) {
          clearInterval(this.movegameplay);
          clearInterval(this.movegamePlayTimer);
          this.spans[this.spans.length-1].innerHTML = "GameOver"
          this.canvas.style.display = "none";
          this.forms[2].querySelectorAll('div')[2].innerHTML = `<h2>${this.movegamePlayTime / 1000}초 생존 피한 총알 갯수 : ${this.movegamCount}</h2>`;
          const data = {
            playTime: this.movegamePlayTime / 1000,
            max: this.movegamCount
          }
          this.save("canvas", data);
          this.playlist();
          return false;
        }
        this.movegamCount--;
      }
    });
  }
  //공 움직임 처리
  //첫번째 공이 화면 좌측으로 사라질경우 공을 다시 만들고 빠져나간다
  //호출시 전체 공의 x좌표를 1감소 시킨다
  BulletMove() {
    //처음으로 만들어진 공만 체크 함 첫 공이 -공사이즈 도달 전에는 다시 안만들어짐
    if (this.bullets[0].x <= (this.bullets[0].size * -1)) {
      this.movegamCount++;
      this.CreateBullet();
      return;
    }
    //공의 위치가 -사이즈 값이 아니라면 전체 공의 x좌표 + 1
    this.bullets.forEach(n => {
      n.x -= 1;
    })
  }
  //갯수 저장 버튼 이벤트
  addEvent() {
    this.btn.addEventListener("click", (e) => {
      //form 이벤트 막기
      e.preventDefault();
      // 입력 값이 0 보다 작거나 없으면 돌아기기
      if (this.itemCount.value <= 0 || !this.itemCount.value) { return; }
      else if (this.itemCount.value > 1000) {
        this.itemCount.value = '';
        alert('1 ~ 1000까지만 입력해주세요!')
        return;
      }
      this.count = this.itemCount.value;
      this.max = parseInt(this.count);
      this.table.innerHTML = '';
      this.itemCount.value = "";
      this.spans[0].innerHTML += '1';
      this.CreateTable();
      this.table.classList.add('on');
      this.playGame();
    });
    //폼 안에있는 다음,이전 버튼 클릭 이벤트 추가
    this.forms.forEach((n, idx) => {
      //다음 버튼 클릭 이벤트
      n.querySelector('.next').addEventListener('click', () => {
        let cidx = idx;
        n.style.display = 'none';
        //자신의 뒤에 폼이 있느지 체크 없다면 인덱스 변경
        if (cidx == this.forms.length - 1) {
          cidx = -1;
        }
        this.forms[cidx + 1].style.display = 'block';
        this.movegameplaying = false;
        if (cidx + 1 == 2) {
          this.movegameplaying = true;
        }
        this.ChangeBackground(cidx+1);
      })
      //이전 버튼 클릭 이벤트
      n.querySelector('.before').addEventListener('click', () => {
        n.style.display = 'none';
        let cidx = idx;
        //자신의 앞에 폼이 있느지 체크 없다면 인덱스 변경
        if (cidx == 0) {
          cidx = this.forms.length;
        }
        this.forms[cidx - 1].style.display = 'block';
        this.movegameplaying = false;
        if (cidx - 1 == 2) {
          this.movegameplaying = true;
        }
        this.ChangeBackground(cidx-1);
      })
    });
  }
  //body백그라운 변경
  ChangeBackground(idx){
    this.body.style.background = `url(${this.backImgs[idx]})`;
    this.body.style.backgroundSize = "cover";
  }
  //테이블 생성
  CreateTable() {
    //입력 값이 0이하 이면 나가기
    if (this.count <= 0) { return; }
    // this.count -> 1to n 의 input 값
    // trcount -> 몇 줄을 만들 것이지 계산
    const trcount = parseInt(this.count / 10) + 1;
    let copyCount = parseInt(this.count);
    let number = 1;
    for (let i = 0; i < trcount; i++) {
      const tr = document.createElement('tr');
      let td = 10;
      if (td > copyCount) {
        td = copyCount;
      }
      for (let i2 = 0; i2 < td; i2++) {
        const td = document.createElement('td');
        td.innerHTML = number++;
        //td클릭 이벤트 추가
        td.addEventListener('click', () => {
          if (td.innerHTML == this.count) {
            this.count++;
            this.spans[0].innerHTML = `현재 타겟 : ${this.count}`;
            tr.removeChild(td)
            //유저의 입력 값에 해당하는 값이라면 종료
            if (this.max < this.count) {
              clearInterval(this.play);
              this.table.innerHTML = `<h2>게임종료<h2> playTime : ${this.playtime / 1000}초`
              this.spans[0].innerHTML = "현재 타겟 :";
              this.table.classList.remove('on');
              const data = this.getSaveData(this.max);
              // 1 ~ max 까지의 값이 더 크거나 더 빠른 겨우에만 데이터를 저장
              if (((this.load("1to")?.max ?? 0) < data.max) || (data.max == this.load("1to").max && this.load("1to").playTime > data.playTime)) {
                this.save("1to", data);
                this.playlist();
              }
            }
          }
        });
        tr.appendChild(td);
      }
      copyCount -= 10;
      this.table.appendChild(tr);
    }
    this.count = 1;
    this.ChangeNumber();
  }
  //값 교환
  ChangeNumber() {
    //1 to n 게임의 테이블 안에 있는 td가져오기
    const tds = [...this.table.querySelectorAll('td')];
    tds.forEach((n) => {
      const copy = n.innerHTML;
      const target = tds[parseInt(Math.random() * tds.length)];
      n.innerHTML = target.innerHTML;
      target.innerHTML = copy;
    });
  }
  //플레이 타임 기록 Intrval 0.1초 단위
  playGame() {
    this.playtime = 0;
    this.play = setInterval(() => {
      this.playtime += 100;
    }, 100);
  }
  //UP & Down
  //랜덤 정답 값 생성
  CreateNumber() {
    this.updownNumber = parseInt(Math.random() * 100) + 1;
  }
  //Up & Down게임 세팅
  updowninit() {
    //시도 횟수 -> this.updowncount
    this.updowncount = 0;
    this.CreateNumber();
    this.updownBtn = this.forms[1].querySelector('div > button');
    this.updownBtnValue = this.forms[1].querySelector('div > input[type=number]');
    this.updowntext = this.forms[1].querySelector('.updownnumber');
    //정답 입력 버튼 이벤트
    this.updownBtn.addEventListener('click', (e) => {
      //플레이타임 기록 시작
      if (this.updowncount == 0)
        this.playGame();
      //시도 횟수 증가
      this.updowncount++;
      this.spans[1].innerHTML = `현재 시도 횟 수 : ${this.updowncount}`;
      // 정답 입력 란 이 빈 경우 나가기
      if (!this.updownBtnValue.value) {
        return;
      } else if (this.updownBtnValue.value <= 0 || this.updownBtnValue.value > 100) {
        // 입력 값이 있지만 0 이하 이거나 100초과의 값의 경우 출력
        this.updowntext.style.fontSize = '2em'
        this.updowntext.innerHTML = '1 ~ 100의 숫자중 입력해주세요';
        return;
      }
      this.updowntext.style.fontSize = '2em'
      //만든 랜덤 값과 현재 입력 한 값이 같을경우
      if (this.updownBtnValue.value == this.updownNumber) {
        this.spans[1].innerHTML = `정답 !`;
        //정답 입력 버튼 클릭 막기
        e.target.disabled = true;
        clearInterval(this.play);
        this.updowntext.innerHTML = `<h2>정답!</h2><h2>걸린 시간 : ${this.playtime / 1000}</h2><h2>시도 횟수 : ${this.updowncount}</h2>`;
        //다시하기 버튼 생성
        const ubtn = document.createElement('button');
        ubtn.innerHTML = '다시 하기';
        //다시 하기 버튼 이벤트
        ubtn.addEventListener('click', n2 => {
          n2.preventDefault();
          e.target.disabled = false;
          this.updownBtnValue.value = '';
          this.updowntext.innerHTML = '??';
          this.updowntext.style.fontSize = '12em'
          this.spans[1].innerHTML = `현재 시도 횟 수 :`;
          this.updowninit();
        });
        //다시하기 버튼 추가
        this.updowntext.appendChild(ubtn);
        const data = this.getSaveData(this.updowncount);
        this.save("updown", data);
        this.playlist();
        return;
      }
      this.updowntext.innerHTML = this.updownBtnValue.value > this.updownNumber ? `${this.updownBtnValue.value}보다 작습니다!` : `${this.updownBtnValue.value}보다 큽니다!`
    });
  }
  //localStorage 에 저장하기위해 max만 받아 저장 데이터 리턴 ** 공피하기에서는 사용 X **
  getSaveData(max) {
    const data = {
      playTime: this.playtime / 1000,
      max: max
    }
    return data;
  }
  //플레이기록 업데이트
  playlist() {
    let tables = this.forms[this.forms.length - 1].querySelectorAll('table');
    tables.forEach((n, idx) => {
      let key = null;
      switch (idx) {
        case 0:
          key = "1to";
          break;
        case 1:
          key = "updown";
          break;
        case 2:
          key = "canvas";
          break;
      }
      const tds = [...n.querySelectorAll('td')];
      let data = this.load(key);
      tds[2].innerHTML = (data?.playTime ?? '0') + " 초";
      tds[tds.length - 1].innerHTML = (data?.max ?? '0');
    });
  }
  //캔버스에 그리기
  DrawCanvas() {
    if (!this.movegameplaying) { return; }
    this.context.beginPath();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.backgroundImg, this.backx, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.backgroundImg, this.backx - this.canvas.width, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.playImg, this.player.x, this.player.y, this.player.size, this.player.size);
    this.bullets?.forEach(n => {
      this.context.drawImage(this.ball, n.x, n.y, n.size, n.size);
    })
    this.context.fill();
    this.context.closePath();
  }
  //플레이어 위치변경
  moveplayer() {
    if (!this.movegameplaying) { return; }
    this.move['87'] && this.player.y > 0 ? (this.player.y -= this.player.speed) : '';
    this.move['83'] && this.player.y < this.canvas.height - this.player.size ? (this.player.y += this.player.speed) : '';
    this.move['65'] && this.player.x > 0 ? (this.player.x -= this.player.speed) : '';
    this.move['68'] && this.player.x < this.canvas.width - this.player.size ? (this.player.x += this.player.speed) : '';
  }
  //localStorage에 데이터 저장
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  //localStorage에 데이터 로드
  load(key) {
    let data = JSON.parse(localStorage.getItem(key));
    return data;
  }
}


new listGame();