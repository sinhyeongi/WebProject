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
    //백그라운드 변경
    this.body = document.querySelector('body');
    //이미지 경로 저장 변수
    this.backImgs = ["./img/nbb.png", "./img/back03.png", "./img/back3.png", "./img/home_b.png"];
    //모든 버튼이 form 안에 존재 submit으로 인한 페이지 새로 고침 없애기
    [...document.querySelectorAll('button')].forEach(n => {
      n.addEventListener('click', (e) => {
        e.preventDefault();
      });
    });
    // 현재 눌러야 할 번호
    this.count = 1;
    // 유저가 입력한 번호
    this.max = 1;
    this.addEvent();
    //시간 초 
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
    this.movegamePlayTime = 0;
    this.movegamePlayTimer = null;
    this.movegamereset.addEventListener('click', (e) => {
      e.preventDefault();
      this.movegamCount = 0;
      this.movegamePlayTime = 0;
      this.movegamePlayTimer = setInterval(() => {
        if (this.movegameplaying)
          this.movegamePlayTime += 100;
      }, 100);
      this.canvas.style.display = "block";
      this.player = {
        x: (this.canvas.width / 2) - 25,
        y: (this.canvas.height / 2) - 25,
        life: 3,
        size: 50,
        hit: false
      };
      this.CreateBullet();
      this.DrawCanvas();
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

    this.move = {
      87: false,
      83: false,
      65: false,
      68: false
    }
    this.player = {
      x: (this.canvas.width / 2) - 25,
      y: (this.canvas.height / 2) - 25,
      life: 3,
      size: 50,
      hit: false
    };
    this.backx = 0;
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
  }
  //공 생성
  CreateBullet() {
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
      if (this.player.x + this.player.size > n.x &&
        this.player.x < n.x + n.size &&
        this.player.y + this.player.size > n.y &&
        this.player.y < n.y &&
        (!this.player.hit)) {
        console.log('321');
        this.player.life--;
        this.player.hit = true;
        if (this.player.life <= 0) {
          clearInterval(this.movegameplay);
          clearInterval(this.movegamePlayTimer);
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
    if (this.bullets[0].x <= (this.bullets[0].size * -1)) {
      this.movegamCount++;
      this.CreateBullet();
      return;
    }
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
      this.CreateTable();
      this.playGame();
    });
    //다음 버튼 이벤트
    this.forms.forEach((n, idx) => {
      n.querySelector('.next').addEventListener('click', () => {
        let cidx = idx;
        n.style.display = 'none';
        if (cidx == this.forms.length - 1) {
          cidx = -1;
        }
        this.forms[cidx + 1].style.display = 'block';
        this.movegameplaying = false;
        if (cidx + 1 == 2) {
          this.movegameplaying = true;
        }
        this.body.style.background = `url(${this.backImgs[cidx + 1]})`;
        this.body.style.backgroundSize = "cover"
      })
      n.querySelector('.before').addEventListener('click', () => {
        n.style.display = 'none';
        let cidx = idx;
        if (cidx == 0) {
          cidx = this.forms.length;
        }
        this.forms[cidx - 1].style.display = 'block';
        this.movegameplaying = false;
        if (cidx - 1 == 2) {
          this.movegameplaying = true;
        }
        this.body.style.background = `url(${this.backImgs[cidx - 1]})`;
        this.body.style.backgroundSize = "cover"
      })
    });
  }
  //테이블 생성
  CreateTable() {
    if (this.count <= 0) { return; }
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
        td.addEventListener('click', () => {
          if (td.innerHTML == this.count) {
            this.count++;
            tr.removeChild(td)
            if (this.max < this.count) {
              clearInterval(this.play);
              this.table.innerHTML = `<h2>게임종료<h2> playTime : ${this.playtime / 1000}초`
              const data = this.getSaveData(this.max);
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
    const tds = [...this.table.querySelectorAll('td')];
    tds.forEach((n) => {
      const copy = n.innerHTML;
      const target = tds[parseInt(Math.random() * tds.length)];
      n.innerHTML = target.innerHTML;
      target.innerHTML = copy;
    });
  }
  //플레이 타임 기록 Intrval
  playGame() {
    this.playtime = 0;
    this.play = setInterval(() => {
      this.playtime += 100;
    }, 100);
  }
  //UP & Down
  CreateNumber() {
    this.updownNumber = parseInt(Math.random() * 100) + 1;
  }
  //Up & Down게임 세팅
  updowninit() {
    this.updowncount = 0;
    this.CreateNumber();
    this.updownBtn = this.forms[1].querySelector('div > button');
    this.updownBtnValue = this.forms[1].querySelector('div > input[type=number]');
    this.updowntext = this.forms[1].querySelector('.updownnumber');
    this.updownBtn.addEventListener('click', (e) => {
      if (this.updowncount == 0)
        this.playGame();
      this.updowncount++;
      if (!this.updownBtnValue.value) {
        return;
      } else if (this.updownBtnValue.value <= 0 || this.updownBtnValue.value > 100) {
        this.updowntext.style.fontSize = '2em'
        this.updowntext.innerHTML = '1 ~ 100의 숫자중 입력해주세요';
        return;
      }
      this.updowntext.style.fontSize = '2em'
      if (this.updownBtnValue.value == this.updownNumber) {
        e.target.disabled = true;
        clearInterval(this.play);
        this.updowntext.innerHTML = `<h2>정답!</h2><h2>걸린 시간 : ${this.playtime / 1000}</h2><h2>시도 횟수 : ${this.updowncount}</h2>`;
        const ubtn = document.createElement('button');
        ubtn.innerHTML = '다시 하기';
        ubtn.addEventListener('click', n2 => {
          n2.preventDefault();
          e.target.disabled = false;
          this.updownBtnValue.value = '';
          this.updowntext.innerHTML = '??';
          this.updowntext.style.fontSize = '12em'
          this.updowninit();
        });
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
    this.move['87'] && this.player.y > 0 ? (this.player.y -= 3) : '';
    this.move['83'] && this.player.y < this.canvas.height - this.player.size ? (this.player.y += 3) : '';
    this.move['65'] && this.player.x > 0 ? (this.player.x -= 3) : '';
    this.move['68'] && this.player.x < this.canvas.width - this.player.size ? (this.player.x += 3) : '';
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