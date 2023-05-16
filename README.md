<div align='center'>

![aduCalendar 2023-05-16 094759](https://github.com/fastcampusmini03/calendarFE/assets/56331400/ab22b2de-287f-4958-8dd4-0e80d5e94d34)


  <h1>연차 당직 관리 달력</h1> 
<h2>ADU calender</h2>
미니 프로젝트 3조

<a href="https://github.com/jyc-coder">정영찬</a>　|　
<a href="https://github.com/whansoo">신환수</a>　|　
<a href="https://github.com/dokimion24">이찬영</a>
  
</div>

## 소개

달력에서 일정을 선택하여 연차/당직을 신청하여 관리할수 있는 연차/당직 관리 서비스입니다. 사용자가 일정을 생성/수정 하면 관리자 측에서 관리하여 승인하면 달력에 추가/수정되는 방식으로 서비스를 제공합니다.

## 배포 사이트 : http://aducalendar-env.ap-northeast-2.elasticbeanstalk.com/



<div align="center">
<table>
<tr>
    <th>
      <div>
        <img src="https://github.com/fastcampusmini03/calendarFE/assets/56331400/f229a005-008a-4c84-9d4e-ce77e49697cc.gif" width="450" height="270">
      </div>
      <div align="center">
      메인페이지
      </div>
    </th>
    <th>
      <div>
        <img src="https://github.com/fastcampusmini03/calendarFE/assets/56331400/921c3531-2b88-4380-b279-3f064d8d1c9d.gif" width="450" height="270">
      </div>
     <div align="center">
      로그인
      </div>
    </th>
  </tr>
  <tr>
    <th>
      <div>
        <img src="https://github.com/fastcampusmini03/calendarFE/assets/56331400/95acc4ec-c75e-4a00-bfcd-a453dcf1a557" width="450" height="270">
      </div>
      <div align="center">
      회원가입
      </div>
    </th>
    <th>
      <div>
       <div>
        <img src="https://github.com/fastcampusmini03/calendarFE/assets/56331400/8248ccda-e33d-478d-9373-8182fab1e9b7.gif" width="450" height="270">
      </div>
      </div>
      <div align="center">
     일정 신청
      </div>
    </th>
  </tr>
  <tr>
    <th>
      <div>
        <img src="https://github.com/fastcampusmini03/calendarFE/assets/56331400/5acd44f8-422a-4da0-8287-0a666c1e3db2.gif" width="450" height="270">
      </div>
      <div align="center">
      연차/당직
      </div>
    </th>
    <th>
      <div>
       <div>
        <img src="https://github.com/fastcampusmini03/calendarFE/assets/56331400/a95966e5-de04-4c66-bb4b-434aebb9174e.gif" width="450" height="270">
      </div>
      </div>
      <div align="center">
     유저 관리
      </div>
    </th>
  </tr>
  
</table>
</div>

<br />

## 팀 소개
<div align='center'>
  
[정영찬 (팀장)](https://github.com/jyc-coder)  | [신환수](https://github.com/jyc-coder) | [이찬영](https://github.com/dokimion24)  
:----: | :----: | :----: 
<img src="https://avatars.githubusercontent.com/u/56331400?v=4" style="width: 150px;" /> | <img src="https://avatars.githubusercontent.com/u/98297436?v=4" style="width: 150px" /> | <img src="https://avatars.githubusercontent.com/u/92348492?v=4" style="width: 150px;" />
[관리자 페이지]<br> [푸터]<br> [배포]<br> [노션 작성]<br>  [디자인 수정] |  [메인 페이지]<br> [달력 컴포넌트]<br> [달력 패키지 커스텀] <br>  [헤더]<br> [디자인 수정] | [로그인 페이지] <br> [회원가입 페이지]<br> [마이 페이지]<br> [디자인 수정]
  
</div>

<br/>

<details>
  <summary> 🗓️ 구현 기능 목록 </summary>
 <br>
  
  ** 메인페이지 **
  - 헤더, 달력 컴포넌트, 푸터, 로그인,회원가입버튼으로 구성되어있습니다.
  - 헤더 : 서비스의 이름과 함께 로그인 후에는 우측에 drawer가 생성되어 마이페이지, 로그아웃의 기능을 사용할수 있습니다.
  - 달력 컴포넌트 : 본인을 포함한 사용자들이 신청하여 승인된 일정을 보여줍니다. 로그인한 유저에 한해서 원하는 일정을 드래그&클릭 하여 일정을 추가할수 있습니다.
    - 만약 로그인 하지 않은경우 생성/수정이 제한되며 로그인을 하라는 텍스트가 작성된 스낵바가 좌측하단에 생성됩니다.
    - 설령 로그인 했다고 해도 다른 사용자의 일정을 수정/삭제 할수 없도록 했습니다.
    - 수정/생성을 위한 form에는 allDay라는 체크항목이 존재하며 이를 통해 연차/당직을 구분합니다.
    - 일정 이름, 기간, 연차/당직을 선택한 다음 버튼을 클릭하면 달력에 표시되지만 관리자가 승인하지 않았기 때문에 승인중을 표시하는 색깔로 일정이 표시됩니다
    - 관리자 측에서 승인을 하면 승인됨을 보여주기 위해서 일정의 배경색이 다른 색상으로 변경됩니다.
    - 만약 승인되지 않으면 지워집니다.
  - 푸터 : 이 프로젝트에 땀과 쏟은 사람들의 이름이 적혀있습니다.
  - 로그인, 회원가입 버튼 : 각각의 버튼을 누르면 해당 페이지로 이동합니다.
  
  ** 로그인 페이지 **
  - 아이디(이메일), 비밀번호를 입력해서 로그인버튼을 누를때 올바른 정보일 경우 메인 페이지로 이동합니다
    - 만약 관리자 아이디일경우 메인 페이지가 아니라 관리자 페이지로 이동합니다.
    - 계정이 없는 사람을 위해서 로그인 버튼 하단에 회원가입 페이지로 이동할수 있는 링크를 추가했습니다.
    
  ** 회원가입 페이지 **
  - 계정이 없는 사용자가 계정을 만들기 위해 이용하는 페이지 입니다.
  - 사용자의 이름과 이메일, 비밀번호, 비밀번호 확인을 입력하고 회원가입을 진행합니다.
  - 회원가입이 성공하면 좌측하단에 환영멘트가 표시되는 스낵바가 보입니다.
  
  ** 마이 페이지 **
  - 로그인한 사용자만 들어갈수 있는 페이지 입니다.
  - 사용자의 정보를 볼수 있으며 수정이 가능합니다.
  - 사용자가 요청한 일정 목록을 볼수 있으며, 승인된 목록을 열람할수 있습니다.
  - 이 때 '년'과 '월'을 선택하면 해당 일자에 승인/신청한 일정을 볼수 있습니다.
  
  
  ** 관리자 페이지 **
  - 관리자의 계정으로 로그인하면 제일 먼저 보이는 페이지입니다.
  - 좌측에는 달력 컴포넌트로 사용자들의 일정을 볼수 있으며, 우측에는 연차/당직 신청 목록을 보여줍니다. 
  - 등록/수정/삭제에 대한 탭이 존재하며, 각각의 탭에 해당하는 요청 리스트를 보여주게됩니다.
  - 무한스크롤로 구현하여 전체 데이터를 보여줄수 있게 했으며, 마지막 데이터가 렌더링 되면 하단에 마지막페이지라를 뜻하는 텍스트가 표시됩니다.
  - 각각의 리스트 항목에는 승인 거절 버튼이 있으며, 버튼을 누르면 의사를 다시 묻는 dialog가 나타납니다
  - 승인/ 거절은 각각의 탭마다 다른 동작을 취합니다.
    - 등록 : 승인시 일정의 색까리 변경되며 일정 데이터에 저장, 거절 시 일정 데이터에 보이지 않음
    - 수정 : 승인시 일정의 내용과 일정이 수정됨, 거절 시 수정전 데이터로 유지
    - 삭제 : 승인시 일정 데이터에 보이지 않음, 거절시 데이터 유지
  
  ** 사용자 관리 페이지 **
  - 현재 회원가입된 사용자 목록을 볼 수 있는 페이지입니다.
  - 상단에 input으로 사용자 검색을 할수 있으며, 검색 하기 전에는 전체 유저의 데이터를 보여줍니다.
  - 이때 무한 스크롤 기능이 존재하며 한번에 8명씩 추가로 표시가 됩니다
  - input에 검색하면 0.5초 뒤에 해당 사용자 이름과 일치하는 목록만 나오게 됩니다.
  - 동명이인이 존재함을 고려해서 이메일도 같이 표시되게 함으로써 헷갈리지 않게 제작했습니다.
  - 항목을 클릭하면 유저의 권한을 변경할수 있는 팝업이 나타납니다.
  - 관리자, 일반중 하나를 선택하여 변경을 누르고 confirm 시 권한이 변경되어 실시간으로 업데이트합니다.
  
  
  
  
