function replaceNumbers() {
  //textarea의 값을 가져오기
  let message = document.querySelector('textarea').value;

  //숫자를 메시지로 바꾸기
  message = message.replace(/0/g, "💫교시() 교시()로 시간표 변경됨💫\n\n");
  message = message.replace(/1/g, "\n\n밥(🍚):");
  message = message.replace(/2/g, "\n\n면(🍝):");
  message = message.replace(/3/g, "\n\n특식(😋):");
  message = message.replace(/4/g, "\n\n국/탕(🥘):");
  message = message.replace(/5/g, "\n\n반찬(🧈):");
  message = message.replace(/6/g, "\n\n후식(🍇):");
  message = message.replace(/7/g, "\n\n*(🥛)는 우유 성분이 함유되어 있다는 뜻\n\n---------------\n\n숙제 및 시험 일정(🪄)\n");
  message = message.replace(/8/g, "\n없음👏");
  //message = message.replace("오늘", "내일");
  //위 코드는 주석으로 처리되어 작동되지 않음. (만약 전날로 시간 변경 시 위 코드 주석 삭제)

  //수정된 메시지 textarea에 적용하기
  document.querySelector('textarea').value = message;
} //코드 마무리