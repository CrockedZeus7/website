window.addEventListener("load", () => {
    const selectedDate = document.getElementById("selectedDate");
    const year = 2024; // 연도를 2023으로 고정
    const lunchDataUrl = 'https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=3b032261176042658cad62c6d0e8355c&Type=json&plndex=1&pSize=30&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010563';
  
    selectedDate.addEventListener('change', () => {
      const selectedValue = selectedDate.value;
      const dateObj = new Date(selectedValue); // 선택한 날짜로 Date 객체 생성
      const year = dateObj.getFullYear(); // 선택한 날짜의 연도
      const month = dateObj.getMonth() + 1; // 선택한 날짜의 월(0부터 시작하므로 1을 더함)
      const date = dateObj.getDate(); // 선택한 날짜의 일
      const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][dateObj.getDay()]; // 선택한 날짜의 요일
  
      const lunchDataByDateUrl = `${lunchDataUrl}&MLSV_YMD=${year}${month < 10 ? '0' : ''}${month}${date < 10 ? '0' : ''}${date}`;
  
      fetch(lunchDataByDateUrl) //API 받아오기
        .then((response) => response.json())
        .then(data => {
          const lunch = data;
  
          const h1 = document.createElement("h1");
          const text = lunch.mealServiceDietInfo[1].row[0].DDISH_NM;
          const textWithMilk = text.replace(/12./g, '').replace(/2./g, '(🥛)').replace(/경인/g, '').replace(/[\d.()]+/g, '').replace(/o|l|m|g/g, '').replace(/[.()]/g, '').replace(/🥛/g, '(🥛)').trim();
 // 괄호와 .을 제거하고 숫자 '2'를 '(우유)'로 변경하며 o,l,m,g를 공백으로 바꾸는 코드
          h1.innerHTML = textWithMilk.replace(/\n/g, '<br>'); // 줄바꿈 문자열을 <br> 태그로 변경하여 HTML에 추가
  
          const mealTitle = document.getElementById("mealTitle");
          mealTitle.innerHTML = `오늘의 급식(${dayOfWeek})`;
  
  
          const a = document.querySelector("a");
          a.innerHTML = ''; // 이전에 추가된 HTML을 모두 지우기 위해 태그 a의 innerHTML을 초기화하기
          a.appendChild(mealTitle);
          a.appendChild(h1);
        })
        .catch(error => {
          console.error(error);
          alert('이런! 급식 정보를 파싱하던 중 오류가 발생했어요.😭 ' + (error)); //오류 알림
        });
    });
  });